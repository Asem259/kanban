import { Dispatch, SetStateAction, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useCreateBoardMutation,
} from '../../app/services/boardApi';
import { Action, Entity } from '../../types/index.ts';
import {
  buttonStyle,
  dialogCloseBtnStyle,
  dialogPaperStyle,
  dialogActionsContainerStyle,
  dialogTextField,
} from '../../app/styles/styles';

interface Props {
  id?: string;
  title?: string;
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  entity: Entity;
}

export const ActionDialog = ({
  action,
  setAction,
  title,
  id,
  entity,
}: Props) => {
  const [newTitle, setNewTitle] = useState<string>(title || '');

  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const isDeleteAction = action === 'Delete';

  const handleClick = async () => {
    if (action === 'Edit') await updateBoard({ id, title: newTitle });

    if (action === 'Create') await createBoard({ title: newTitle });

    if (action === 'Delete' && id) await deleteBoard(id);

    setAction('');
  };

  const deleteContent = (
    <DialogContentText>Are you sure to delete {title}?</DialogContentText>
  );

  const content = (
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
  );
  {
    entity === 'Column' && <Divider sx={{ py: 1 }} />;
  }

  const handleClose = () => {
    setAction('');
  };

  return (
    <Dialog
      open={Boolean(action)}
      onClose={handleClose}
      fullWidth
      maxWidth={isDeleteAction ? 'xs' : 'sm'}
      sx={(theme) => dialogPaperStyle}
    >
      <Box sx={{ position: 'relative' }}>
        <DialogTitle fontWeight={700}>{action}</DialogTitle>
        <IconButton sx={(theme) => dialogCloseBtnStyle} onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent>{isDeleteAction ? deleteContent : content}</DialogContent>
      <DialogActions>
        <Box sx={dialogActionsContainerStyle}>
          {isDeleteAction && (
            <Button
              fullWidth
              disableElevation
              disableRipple
              onClick={handleClose}
              size='medium'
              sx={(theme) => ({
                backgroundColor: theme.palette.grey['200'],
                ...buttonStyle,
              })}
            >
              Cancel
            </Button>
          )}

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
