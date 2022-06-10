import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { useMoveCardMutation } from '../app/services/cardApi';
import { useMoveColumnMutation } from '../app/services/columnApi';
import { setDraggedItem } from '../app/store/boardSlice';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { DragItem } from '../types/index.ts';

export const useItemDrop = (hoveredItem: DragItem) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const draggedItem = useAppSelector((state) => state.board.draggedItem);

  const [moveColumn] = useMoveColumnMutation();
  const [moveCard] = useMoveCardMutation();

  const [, drop] = useDrop({
    accept: hoveredItem.type === 'COLUMN' ? ['COLUMN', 'CARD'] : 'CARD',

    hover: throttle(400, async () => {
      if (!draggedItem) return;
      if (hoveredItem.type === 'COLUMN') {
        if (draggedItem.type === 'COLUMN') {
          if (draggedItem.id === hoveredItem.id) return;

          await moveColumn({
            id: draggedItem.id,
            order: hoveredItem?.order,
            board: hoveredItem?.board,
          });
        } else {
          if (draggedItem.column === hoveredItem.id) return;
          if (hoveredItem?.cards.length) return;

          await moveCard({
            id: draggedItem.id,
            to: hoveredItem.id,
            order: 1,
          });
          dispatch(setDraggedItem({ ...draggedItem, column: hoveredItem.id }));
        }
      }
      if (hoveredItem.type === 'CARD') {
        if (draggedItem.type !== 'CARD') return;

        if (draggedItem.type === 'CARD')
          if (draggedItem.id === hoveredItem.id) return;

        await moveCard({
          id: draggedItem.id,
          to: hoveredItem.column,
          order: hoveredItem.order,
        });

        dispatch(
          setDraggedItem({ ...draggedItem, column: hoveredItem.column })
        );
      }
    }),
  });

  return { drop, ref };
};
