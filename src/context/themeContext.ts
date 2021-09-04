import { createContext } from 'react';
export interface Colors {
  orange: string;
  purple: string;
  pink: string;
  green: string;
  yellow: string;
  white: string;
  blue: string;
  black: string;
  muted: string;
}
export const theme: Colors = {
  orange: '#ffb86c',
  purple: '#bd93f9',
  pink: '#ff79c6',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  white: '#f8f8f2',
  blue: '#8be9fd',
  black: '#282a36',
  muted: '#6272a4',
};

const ThemeContext = createContext(theme);

export default ThemeContext;
