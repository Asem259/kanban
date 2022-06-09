import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Task as TaskType } from '../../types/index.ts';
import { EditCardContentForm } from './EditCardContentForm';

export const Task = ({ id, completed, description }: TaskType) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(completed);
  const [desc, setDesc] = useState<string>(description);

  const handleDelete = () => {
    //deleteTask(id)
  };
  const handleEdit = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    //updateTask({description:desc})
    setShowForm(false);
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    //updateTask({id,completed:e.target.checked})
  };

  return (
    <Box display='flex' sx={{ width: '100%' }} alignItems='center' gap={3}>
      <Checkbox checked={complete} onChange={() => setComplete(!complete)} />
      {showForm ? (
        <EditCardContentForm id={id} field='task' setShowForm={setShowForm} />
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
