import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import {
  useUpdateBoardMutation,
  useCreateBoardMutation,
  selectColumnById,
} from '../../app/services/boardApi';

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
import {
  useAddColumnMutation,
  useUpdateColumnMutation,
} from '../../app/services/columnApi';
import { selectAction, setAction } from '../../app/store/boardSlice';

export const ActionDialog = () => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [columnColor, setColumnColor] = useState<string>('');

  const dispatch = useAppDispatch();
  const { action, id, title, entity } = useAppSelector(selectAction);

  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const background = useAppSelector(
    selectColumnById(currentBoard, id)
  )?.background;

  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const [updateColumn] = useUpdateColumnMutation();
  const [addColumn] = useAddColumnMutation();

  if (entity === 'Column') {
    useEffect(() => {
      if (background) setColumnColor(background);
    }, [background]);
  }
  useEffect(() => {
    if (title && title !== newTitle) setNewTitle(title);
  }, [title]);

  const handleClick = async () => {
    if (entity === 'Column') {
      if (action === 'Edit')
        await updateColumn({
          id,
          title: newTitle || title,
          background: columnColor,
        });
      if (action === 'Create')
        await addColumn({
          title: newTitle,
          background: columnColor,
          board: currentBoard,
        });
    }
    if (entity === 'Board') {
      if (action === 'Edit') await updateBoard({ id, title: newTitle });
      if (action === 'Create') await createBoard({ title: newTitle });
    }
    dispatch(setAction(null));
  };

  const handleClose = () => {
    dispatch(setAction(null));
    if (entity === 'Column' && background) setColumnColor(background);
  };

  return (
    <Dialog
      open={action === 'Create' || action === 'Edit'}
      closeAfterTransition
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      sx={(theme) => dialogPaperStyle}
    >
      <DialogTitle sx={{ position: 'relative' }} fontWeight={700}>
        {action === 'Create' ? 'Create New ' + entity : 'Edit ' + title}
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
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          sx={(theme) => dialogTextField}
        />
        {entity === 'Column' && (
          <ColorBox setColor={setColumnColor} color={columnColor} />
        )}
      </DialogContent>

      <DialogActions>
        <Box px={2} sx={dialogActionsContainerStyle}>
          <Button
            sx={buttonStyle}
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
