import { ChangeEvent, KeyboardEvent, useState } from 'react';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import { useUpdateCardMutation } from '../../app/services/cardApi';
import { useAppSelector } from '../../app/store/hooks';
import { selectCardById } from '../../app/services/boardApi';
import { selectCurrentBoard } from '../../app/store/boardSlice';
import { Card } from '../../types/index.ts';

interface Props {
  setShowForm: (show: boolean) => void;
  multiLine?: boolean;
  id: string;
  field: 'description' | 'title' | 'task';
  taskTitle?: string;
  titleStyle?: boolean;
}
export const EditCardContentForm = ({
  setShowForm,
  multiLine,
  id,
  field,
  titleStyle,
}: Props) => {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const card = useAppSelector(selectCardById(currentBoard, id));

  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [taskTitle, setTaskTitle] = useState('');

  const [updateCard] = useUpdateCardMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field === 'title'
      ? setTitle(e.target.value)
      : setDescription(e.target.value);
  };

  const save = async () => {
    if (card?.title !== title || card?.description !== description)
      await updateCard({ id, title, description });
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
          value={field === 'title' ? title : description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </ClickAwayListener>
  );
};
