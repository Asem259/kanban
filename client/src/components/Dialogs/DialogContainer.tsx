import { selectAction } from '../../app/store/boardSlice';
import { useAppSelector } from '../../app/store/hooks';
import { ActionDialog } from './ActionDialog';
import { DeleteDialog } from './DeleteDialog';

export const DialogContainer = () => {
  const { action, entity } = useAppSelector(selectAction);
  if (!action) return null;
  if (entity === 'Column' || entity === 'Board')
    return action === 'Delete' ? <DeleteDialog /> : <ActionDialog />;

  return null;
};
