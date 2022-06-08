import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectAction, setAction } from '../../app/store/boardSlice';
import { useDeleteBoardMutation } from '../../app/services/boardApi';
import {
  dialogCloseBtnStyle,
  dialogPaperStyle,
  dialogActionsContainerStyle,
} from '../../app/styles/dialogStyle';
import { buttonStyle } from '../../app/styles/styles';
import { useDeleteColumnMutation } from '../../app/services/columnApi';

export const DeleteDialog = () => {
  const [deleteBoard] = useDeleteBoardMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  const dispatch = useAppDispatch();
  const { action, id, title, entity } = useAppSelector(selectAction);

  const handleClick = async () => {
    if (entity === 'Board') await deleteBoard(id);
    if (entity === 'Column') await deleteColumn(id);

    dispatch(setAction(null));
  };

  const handleClose = () => {
    dispatch(setAction(null));
  };

  return (
    <Dialog
      open={action === 'Delete'}
      closeAfterTransition
      onClose={handleClose}
      fullWidth
      maxWidth={'xs'}
      sx={(theme) => dialogPaperStyle}
    >
      <DialogTitle sx={{ position: 'relative' }} fontWeight={700}>
        Delete {title}
        <IconButton sx={(theme) => dialogCloseBtnStyle} onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>Are you sure to delete {title}?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box sx={dialogActionsContainerStyle}>
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
