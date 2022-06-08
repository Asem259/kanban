import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAppDispatch } from '../../app/store/hooks';
import { buttonStyle } from '../../app/styles/styles';
import { LabelMenu } from '../Label/LabelMenu';

interface Props {
  cardId: string;
}

export const SideBar = ({ cardId }: Props) => {
  const handleDelete = () => {
    // deleteCard(cardId)
  };
  const handleAddTask = () => {
    // addTask(taskDAta)
  };

  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(12, 1fr)'
      alignContent='flex-start'
      gap={2}
      px={2}
      pt={6}
      sx={(theme) => ({
        height: '100%',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      })}
    >
      <Box gridColumn='span 12'>
        <LabelMenu cardId={cardId} />
      </Box>
      <Box gridColumn='span 12'>
        <Button
          variant='contained'
          fullWidth
          disableElevation
          disableRipple
          onClick={handleAddTask}
          sx={(theme) => ({
            backgroundColor: theme.palette.grey['200'],
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.grey['400'],
            },
          })}
        >
          Add new Task
        </Button>
      </Box>
      <Box gridColumn='span 12'>
        <Button
          variant='contained'
          fullWidth
          disableRipple
          disableElevation
          onClick={handleDelete}
          sx={(theme) => ({
            ...buttonStyle,
          })}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
