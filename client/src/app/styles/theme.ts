import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shape: {
    borderRadius: 2,
  },
  palette: {
    primary: { main: '#4267B2' },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          color: '#fff',
        },
      },
    },
  },
});
