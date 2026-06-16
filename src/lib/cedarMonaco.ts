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
      // Dracula
      { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
      { token: 'keyword.declaration', foreground: 'ff79c6', fontStyle: 'bold' },
      { token: 'variable.predefined', foreground: 'bd93f9' },
      { token: 'type.identifier', foreground: '8be9fd' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'comment', foreground: '6272a4' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'operator', foreground: 'ff79c6' },
    ],
    colors: {
      'editor.background': '#21222c',
      'editor.foreground': '#f8f8f2',
      'editorCursor.foreground': '#ff79c6',
      'editor.lineHighlightBackground': '#282a36',
      'editorLineNumber.foreground': '#6272a4',
      'editorLineNumber.activeForeground': '#f8f8f2',
      'editor.selectionBackground': '#44475a',
      'editor.inactiveSelectionBackground': '#343746',
      'editorIndentGuide.background1': '#343746',
      'editorIndentGuide.activeBackground1': '#6272a4',
    },
  });
}
