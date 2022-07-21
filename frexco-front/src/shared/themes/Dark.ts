import { createTheme } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#171717',
      paper: '#000',
    }
  },
  typography: {
    allVariants: {
      color: '#fff',
    }
  }
});