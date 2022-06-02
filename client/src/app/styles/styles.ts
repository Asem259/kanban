import { theme } from './theme';

export const loginContainerStyle = {
  padding: '24px 16px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

export const boxContainer = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};

export const navLogoStyle = {
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

export const appDrawerStyle = {
  '& .MuiDrawer-paper': {
    width: '240px',
    paddingTop: '32px',
    height: 'calc(100% - 48px)',
    marginTop: '48px',
  },
};

export const buttonStyle = { borderRadius: theme.shape.borderRadius };

const addNewItem = {
  border: `2px dashed ${theme.palette.grey['400']}`,
};

export const addNewColumnStyle = { ...addNewItem };
export const addNewCardStyle = { ...addNewItem };

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
    height: '100px',
  },
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
};

export const addNewBoardStyle = {
  ...addNewItem,
  ...boardTileStyle,
  backgroundColor: theme.palette.grey['100'],
  color: theme.palette.text.primary,
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

export const actionsMenuButtonStyle = {
  position: 'absolute',
  right: '8px',
};

export const dialogRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alighnItems: 'center',
};
