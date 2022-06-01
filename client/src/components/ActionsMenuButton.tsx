import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { actionsMenuButtonStyle } from '../app/styles/styles';

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActionsMenuButton = ({ setShowMenu }: Props) => {
  return (
    <Box sx={{ ...actionsMenuButtonStyle }}>
      <IconButton
        color='inherit'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setShowMenu(true);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
};
