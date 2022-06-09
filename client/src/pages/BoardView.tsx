import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { selectColumns, useGetFullBoardQuery } from '../app/services/boardApi';
import { Column } from '../components/Column/Column';
import { boardViewContainer } from '../app/styles/boardStyle';
import { AddNewItem } from '../components/AddNewItem';
import { useAppSelector } from '../app/store/hooks';

export const BoardView = ({}) => {
  const { boardId } = useParams();
  const { data } = useGetFullBoardQuery(boardId as string);

  const cols = useAppSelector(selectColumns(boardId as string));

  return (
    <Container maxWidth='xl'>
      <Box sx={boardViewContainer}>
        {cols?.map((col) => (
          <Column id={col.id} key={col.id} />
        ))}
        <AddNewItem entity='Column' />
      </Box>
    </Container>
  );
};
