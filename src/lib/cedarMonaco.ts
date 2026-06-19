import type * as Monaco from 'monaco-editor';

let configured = false;

export function configureCedarMonaco(monaco: typeof Monaco) {
  if (configured) {
    return;
  }

  configured = true;

  monaco.languages.register({ id: 'cedar' });

  monaco.languages.setMonarchTokensProvider('cedar', {
    defaultToken: '',
    tokenizer: {
      root: [
        [/(permit|forbid|when|unless|in|has|is|if|then|else)\b/, 'keyword'],
        [/\b(principal|action|resource|context)\b/, 'variable.predefined'],
        [/\b(entity|action|type|namespace|appliesTo)\b/, 'keyword.declaration'],
        [/\b(true|false)\b/, 'constant.language'],
        [/[A-Z][A-Za-z0-9_]*/, 'type.identifier'],
        [/[a-z_][A-Za-z0-9_]*/, 'identifier'],
        [/\/\/.*$/, 'comment'],
        [/".*?"/, 'string'],
        [/[{}()[\]]/, '@brackets'],
        [/[,:;]/, 'delimiter'],
        [/[=!><&|+-/*]+/, 'operator'],
        [/\d+/, 'number'],
      ],
    },
  });

  monaco.languages.setLanguageConfiguration('cedar', {
    comments: {
      lineComment: '//',
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
    ],
  });

  // A single dark editor "screen" used in both light and dark page modes
  // (copied from the Workbench palette). Cobalt cursor; cool syntax.
  monaco.editor.defineTheme('cedar-os', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'c4a7f5', fontStyle: 'bold' },
      { token: 'keyword.declaration', foreground: 'c4a7f5', fontStyle: 'bold' },
      { token: 'variable.predefined', foreground: '8fb3ff' },
      { token: 'type.identifier', foreground: '7fd6e0' },
      { token: 'string', foreground: '88e0a6' },
      { token: 'comment', foreground: '7b85a3' },
      { token: 'number', foreground: 'c4a7f5' },
      { token: 'operator', foreground: '8fb3ff' },
    ],
    colors: {
      'editor.background': '#21242e',
      'editor.foreground': '#e6e9f0',
      'editorCursor.foreground': '#4263eb',
      'editor.lineHighlightBackground': '#262a36',
      'editorLineNumber.foreground': '#6b7494',
      'editorLineNumber.activeForeground': '#e6e9f0',
      'editor.selectionBackground': '#34406b',
      'editor.inactiveSelectionBackground': '#2b3147',
      'editorIndentGuide.background1': '#2b2f3c',
      'editorIndentGuide.activeBackground1': '#4a5170',
    },
  });
}
