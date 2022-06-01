import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { boardTileStyle, boardTileLinkStyle } from '../app/styles/styles';
import { ActionsMenuButton } from './ActionsMenuButton';
import { FavoriteButton } from './FavoriteButton';

interface Props {
  id: string;
  title: string;
  is_favorite: boolean;
}

export const BoardTile = ({ id, title, is_favorite }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <Box sx={{ ...boardTileStyle }}>
      <ActionsMenuButton setShowMenu={setOpenDialog} />
      <FavoriteButton is_favorite={is_favorite} />

      <Typography
        sx={{ ...boardTileLinkStyle }}
        component={RouterLink}
        to={'/' + id}
      >
        {title}
      </Typography>
    </Box>
  );
};
