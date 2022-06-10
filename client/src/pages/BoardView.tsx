import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { selectColumns, useGetFullBoardQuery } from '../app/services/boardApi';
import { Column } from '../components/Column/Column';
import { boardViewContainer } from '../app/styles/boardStyle';
import { AddNewItem } from '../components/AddNewItem';
import { useAppSelector } from '../app/store/hooks';
import { CustomDragLayer } from '../components/CustomDragLayer';

export const BoardView = ({}) => {
  const { boardId } = useParams();
  const { data } = useGetFullBoardQuery(boardId as string);

  const cols = useAppSelector(selectColumns(boardId as string));

  return (
    <Container maxWidth='xl' sx={{ height: 'calc(100vh - 48px)' }}>
      <Box sx={boardViewContainer}>
        <CustomDragLayer />
        {cols?.map((col) => (
          <Column isPreview={false} id={col.id} key={col.id} />
        ))}
        <AddNewItem entity='Column' />
      </Box>
    </Container>
  );
};
