import { KeyboardEvent } from 'react';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';

interface Props {
  value: string;
  setValue: (value: string) => void;
  setShowForm: (show: boolean) => void;
  multiLine?: boolean;
  title?: boolean;
}
export const EditCardContentForm = ({
  value,
  setValue,
  setShowForm,
  title,
  multiLine,
}: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowForm(false);
    }
  };
  return (
    <ClickAwayListener onClickAway={() => setShowForm(false)}>
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
              fontSize: title ? '22px' : '16px',
              fontWeight: title ? '700' : '400',
            },
          }}
          autoFocus
          multiline={multiLine}
          minRows={multiLine ? 5 : 1}
          size='small'
          variant='outlined'
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </ClickAwayListener>
  );
};
