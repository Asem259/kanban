import { addNewItem, boxContainer } from './styles';
import { theme } from './theme';

export const cardContainer = {
  ...boxContainer,
  flexDirection: 'column',
  width: '100%',
  marginTop: '12px',
  py: '16px',
  px: '24px',
  backgroundColor: theme.palette.grey['100'],
  borderRadius: theme.shape.borderRadius,
  alignItems: 'flex-start',
  gap: '12px',
};
export const tagsContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
  pt: '12px',
};

export const tasksProgressContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  gap: '4px',
  fontSize: '1.2rem',
  color: theme.palette.grey['500'],
  height: '24px',
};

export const addNewCardStyle = {
  ...addNewItem,
  width: '300px',
  borderRadius: theme.shape.borderRadius,
  height: '120px',
  marginTop: '12px',
};

export const labelMenuItem = {
  width: '300px',
  py: '0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  mb: '8px',
  height: '36px',
};
