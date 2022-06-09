import { ChangeEvent, KeyboardEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';

import { buttonStyle } from '../app/styles/styles';
import { useAddCardMutation } from '../app/services/cardApi';

interface Props {
  columnId: string;
  setShowForm: (show: boolean) => void;
}

export const AddNewCardForm = ({ columnId, setShowForm }: Props) => {
  const [value, setValue] = useState<string>('');

  const [addCard] = useAddCardMutation();

  const handleSave = () => {
    addCard({ title: value, column: columnId });
    setValue('');
    setShowForm(false);
  };

  const handleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setShowForm(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowForm(false)}>
      <Box
        display='flex'
        mt={4}
        flexDirection='column'
        sx={{ width: '320px' }}
        alignItems='center'
        gap={1}
      >
        <TextField
          sx={{ fontSize: '12px' }}
          autoFocus
          variant='outlined'
          fullWidth
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onKeyDown={handleKeyboard}
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
          Add
        </Button>
      </Box>
    </ClickAwayListener>
  );
};
