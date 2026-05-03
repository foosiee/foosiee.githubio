import type * as Monaco from 'monaco-editor';

import {
  getCedarCompletionItems,
  getCedarDiagnostics,
  getCedarHover,
} from './cedarLsp';

type CedarContext = {
  getSchemaText: () => string;
};

let registered = false;

function getDocumentKind(model: Monaco.editor.ITextModel) {
  const path = model.uri.path.toLowerCase();

  if (path.endsWith('schema.cedar')) {
    return 'schema' as const;
  }

  if (path.endsWith('policies.cedar')) {
    return 'policy' as const;
  }

  return null;
}

export function registerCedarEditorService(
  monaco: typeof Monaco,
  context: CedarContext
) {
  if (registered) {
    return;
  }

  registered = true;

  monaco.languages.registerCompletionItemProvider('cedar', {
    triggerCharacters: ['.', ':', '"', ' ', '(', '{', ','],
    provideCompletionItems: async (model, position) => {
      const kind = getDocumentKind(model);
      if (!kind) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const wordRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = await getCedarCompletionItems(monaco, {
        kind,
        text: model.getValue(),
        schemaText: kind === 'policy' ? context.getSchemaText() : undefined,
        position,
        wordRange,
      });

      return { suggestions };
    },
  });

  monaco.languages.registerHoverProvider('cedar', {
    provideHover: async (model, position) => {
      if (getDocumentKind(model) !== 'policy') {
        return null;
      }

      return getCedarHover({
        text: model.getValue(),
        schemaText: context.getSchemaText(),
        position,
      });
    },
  });
}

export async function updateCedarDiagnostics(
  monaco: typeof Monaco,
  model: Monaco.editor.ITextModel,
  context: CedarContext
) {
  const kind = getDocumentKind(model);

  if (!kind) {
    return;
  }

  try {
    const markers = await getCedarDiagnostics(monaco, {
      kind,
      text: model.getValue(),
      schemaText: kind === 'policy' ? context.getSchemaText() : undefined,
    });

    monaco.editor.setModelMarkers(model, 'cedar-language-server', markers);
  } catch (error) {
    monaco.editor.setModelMarkers(model, 'cedar-language-server', [
      {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
        severity: monaco.MarkerSeverity.Error,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to load Cedar language service.',
        source: 'cedar-language-server',
      },
    ]);
  }
}
