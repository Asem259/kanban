import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddNewItem } from '../components/AddNewItem/AddNewItem';
import { BoardTile } from '../components/BoardTile';
import { boardsContainer } from '../app/styles/boardStyle';
import { useAppSelector } from '../app/store/hooks';
import { selectAllBoards, useGetBoardsQuery } from '../app/services/boardApi';

export const Boards = () => {
  useGetBoardsQuery();
  const boardsData = useAppSelector((state) => selectAllBoards(state));

  const boards = boardsData?.map((board) => (
    <Grid
      key={board.id}
      item
      sm={6}
      xs={12}
      md={4}
      lg={3}
      py='32px'
      sx={{ position: 'relative' }}
    >
      <BoardTile key={board.id} id={board.id} />
    </Grid>
  ));

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{ ...boardsContainer }}>
        {boards}
        <Grid item sm={6} xs={12} md={4} lg={3} py='32px'>
          <AddNewItem entity='Board' />
        </Grid>
      </Grid>
    </Container>
  );
};
