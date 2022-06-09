import { addNewItem } from './styles';
import { theme } from './theme';

export const columnContainer = {
  width: '280px',
  minHeight: '40px',
  flexGrow: 0,
};

export const columnHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'spaceBetween',
  px: '16px',
  color: '#fff',
  position: 'relative',
  width: '100%',
  height: '48px',
  borderRadius: theme.shape.borderRadius,
};

export const addNewColumnStyle = {
  ...addNewItem,
  borderRadius: theme.shape.borderRadius,
  px: '16px',
  height: '48px',
  minWidth: '280px',
};
