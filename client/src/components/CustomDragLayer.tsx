import { useDragLayer } from 'react-dnd';
import { Column } from './Column/Column';
import { Card } from './Card/Card';

import { useAppSelector } from '../app/store/hooks';
import { Box } from '@mui/system';

export const CustomDragLayer = () => {
  const draggedItem = useAppSelector((state) => state.board.draggedItem);
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <Box
      sx={{
        height: '100%',
        left: '0',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        width: '100%',

        zIndex: 100,
      }}
    >
      <Box
        sx={{
          transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        }}
      >
        {draggedItem.type === 'COLUMN' ? (
          <Column id={draggedItem.id} isPreview />
        ) : (
          <Card isPreview id={draggedItem.id} />
        )}
      </Box>
    </Box>
  ) : null;
};
