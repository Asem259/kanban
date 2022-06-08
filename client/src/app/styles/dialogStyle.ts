import { addNewItem, boxContainer } from './styles';
import { theme } from './theme';

export const dialogRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

export const cardDialogStyle = {
  ...dialogPaperStyle,
  [theme.breakpoints.down('sm')]: {
    px: '8px',
  },
};

export const labelButtonStyle = {
  color: '#fff',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  fontSize: '16px',
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
};

export const labelContainer = {
  borderRadius: theme.shape.borderRadius,
  p: '0',
  height: '36px',
  mt: '4px',
};

export const addNewLabelBtnStyle = {
  borderRadius: theme.shape.borderRadius,
  mt: '8px',
  ...boxContainer,
  height: '36px',
  border: '1px solid ' + theme.palette.grey['700'],
};

export const sideBarActions = {};
