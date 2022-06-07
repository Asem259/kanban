import { addNewItem } from './styles';
import { theme } from './theme';

export const boardsContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '32px',
  marginTop: '48px',
};

export const boardTileStyle = {
  position: 'relative',
  color: '#fff',
  height: '150px',
  [theme.breakpoints.down('md')]: {
    height: '128px',
  },
  backgroundColor: '#616161',
  borderRadius: theme.shape.borderRadius,
};

export const addNewBoardStyle = {
  ...boardTileStyle,
  ...addNewItem,
  backgroundColor: theme.palette.grey['100'],

  width: '100%',
};

export const boardTileLinkStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
};

export const boardViewContainer = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  overflow: 'auto',
  gap: '24px',
  py: '32px',
};

// Card
