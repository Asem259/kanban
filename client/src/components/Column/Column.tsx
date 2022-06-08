import Box from '@mui/material/Box';

import { ColumnHeader } from './ColumnHeader';
import { columnContainer } from '../../app/styles/columnStyle';
import { Card } from '../Card/Card';
import { AddNewItem } from '../AddNewItem';
import { useAppSelector } from '../../app/store/hooks';
import { selectColumnById } from '../../app/services/boardApi';
interface Props {
  id: string;
}
export const Column = ({ id }: Props) => {
  const boardId = useAppSelector((state) => state.board.currentBoard);
  const data = useAppSelector(selectColumnById(boardId, id));

  return (
    <Box sx={columnContainer}>
      <ColumnHeader
        id={id}
        title={data?.title || ''}
        bg={data?.background || ''}
      />
      {data?.cards.map((cardId) => (
        <Card key={cardId} id={cardId} />
      ))}

      <AddNewItem entity='Card' columnId={id} />
    </Box>
  );
};
