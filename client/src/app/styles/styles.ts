import { theme } from './theme';

export const boxContainer = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};

export const loginContainerStyle = {
  padding: '24px 16px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
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

export const buttonStyle = {
  borderRadius: theme.shape.borderRadius,
  textTransform: 'capitalize',
};

export const addNewItem = {
  border: `2px dashed ${theme.palette.grey['400']}`,
  color: theme.palette.grey['600'],
};

export const actionsMenuButtonStyle = {
  position: 'absolute',
  right: '8px',
  zIndex: '100',
  color: '#fff',
};

//dialogs

export const dialogRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const OptionsMenuStyle = {
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(1),
    minWidth: 240,
    position: 'absolute',
    top: 0,
  },
  '& .MuiMenu-list': {
    padding: '12px 0',
  },
  '& .MuiMenuItem-root': {
    py: '12px',
    pl: '24px',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(3),
    },
  },
};

export const dialogPaperStyle = {
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: '12px',
  },
};
export const dialogCloseBtnStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  borderRadius: '100%',
};
export const dialogActionsContainerStyle = {
  flexDirection: 'column',
  display: 'flex',
  gap: '6px',
  width: '100%',
};
export const dialogContentStyle = {
  gap: '8px',
  display: 'flex',
  flexDirection: 'column',
};

export const dialogTextField = {
  backgroundColor: theme.palette.grey['200'],
};

export const colorsContainer = {
  py: '8px',
  mt: '12px',
};

export const colorButtonStyle = {
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  cursor: 'pointer',
  '&:hover': {
    opacity: '0.8',
  },
  color: '#fff',
  ...boxContainer,
};
