import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = process.cwd();

const cedarRoot = path.join(
  projectRoot,
  "vendor",
  "cedar",
  "cedar-language-server"
);

const cedarGeneratedDir = path.join(
  projectRoot,
  "src",
  "generated",
  "cedar-language-server"
);

const cedarWasmJs = path.join(cedarGeneratedDir, "cedar_language_server.js");

const cedarWasmFile = path.join(
  cedarGeneratedDir,
  "cedar_language_server_bg.wasm"
);

const cedarWasmVersion = "0.2.117";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    const joined = [command, ...args].join(" ");
    throw new Error(`Command failed: ${joined}`);
  }
}

function commandExists(command) {
  const probe = spawnSync("which", [command], {
    cwd: projectRoot,
    stdio: "ignore",
    shell: false,
  });

  return probe.status === 0;
}

function commandVersion(command) {
  const probe = spawnSync(command, ["--version"], {
    cwd: projectRoot,
    encoding: "utf8",
    shell: false,
  });

  if (probe.status !== 0) {
    return null;
  }

  return (probe.stdout || probe.stderr || "").trim();
}

function cargoTargetDir() {
  const result = spawnSync(
    "cargo",
    ["metadata", "--format-version", "1", "--no-deps"],
    {
      cwd: cedarRoot,
      encoding: "utf8",
      shell: false,
    }
  );

  if (result.status !== 0) {
    throw new Error("Could not read Cargo metadata.");
  }

  return JSON.parse(result.stdout).target_directory;
}

function walkNewestMtime(targetPath) {
  if (!existsSync(targetPath)) {
    return 0;
  }

  const stats = statSync(targetPath);

  if (!stats.isDirectory()) {
    return stats.mtimeMs;
  }

  const ignoredDirectories = new Set(["target", "node_modules", ".git"]);

  return readdirSync(targetPath, { withFileTypes: true }).reduce(
    (newest, entry) => {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
        return newest;
      }

      const entryPath = path.join(targetPath, entry.name);
      const entryMtime = walkNewestMtime(entryPath);

      return Math.max(newest, entryMtime);
    },
    stats.mtimeMs
  );
}

function cedarSourceIsNewerThanGenerated() {
  const sourceMtime = walkNewestMtime(cedarRoot);

  const generatedMtime = Math.max(
    walkNewestMtime(cedarWasmJs),
    walkNewestMtime(cedarWasmFile)
  );

  return sourceMtime > generatedMtime;
}

function findCedarWasmArtifact(targetDir) {
  const preferredNames = [
    "cedar_language_server.wasm",
    "cedar_language_server_bg.wasm",
  ];

  const matches = [];

  function walk(dirPath) {
    if (!existsSync(dirPath)) {
      return;
    }

    for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (
        entry.isFile() &&
        entry.name.startsWith("cedar_language_server") &&
        entry.name.endsWith(".wasm")
      ) {
        matches.push(entryPath);
      }
    }
  }

  walk(targetDir);

  for (const preferredName of preferredNames) {
    const preferredMatch = matches.find(
      (candidate) => path.basename(candidate) === preferredName
    );

    if (preferredMatch) {
      return preferredMatch;
    }
  }

  if (matches.length > 0) {
    return matches.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
  }

  return null;
}

function ensureCedarArtifacts() {
  if (!commandExists("cargo")) {
    throw new Error(
      "Cedar wasm rebuild requires cargo, but it is not available in the build environment."
    );
  }

  const wasmBindgenVersion = commandVersion("wasm-bindgen");

  if (
    !wasmBindgenVersion ||
    !wasmBindgenVersion.includes(`wasm-bindgen ${cedarWasmVersion}`)
  ) {
    run("cargo", [
      "install",
      "--locked",
      "--force",
      "--version",
      cedarWasmVersion,
      "wasm-bindgen-cli",
    ]);
  }

  if (
    existsSync(cedarWasmJs) &&
    existsSync(cedarWasmFile) &&
    !cedarSourceIsNewerThanGenerated()
  ) {
    return;
  }

  rebuildCedar();
}

function rebuildCedar() {
  run(
    "cargo",
    [
      "build",
      "--release",
      "--target",
      "wasm32-unknown-unknown",
      "--no-default-features",
      "--features",
      "wasm",
    ],
    {
      cwd: cedarRoot,
    }
  );

  const cedarTargetDir = path.join(
    cargoTargetDir(),
    "wasm32-unknown-unknown",
    "release"
  );

  const cedarWasm = findCedarWasmArtifact(cedarTargetDir);

  if (!cedarWasm) {
    console.error(`Searched for Cedar wasm artifact in: ${cedarTargetDir}`);

    if (existsSync(cedarTargetDir)) {
      console.error(
        readdirSync(cedarTargetDir, { recursive: true }).join("\n")
      );
    }

    throw new Error(
      `Could not locate Cedar wasm artifact in ${cedarTargetDir}.`
    );
  }

  run("wasm-bindgen", [
    cedarWasm,
    "--target",
    "bundler",
    "--out-dir",
    cedarGeneratedDir,
  ]);
}

ensureCedarArtifacts();

run(path.join(projectRoot, "node_modules", ".bin", "prettier"), [
  "--check",
  ".",
]);

run(path.join(projectRoot, "node_modules", ".bin", "vite"), ["build"]);
