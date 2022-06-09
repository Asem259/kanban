import Box from '@mui/material/Box';

import { ColumnHeader } from './ColumnHeader';
import { columnContainer } from '../../app/styles/columnStyle';
import { Card } from '../Card/Card';
import { AddNewItem } from '../AddNewItem';
import { useAppSelector } from '../../app/store/hooks';
import { selectColumnById } from '../../app/services/boardApi';
import { alpha } from '@mui/material';
interface Props {
  id: string;
}
export const Column = ({ id }: Props) => {
  const boardId = useAppSelector((state) => state.board.currentBoard);
  const data = useAppSelector(selectColumnById(boardId, id));

  return (
    <Box
      sx={{
        ...columnContainer,
      }}
    >
      <ColumnHeader
        id={id}
        title={data?.title || ''}
        bg={data?.background || ''}
      />
      <Box
        mt={1}
        px={1}
        pt={1}
        pb={2}
        sx={(theme) => ({
          backgroundColor: alpha(
            data?.background || theme.palette.grey['700'],
            0.3
          ),
          minHeight: '84px',
          borderRadius: theme.shape.borderRadius,
        })}
      >
        {data?.cards.map((cardId) => (
          <Card key={cardId} id={cardId} />
        ))}
      </Box>
      <AddNewItem entity='Card' columnId={id} />
    </Box>
  );
};
