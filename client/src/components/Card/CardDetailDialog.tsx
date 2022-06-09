import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useAppSelector } from '../../app/store/hooks';
import { selectCardById } from '../../app/services/boardApi';

import {
  cardDialogStyle,
  dialogCloseBtnStyle,
} from '../../app/styles/dialogStyle';
import { CardContent } from './CardContent';
import { SideBar } from './CardSidBar';
import { EditCardContentForm } from './EditCardContentForm';
import Divider from '@mui/material/Divider';

export const CardDetailDialog = () => {
  const { cardId } = useParams();

  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const card = useAppSelector(selectCardById(currentBoard, cardId as string));

  const [showForm, setShowForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/b/' + currentBoard);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      sx={(theme) => ({ ...cardDialogStyle, height: 'fit-content' })}
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
    >
      <Grid container px={matches ? 2 : 4}>
        <Grid item xs={12} sx={{ height: '32px', position: 'relative' }}>
          <IconButton
            sx={(theme) => ({ ...dialogCloseBtnStyle })}
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Grid item xs={12} mt={2} mb={2}>
          {!showForm ? (
            <>
              <Typography
                sx={{ fontWeight: '700', fontSize: '24px' }}
                onClick={() => setShowForm(true)}
              >
                {card?.title}
              </Typography>
              <Divider flexItem sx={{ mt: 2 }} />
            </>
          ) : (
            <EditCardContentForm
              setShowForm={setShowForm}
              id={cardId as string}
              field='title'
              titleStyle
            />
          )}
        </Grid>
        <Grid item xs={12} sm={8}></Grid>
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
