import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { buttonStyle } from '../../app/styles/styles';
import { Task as TaskType } from '../../types/index.ts';

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

  return !showForm ? (
    <Box display='flex' sx={{ width: '100%' }} alignItems='center' gap={3}>
      <Checkbox checked={complete} onChange={() => setComplete(!complete)} />
      <Typography
        onClick={handleEdit}
        flexGrow={1}
        sx={{ textDecoration: complete ? 'line-through' : 'none' }}
      >
        {description}
      </Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  ) : (
    <ClickAwayListener onClickAway={() => setShowForm(false)}>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ width: '100%' }}
        alignItems='center'
        gap={3}
      >
        <TextField
          sx={{ fontSize: '12px' }}
          autoFocus
          variant='outlined'
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button
          disableElevation
          disableRipple
          variant='contained'
          fullWidth
          size='medium'
          onClick={handleSave}
          sx={{ ...buttonStyle }}
        >
          Confirm
        </Button>
      </Box>
    </ClickAwayListener>
  );
};
