import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { darken } from '@mui/material';

import { useAppSelector } from '../../app/store/hooks';
import { labelButtonStyle } from '../../app/styles/dialogStyle';
import { selectLabels } from '../../app/services/boardApi';
import { selectCardById } from '../../app/services/boardApi';

import { labelMenuItem } from '../../app/styles/cardStyle';
import { buttonStyle } from '../../app/styles/styles';
import { useUpdateCardMutation } from '../../app/services/cardApi';

interface Props {
  cardId: string;
  selectedLabel: string;
  setSelectedLabel: (id: string) => void;
  setView: (view: 'Create' | 'Edit' | 'Select') => void;
}

export const SelectLabelMenu = ({
  setView,
  cardId,
  setSelectedLabel,
}: Props) => {
  const currentBoard = useAppSelector((state) => state.board.currentBoard);

  const [updateCard] = useUpdateCardMutation();
  const labels = useAppSelector(selectLabels(currentBoard));
  const cardLabels = useAppSelector(
    selectCardById(currentBoard, cardId)
  )?.labels.map((label) => label.id);

  const handleSelectLabels = (id: string) => () => {
    updateCard({ id: cardId, labelId: id });
  };
  const handleEditLabel = (id: string) => () => {
    setView('Edit');
    setSelectedLabel(id);
  };

  return (
    <>
      <Typography align='center' component='p' py='8px'>
        Labels
      </Typography>
      <Divider sx={{ mt: 0.5, mb: 3 }} />
      {labels?.map((label) => (
        <ListItem
          key={label.id}
          sx={(theme) => ({
            ...labelMenuItem,
          })}
        >
          <ListItemButton
            onClick={handleSelectLabels(label.id)}
            alignItems='center'
            sx={(theme) => ({
              ...labelButtonStyle,

              backgroundColor: label.color,

              '&:hover': {
                backgroundColor: label.color,
                boxShadow: ` 0px 0px 0px 0px black, -8px 0px 0px 0px ${darken(
                  label.color,
                  0.3
                )}`,
              },
            })}
          >
            <ListItemText>{label.name} </ListItemText>
            {cardLabels?.includes(label.id) && (
              <ListItemIcon
                sx={{
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <CheckIcon color='inherit' fontSize='small' />
              </ListItemIcon>
            )}
          </ListItemButton>
          <ListItemButton
            onClick={handleEditLabel(label.id)}
            disableGutters
            sx={(theme) => ({
              px: '8px',

              backgroundColor: label.color,
              ...buttonStyle,
              color: '#fff',
              '&:hover': {
                backgroundColor: darken(label.color, 0.3),
              },
            })}
          >
            <EditIcon fontSize='small' />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem>
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          fullWidth
          sx={(theme) => buttonStyle}
          onClick={() => setView('Create')}
        >
          Add new Label
        </Button>
      </ListItem>
    </>
  );
};
