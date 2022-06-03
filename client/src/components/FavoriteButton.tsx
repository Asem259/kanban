import { MouseEvent } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { actionsMenuButtonStyle } from '../app/styles/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useUpdateBoardMutation } from '../app/services/boardApi';

interface Props {
  is_favorite: boolean;
  id: string;
}

export const FavoriteButton = ({ is_favorite, id }: Props) => {
  const [updateBoard] = useUpdateBoardMutation();
  return (
    <Box sx={{ ...actionsMenuButtonStyle, bottom: '6px' }}>
      <IconButton
        color='inherit'
        onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          await updateBoard({ id, is_favorite: !is_favorite });
        }}
      >
        {is_favorite ? <StarIcon color='warning' /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
};
