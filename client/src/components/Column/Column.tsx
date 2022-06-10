import Box from '@mui/material/Box';

import { ColumnHeader } from './ColumnHeader';
import { columnContainer } from '../../app/styles/columnStyle';
import { Card } from '../Card/Card';
import { AddNewItem } from '../AddNewItem';
import { useAppSelector } from '../../app/store/hooks';
import { selectColumnById } from '../../app/services/boardApi';
import { alpha } from '@mui/material';
import { useItemDrag } from '../../hooks/useItemDrag';
import { Column as ColumnType } from '../../types/index.ts';
import { useItemDrop } from '../../hooks/useItemDrop';

interface Props {
  id: string;
  isPreview: boolean;
}
export const Column = ({ id, isPreview }: Props) => {
  const boardId = useAppSelector((state) => state.board.currentBoard);
  const data = useAppSelector(selectColumnById(boardId, id));
  const draggedItem = useAppSelector((state) => state.board.draggedItem);

  const { drag } = useItemDrag({ type: 'COLUMN', ...(data as ColumnType) });
  const { ref, drop } = useItemDrop({
    type: 'COLUMN',
    ...(data as ColumnType),
  });

  drag(drop(ref));
  return (
    <Box
      ref={ref}
      sx={{
        ...columnContainer,
        opacity: draggedItem?.id === id && !isPreview ? 0.7 : 1,
        transform: isPreview ? 'rotate(5deg)' : 'none',
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
          <Card key={cardId} id={cardId} isPreview={false} />
        ))}
      </Box>
      <AddNewItem entity='Card' columnId={id} />
    </Box>
  );
};
