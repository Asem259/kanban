import { useState, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { buttonStyle } from '../../app/styles/styles';
import { useAppSelector } from '../../app/store/hooks';
import { selectCurrentBoard } from '../../app/store/boardSlice';
import { selectLabelById } from '../../app/services/boardApi';
import { labelMenuItem } from '../../app/styles/cardStyle';
import { ColorBox } from '../ColorBox';
import {
  useAddLabelMutation,
  useDeleteLabelMutation,
  useUpdateLabelMutation,
} from '../../app/services/labelApi';
import { Label } from '../../types/index.ts';

interface Props {
  id: string;
  view: string;
  setView: (view: 'Create' | 'Edit' | 'Select') => void;
  cardId: string;
}
export const EditLabelMenu = ({ id, view, setView, cardId }: Props) => {
  const boardId = useAppSelector(selectCurrentBoard);
  const label =
    view === 'Edit' ? useAppSelector(selectLabelById(boardId, id)) : null;

  const [name, setName] = useState<string>(label?.name || '');
  const [color, setColor] = useState<string>(label?.color || '');

  const [updateLabel] = useUpdateLabelMutation();
  const [addLabel] = useAddLabelMutation();
  const [deleteLabel] = useDeleteLabelMutation();

  const handleSave = async () => {
    let updatedLabel: Partial<Label> = {};
    if (view === 'Edit' && label) {
      if (name && name !== label.name) updatedLabel.name = name;
      if (color && color !== label.color) updatedLabel.color = color;
      await updateLabel({ id, ...updatedLabel });
    }
    if (view === 'Create')
      await addLabel({ name, color, board: boardId, card: cardId });

    setView('Select');
  };

  const handleClose = () => {
    setView('Select');
  };

  const handleDelete = async () => {
    await deleteLabel(id);
    setView('Select');
  };
  return (
    <Box sx={{ width: '100%', px: '12px' }}>
      <ListItem
        sx={(theme) => ({
          ...labelMenuItem,
          borderRadius: '4px',
        })}
      >
        <IconButton
          aria-label='delete'
          onClick={handleClose}
          sx={{ position: 'absolute', left: '0' }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <ListItemText sx={{ textAlign: 'center' }}>{view} label</ListItemText>
      </ListItem>

      <Divider sx={{ mt: 0.5, mb: 3 }} />
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '300px',
        }}
      >
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='text'
          placeholder='Enter New Title'
          fullWidth
          variant='outlined'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <ColorBox setColor={setColor} color={color} />
      </ListItem>
      <ListItem sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          fullWidth
          disableElevation
          disableRipple
          onClick={view === 'Create' ? handleClose : handleDelete}
          size='medium'
          sx={(theme) => ({
            backgroundColor: theme.palette.grey['200'],
            ...buttonStyle,
          })}
        >
          {view === 'Create' ? 'Cancel' : 'Delete'}
        </Button>

        <Button
          disableElevation
          disableRipple
          variant='contained'
          onClick={handleSave}
          fullWidth
          size='medium'
          sx={{ ...buttonStyle }}
        >
          Confirm
        </Button>
      </ListItem>
    </Box>
  );
};
