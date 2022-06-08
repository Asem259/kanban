import { createTheme } from '@mui/material/styles';

import {
  blue,
  red,
  pink,
  deepPurple,
  indigo,
  green,
  lightBlue,
  orange,
  grey,
} from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    label: {
      indigo: string;
      pink: string;
    };
  }
}

export const theme = createTheme({
  shape: {
    borderRadius: 2,
  },
  palette: {
    primary: { main: '#4267B2' },
    label: {
      indigo: indigo[500],
      pink: pink[500],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
