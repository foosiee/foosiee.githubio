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

  monaco.editor.defineTheme('cedar-os', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '7dcfff', fontStyle: 'bold' },
      { token: 'keyword.declaration', foreground: 'ffbf69', fontStyle: 'bold' },
      { token: 'variable.predefined', foreground: 'ffd166' },
      { token: 'type.identifier', foreground: 'c3e88d' },
      { token: 'string', foreground: '8dfc8d' },
      { token: 'comment', foreground: '5c7c5c' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'operator', foreground: 'd4d4d4' },
    ],
    colors: {
      'editor.background': '#041704',
      'editor.foreground': '#6efb8a',
      'editorCursor.foreground': '#fff4a8',
      'editor.lineHighlightBackground': '#0b2a0b',
      'editorLineNumber.foreground': '#4b8f4b',
      'editorLineNumber.activeForeground': '#d7ffd7',
      'editor.selectionBackground': '#174717',
      'editor.inactiveSelectionBackground': '#103010',
      'editorIndentGuide.background1': '#103010',
      'editorIndentGuide.activeBackground1': '#2f6b2f',
    },
  });
}
