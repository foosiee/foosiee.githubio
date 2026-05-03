import type * as Monaco from 'monaco-editor';

type CedarLspModule = typeof import('../generated/cedar-language-server/cedar_language_server');

type LspPosition = {
  line: number;
  character: number;
};

type LspRange = {
  start: LspPosition;
  end: LspPosition;
};

type LspDiagnostic = {
  range: LspRange;
  message: string;
  severity?: number;
  source?: string;
  code?: string | number | null;
};

type LspCompletionItem = {
  label: string | { label: string };
  kind?: number;
  detail?: string | null;
  documentation?: string | { kind?: string; value?: string } | null;
  insertText?: string | null;
  insertTextFormat?: number;
  textEdit?: {
    newText: string;
    range: LspRange;
  } | null;
};

type LspHover = {
  contents:
    | string
    | { kind?: string; value?: string }
    | Array<string | { kind?: string; value?: string }>;
  range?: LspRange | null;
};

type LspCompletionResponse =
  | LspCompletionItem[]
  | {
      items?: LspCompletionItem[];
    }
  | null
  | undefined;

type CedarDocumentKind = 'schema' | 'policy';

let cedarLspModulePromise: Promise<CedarLspModule> | null = null;

function getCedarLspModule() {
  if (!cedarLspModulePromise) {
    cedarLspModulePromise = import(
      '../generated/cedar-language-server/cedar_language_server'
    );
  }

  return cedarLspModulePromise;
}

function toMarkerSeverity(
  monaco: typeof Monaco,
  severity?: number
): Monaco.MarkerSeverity {
  switch (severity) {
    case 1:
      return monaco.MarkerSeverity.Error;
    case 2:
      return monaco.MarkerSeverity.Warning;
    case 3:
      return monaco.MarkerSeverity.Info;
    case 4:
      return monaco.MarkerSeverity.Hint;
    default:
      return monaco.MarkerSeverity.Error;
  }
}

function toMonacoRange(range: LspRange): Monaco.IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  };
}

function markdownToString(
  content: string | { kind?: string; value?: string }
): string {
  if (typeof content === 'string') {
    return content;
  }

  return content.value ?? '';
}

function getCompletionItems(
  response: LspCompletionResponse
): LspCompletionItem[] {
  if (!response) {
    return [];
  }

  return Array.isArray(response) ? response : response.items ?? [];
}

function getCompletionKind(
  monaco: typeof Monaco,
  kind?: number
): Monaco.languages.CompletionItemKind {
  const completionKinds = monaco.languages.CompletionItemKind;

  switch (kind) {
    case 2:
      return completionKinds.Method;
    case 3:
      return completionKinds.Function;
    case 4:
      return completionKinds.Constructor;
    case 5:
      return completionKinds.Field;
    case 6:
      return completionKinds.Variable;
    case 7:
      return completionKinds.Class;
    case 8:
      return completionKinds.Interface;
    case 9:
      return completionKinds.Module;
    case 10:
      return completionKinds.Property;
    case 11:
      return completionKinds.Unit;
    case 12:
      return completionKinds.Value;
    case 13:
      return completionKinds.Enum;
    case 14:
      return completionKinds.Keyword;
    case 15:
      return completionKinds.Snippet;
    case 17:
      return completionKinds.File;
    case 18:
      return completionKinds.Reference;
    case 19:
      return completionKinds.Folder;
    case 20:
      return completionKinds.EnumMember;
    case 21:
      return completionKinds.Constant;
    case 22:
      return completionKinds.Struct;
    case 23:
      return completionKinds.Event;
    case 24:
      return completionKinds.Operator;
    case 25:
      return completionKinds.TypeParameter;
    default:
      return completionKinds.Text;
  }
}

export async function getCedarDiagnostics(
  monaco: typeof Monaco,
  params: {
    kind: CedarDocumentKind;
    text: string;
    schemaText?: string;
  }
) {
  const cedarLsp = await getCedarLspModule();
  const diagnostics: LspDiagnostic[] =
    params.kind === 'schema'
      ? cedarLsp.getSchemaDiagnostics(params.text)
      : cedarLsp.getPolicyDiagnostics(params.text, params.schemaText ?? null);

  return diagnostics.map((diagnostic) => ({
    ...toMonacoRange(diagnostic.range),
    severity: toMarkerSeverity(monaco, diagnostic.severity),
    message: diagnostic.message,
    source: diagnostic.source ?? 'cedar-language-server',
    code:
      diagnostic.code === null || diagnostic.code === undefined
        ? undefined
        : String(diagnostic.code),
  }));
}

export async function getCedarCompletionItems(
  monaco: typeof Monaco,
  params: {
    kind: CedarDocumentKind;
    text: string;
    schemaText?: string;
    position: Monaco.Position;
    wordRange: Monaco.IRange;
  }
) {
  const cedarLsp = await getCedarLspModule();
  const response: LspCompletionResponse =
    params.kind === 'schema'
      ? cedarLsp.getSchemaCompletions(
          params.text,
          params.position.lineNumber - 1,
          params.position.column - 1
        )
      : cedarLsp.getPolicyCompletions(
          params.text,
          params.schemaText ?? null,
          params.position.lineNumber - 1,
          params.position.column - 1
        );

  return getCompletionItems(response).map((item) => {
    const label =
      typeof item.label === 'string' ? item.label : item.label.label;
    const documentation = item.documentation
      ? markdownToString(item.documentation)
      : undefined;
    const textEditRange = item.textEdit
      ? toMonacoRange(item.textEdit.range)
      : null;

    return {
      label,
      kind: getCompletionKind(monaco, item.kind),
      detail: item.detail ?? undefined,
      documentation,
      insertText: item.textEdit?.newText ?? item.insertText ?? label,
      insertTextRules:
        item.insertTextFormat === 2
          ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          : monaco.languages.CompletionItemInsertTextRule.None,
      range: textEditRange ?? params.wordRange,
    };
  });
}

export async function getCedarHover(params: {
  text: string;
  schemaText?: string;
  position: Monaco.Position;
}) {
  const cedarLsp = await getCedarLspModule();
  const hover: LspHover | null = cedarLsp.getPolicyHover(
    params.text,
    params.schemaText ?? null,
    params.position.lineNumber - 1,
    params.position.column - 1
  );

  if (!hover) {
    return null;
  }

  const contents = Array.isArray(hover.contents)
    ? hover.contents
    : [hover.contents];
  const value = contents.map(markdownToString).filter(Boolean).join('\n\n');

  if (!value) {
    return null;
  }

  return {
    contents: [{ value }],
    range: hover.range ? toMonacoRange(hover.range) : undefined,
  };
}
