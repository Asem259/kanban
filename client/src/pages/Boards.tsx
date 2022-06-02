import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddNewItem } from '../components/AddNewItem/AddNewItem';
import { BoardTile } from '../components/BoardTile';
import { boardsContainer } from '../app/styles/styles';
import { useGetBoardsQuery } from '../app/services/api';

export const Boards = () => {
  const { data, isLoading } = useGetBoardsQuery();

  const boards = data?.map((board) => (
    <Grid item sm={6} xs={12} md={4} lg={3} py='32px'>
      <BoardTile
        key={board.id}
        id={board.id}
        title={board.title}
        is_favorite={board.is_favorite}
      />
    </Grid>
  ));

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{ ...boardsContainer }}>
        {boards}
        <Grid item sm={6} xs={12} md={4} lg={3} py='32px'>
          <AddNewItem onAdd={() => console.log('Add')} entity='Board' />
        </Grid>
      </Grid>
    </Container>
  );
};
