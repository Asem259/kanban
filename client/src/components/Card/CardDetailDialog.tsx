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
import { selectCardById } from '../../app/services/cardApi';

import {
  cardDialogStyle,
  dialogCloseBtnStyle,
} from '../../app/styles/dialogStyle';
import { CardContent } from './CardContent';
import { SideBar } from './CardSidBar';
import { EditCardContentForm } from './EditCardContentForm';

export const CardDetailDialog = () => {
  const { cardId } = useParams();
  const card = useAppSelector(selectCardById(cardId as string));

  const [showForm, setShowForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(card?.title || '');
  const navigate = useNavigate();

  const currentBoard = useAppSelector((state) => state.board.currentBoard);
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
      <Grid container>
        <Grid item xs={12} sx={{ height: '32px', position: 'relative' }}>
          <IconButton
            sx={(theme) => ({ ...dialogCloseBtnStyle })}
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          pr={matches ? 2 : showForm ? 2 : 4}
          pl={matches ? 2 : showForm ? 4 : 0}
          mt={2}
          mb={4}
        >
          {!showForm ? (
            <Typography
              sx={{ fontWeight: '700', fontSize: '24px' }}
              pl={matches ? 0 : 4}
              onClick={() => setShowForm(true)}
            >
              {card?.title}
            </Typography>
          ) : (
            <EditCardContentForm
              setShowForm={setShowForm}
              value={title}
              setValue={setTitle}
              title
            />
          )}
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
