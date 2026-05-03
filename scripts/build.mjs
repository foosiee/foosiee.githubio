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
  const probe = spawnSync(command, ["--version"], {
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

  return (probe.stdout ?? probe.stderr ?? "").trim();
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

function ensureCedarArtifacts() {
  if (!existsSync(cedarWasmJs) || !existsSync(cedarWasmFile)) {
    if (!commandExists("cargo") || !commandExists("wasm-bindgen")) {
      throw new Error(
        "Cedar wasm artifacts are missing and the Rust toolchain is not available to rebuild them."
      );
    }

    rebuildCedar();
    return;
  }

  if (!cedarSourceIsNewerThanGenerated()) {
    return;
  }

  if (!commandExists("cargo")) {
    throw new Error(
      "Cedar source changed, but cargo is not available to rebuild the wasm bundle."
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

  const cedarWasm = path.join(
    cedarRoot,
    "target",
    "wasm32-unknown-unknown",
    "release",
    "cedar_language_server.wasm"
  );

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
