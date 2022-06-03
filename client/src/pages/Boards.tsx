import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { ActionDialog } from '../components/Dialogs/ActionDialog';
import { Action } from '../types/index.ts';
import { AddNewItem } from '../components/AddNewItem/AddNewItem';
import { BoardTile } from '../components/BoardTile';
import { boardsContainer } from '../app/styles/styles';
import { useAppSelector } from '../app/store/hooks';
import { selectAllBoards, useGetBoardsQuery } from '../app/services/boardApi';

export const Boards = () => {
  const [action, setAction] = useState<Action>('');
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
      <ActionDialog action={action} setAction={setAction} entity='Board' />
      <Grid container spacing={2} sx={{ ...boardsContainer }}>
        {boards}
        <Grid item sm={6} xs={12} md={4} lg={3} py='32px'>
          <AddNewItem entity='Board' setAction={setAction} />
        </Grid>
      </Grid>
    </Container>
  );
};
