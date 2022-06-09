import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import { buttonStyle, OptionsMenuStyle } from '../../app/styles/styles';
import TextField from '@mui/material/TextField';
import { dialogActionsContainerStyle } from '../../app/styles/dialogStyle';

interface Props {
  cardId: string;
  large?: boolean;
}

export const AddNewTaskMenu = ({ cardId, large }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>('');

  const handleClick = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{}}>
        <Button
          variant='contained'
          fullWidth={large}
          disableElevation
          disableRipple
          sx={(theme) => ({
            ...buttonStyle,
            backgroundColor: theme.palette.grey['200'],
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.grey['400'],
            },
          })}
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(e.currentTarget)
          }
        >
          Add New Task
        </Button>
      </Box>
      <Menu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={(theme) => ({ ...OptionsMenuStyle })}
        elevation={6}
        anchorEl={anchorEl}
      >
        <Box px={2}>
          <TextField
            autoFocus
            margin='dense'
            id='task-description'
            type='text'
            placeholder='Enter Task Description'
            fullWidth
            variant='outlined'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Box sx={dialogActionsContainerStyle}>
            <Button
              sx={(theme) => ({ ...buttonStyle, mt: 1 })}
              disableElevation
              disableRipple
              variant='contained'
              onClick={handleClick}
              fullWidth
              size='medium'
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};
