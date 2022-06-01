import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddNewItem } from '../components/AddNewItem/AddNewItem';
import { Board } from '../types/index.ts';
import { BoardTile } from '../components/BoardTile';
import { boardsContainer } from '../app/styles/styles';

export const Boards = () => {
  const data = [] as Board[];

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} sx={{ ...boardsContainer }}>
        {data?.map((board) => (
          <Grid item sm={6} xs={12} md={4} lg={3}>
            <BoardTile
              key={board.id}
              id={board.id}
              title={board.title}
              is_favorite={board.is_favorite}
            />
          </Grid>
        ))}
        <Grid item sm={6} xs={12} md={4} lg={3}>
          <AddNewItem onAdd={() => console.log('Add')} entity='Board' />
        </Grid>
      </Grid>
    </Container>
  );
};
