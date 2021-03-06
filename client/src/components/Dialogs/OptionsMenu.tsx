import { useState, Dispatch, SetStateAction, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Entity, Action } from '../../types/index.ts';
import { OptionsMenuStyle } from '../../app/styles/styles';
import { actionsMenuButtonStyle } from '../../app/styles/styles';
import { useAppDispatch } from '../../app/store/hooks';
import { setAction } from '../../app/store/boardSlice';

interface Props {
  entity: Entity;
  id: string;
  title: string;
}

export const OptionsMenu = ({ entity, id, title }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const handleClick = (action: Action) => () => {
    dispatch(setAction({ action, id, title, entity }));
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ ...actionsMenuButtonStyle }}>
        <IconButton
          color='inherit'
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(e.currentTarget)
          }
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>
      <Menu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={(theme) => ({ ...OptionsMenuStyle })}
        elevation={6}
        anchorEl={anchorEl}
      >
        <Typography align='center' component='p' py='8px'>
          {entity} Actions
        </Typography>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClick('Edit')} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClick('Delete')} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
