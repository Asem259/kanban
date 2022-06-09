import { ChangeEvent, KeyboardEvent, useState } from 'react';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import {
  useUpdateCardMutation,
  useUpdateTaskMutation,
} from '../../app/services/cardApi';
import { useAppSelector } from '../../app/store/hooks';
import { selectCardById } from '../../app/services/boardApi';
import { selectCurrentBoard } from '../../app/store/boardSlice';
import { Card } from '../../types/index.ts';

interface Props {
  setShowForm: (show: boolean) => void;
  multiLine?: boolean;
  cardId: string;
  taskId?: string;
  field: 'description' | 'title' | 'task';
  taskTitle?: string;
  titleStyle?: boolean;
}
export const EditCardContentForm = ({
  setShowForm,
  multiLine,
  cardId,
  field,
  titleStyle,
  taskId,
}: Props) => {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const card = useAppSelector(selectCardById(currentBoard, cardId));

  const task = card?.tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [taskTitle, setTaskTitle] = useState(task?.description);

  const [updateCard] = useUpdateCardMutation();
  const [updateTask] = useUpdateTaskMutation();

  const fields: { [key: string]: string | undefined } = {
    title,
    description,
    task: taskTitle,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (field === 'title') setTitle(e.target.value);

    if (field === 'description') setDescription(e.target.value);

    if (field === 'task') setTaskTitle(e.target.value);
  };

  const save = async () => {
    if (field === 'task') {
      taskTitle !== task?.description &&
        updateTask({ id: taskId, description: taskTitle, card: cardId });
    }
    if (field === 'description') {
      card?.description !== description &&
        updateCard({ id: cardId, description });
    }
    if (field === 'title')
      card?.title !== title && updateCard({ id: cardId, title });
  };

  const onClose = () => {
    setShowForm(false);
    save();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      setShowForm(false);
      save();
    }
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setDescription((pre) => pre + '\n');
    }
  };
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        display='flex'
        flexDirection='column'
        sx={{
          width: '100% ',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
        alignItems='center'
        gap={3}
      >
        <TextField
          inputProps={{
            style: {
              fontSize: titleStyle ? '22px' : '16px',
              fontWeight: titleStyle ? '700' : '400',
            },
          }}
          autoFocus
          multiline={multiLine}
          minRows={multiLine ? 5 : 1}
          size='small'
          variant='outlined'
          fullWidth
          value={fields[field]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </ClickAwayListener>
  );
};
