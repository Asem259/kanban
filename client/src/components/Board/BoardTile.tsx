import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  boardTileStyle,
  boardTileLinkStyle,
} from '../../app/styles/boardStyle';

import { FavoriteButton } from '.././FavoriteButton';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectBoardById } from '../../app/services/boardApi';
import { OptionsMenu } from '.././Dialogs/OptionsMenu';
import { setCurrentBoard } from '../../app/store/boardSlice';

interface Props {
  id: string;
}

export const BoardTile = ({ id }: Props) => {
  const board = useAppSelector((state) => selectBoardById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <OptionsMenu entity='Board' id={id} title={board?.title || ''} />
      <Box sx={{ ...boardTileStyle }}>
        <FavoriteButton is_favorite={board?.is_favorite || false} id={id} />

        <Typography
          sx={{ ...boardTileLinkStyle }}
          onClick={() => {
            dispatch(setCurrentBoard(id));
            navigate(`/b/${id}`);
          }}
        >
          {board?.title}
        </Typography>
      </Box>
    </>
  );
};
