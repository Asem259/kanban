import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useGetFullBoardQuery } from '../app/services/boardApi';
import { Column } from '../components/Column/Column';
import { boardViewContainer } from '../app/styles/boardStyle';
import { AddNewItem } from '../components/AddNewItem/AddNewItem';

export const BoardView = ({}) => {
  const { boardId } = useParams();
  const { data } = useGetFullBoardQuery(boardId as string);

  return (
    <Container maxWidth='xl'>
      <Box sx={boardViewContainer}>
        {data?.columns.map((col) => (
          <Column id={col.id} key={col.id} />
        ))}
        <AddNewItem entity='Column' />
      </Box>
    </Container>
  );
};
