import { Theme as MuiTheme, CssVarsTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme, CssVarsTheme {}
} 