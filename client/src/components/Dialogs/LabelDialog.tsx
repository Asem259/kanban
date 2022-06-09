import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';

import { selectLabelById } from '../../app/services/boardApi';
import {
  dialogCloseBtnStyle,
  dialogPaperStyle,
  dialogActionsContainerStyle,
  dialogTextField,
  dialogContentStyle,
} from '../../app/styles/dialogStyle';
import { buttonStyle } from '../../app/styles/styles';
import { ColorBox } from '../ColorBox';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectAction, setAction } from '../../app/store/boardSlice';

export const LabelDialog = () => {
  const [newName, setNewName] = useState<string | undefined>();
  const [newColor, setNewColor] = useState<string>('');

  const dispatch = useAppDispatch();

  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const { action, entity, id } = useAppSelector(selectAction);
  const label = useAppSelector(selectLabelById(currentBoard, id));

  if (action === 'Edit') {
    useEffect(() => {
      if (label?.name) setNewName(label.name);
      if (label?.color) setNewColor(label.color);
    }, [label]);
  }

  const handleClick = async () => {
    dispatch(setAction(null));
  };

  const handleClose = () => {
    dispatch(setAction(null));
  };

  return (
    <Dialog
      open={entity === 'Label'}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      sx={(theme) => dialogPaperStyle}
    >
      <DialogTitle sx={{ position: 'relative' }} fontWeight={700}>
        {action === 'Create' ? 'Create New Label' : 'Edit ' + label?.name}
        <IconButton sx={(theme) => dialogCloseBtnStyle} onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ ...dialogContentStyle }}>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          type='text'
          placeholder='Enter New Title'
          fullWidth
          variant='outlined'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={(theme) => dialogTextField}
        />

        <ColorBox setColor={setNewColor} color={newColor} />
      </DialogContent>

      <DialogActions>
        <Box sx={dialogActionsContainerStyle}>
          <Button
            sx={(theme) => buttonStyle}
            disableElevation
            disableRipple
            variant='contained'
            onClick={handleClick}
            fullWidth
            size='medium'
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
