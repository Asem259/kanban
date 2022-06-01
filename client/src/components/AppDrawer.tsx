import { Dispatch, SetStateAction } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { AppDrawerStyle } from '../app/styles/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Backdrop } from '@mui/material';

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export const AppDrawer = ({ openDrawer, setOpenDrawer }: Props) => {
  return (
    <Drawer
      anchor='left'
      open={openDrawer}
      onClose={(e) => setOpenDrawer(false)}
      sx={AppDrawerStyle}
      ModalProps={{
        hideBackdrop: true,
        onClick: (e) => {
          if (e.currentTarget === e.target) setOpenDrawer(false);
        },
      }}
    >
      <ListItem disablePadding divider>
        <ListItemButton>
          <ListItemIcon>
            <AccountBoxIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding divider>
        <ListItemButton>
          <ListItemIcon>
            <ViewKanbanIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Boards' />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding divider>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Log out' />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};
