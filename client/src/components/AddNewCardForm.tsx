import { ChangeEvent, forwardRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { buttonStyle } from '../app/styles/styles';
import { useAddCardMutation } from '../app/services/cardApi';

interface Props {
  columnId: string;
}

export const AddNewCardForm = forwardRef<HTMLElement, Props>(
  ({ columnId }, ref) => {
    const [value, setValue] = useState<string>('');

    const [addCard] = useAddCardMutation();

    const handleSave = () => {
      addCard({ title: value, column: columnId });
    };

    return (
      <Box
        ref={ref}
        display='flex'
        mt={4}
        flexDirection='column'
        sx={{ width: '100%' }}
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
    );
  }
);
