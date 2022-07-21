import { createTheme } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light:yellow[500],
      contrastText: '#fff',
    },
    secondary: {
      main: red[600],
      dark: red[700],
      light: red[400],
      contrastText: '#fff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#fff',
    }
  }
});