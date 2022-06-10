import { useDrag } from 'react-dnd';
import { setDraggedItem } from '../app/store/boardSlice';
import { DragItem } from '../types/index.ts';
import { useAppDispatch } from '../app/store/hooks';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

export const useItemDrag = (item: DragItem) => {
  const dispatch = useAppDispatch();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => {
      dispatch(setDraggedItem(null));
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
