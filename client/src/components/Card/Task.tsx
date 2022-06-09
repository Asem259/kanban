import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Task as TaskType } from '../../types/index.ts';
import { EditCardContentForm } from './EditCardContentForm';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../app/services/cardApi';

export const Task = ({ id, completed, description, card }: TaskType) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(completed);
  const [desc, setDesc] = useState<string>(description);

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = async () => {
    await deleteTask({ taskId: id, cardId: card });
  };
  const handleEdit = () => {
    setShowForm(true);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setComplete(!complete);

    updateTask({ id, completed: e.target.checked, card: card });
  };

  return (
    <Box display='flex' sx={{ width: '100%' }} alignItems='center' gap={3}>
      <Checkbox checked={complete} onChange={handleCheck} />
      {showForm ? (
        <EditCardContentForm
          taskId={id}
          cardId={card}
          field='task'
          setShowForm={setShowForm}
        />
      ) : (
        <Typography
          onClick={handleEdit}
          flexGrow={1}
          sx={{ textDecoration: complete ? 'line-through' : 'none' }}
        >
          {description}
        </Typography>
      )}
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
