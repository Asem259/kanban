import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { boardTileStyle, boardTileLinkStyle } from '../app/styles/styles';

import { FavoriteButton } from './FavoriteButton';
import { useAppSelector } from '../app/store/hooks';
import { selectBoardById } from '../app/services/boardApi';
import { DialogContainer } from './Dialogs/DialogContainer';

interface Props {
  id: string;
}

export const BoardTile = ({ id }: Props) => {
  const board = useAppSelector((state) => selectBoardById(state, id));

  return (
    <>
      <DialogContainer entity='Board' id={id} title={board?.title || ''} />
      <Box sx={{ ...boardTileStyle }}>
        <FavoriteButton is_favorite={board?.is_favorite || false} id={id} />

        <Typography
          sx={{ ...boardTileLinkStyle }}
          component={RouterLink}
          to={'/' + id}
        >
          {board?.title}
        </Typography>
      </Box>
    </>
  );
};
