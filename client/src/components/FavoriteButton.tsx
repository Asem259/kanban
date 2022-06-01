import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { actionsMenuButtonStyle } from '../app/styles/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  is_favorite: boolean;
}

export const FavoriteButton = ({ is_favorite }: Props) => {
  return (
    <Box sx={{ ...actionsMenuButtonStyle, bottom: '6px' }}>
      <IconButton
        color='inherit'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          console.log('Favorite');
        }}
      >
        {is_favorite ? <StarIcon color='warning' /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
};
