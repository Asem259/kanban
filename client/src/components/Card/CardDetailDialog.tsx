import { useNavigate, useParams } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { useAppSelector } from '../../app/store/hooks';
import { selectCardById } from '../../app/services/cardApi';

import {
  cardDialogStyle,
  dialogCloseBtnStyle,
} from '../../app/styles/dialogStyle';
import { CardContent } from './CardContent';
import { SideBar } from './CardSidBar';

export const CardDetailDialog = () => {
  const navigate = useNavigate();

  const { cardId } = useParams();
  const card = useAppSelector(selectCardById(cardId as string));

  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const handleClose = () => {
    navigate('/b/' + currentBoard);
  };

  return (
    <Dialog
      sx={(theme) => ({ ...cardDialogStyle, height: 'fit-content' })}
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
    >
      <Grid container>
        <Grid item xs={12} sx={{ height: '32px', position: 'relative' }}>
          <IconButton
            sx={(theme) => ({ ...dialogCloseBtnStyle })}
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={8}>
          <CardContent cardId={card?.id as string} />
        </Grid>
        <Grid item xs={0} sm={4}>
          <SideBar cardId={card?.id as string} />
        </Grid>
        <Grid item xs={12} sx={{ height: '32px' }}></Grid>
      </Grid>
    </Dialog>
  );
};
