import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import { BoxContainer, NavLogoStyle } from '../app/styles/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AppDrawer } from './AppDrawer';

export const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <>
      <AppBar position='static' elevation={0}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters variant='dense'>
            <Box sx={{ ...BoxContainer }} mr={2}>
              <IconButton onClick={() => setOpenDrawer(true)}>
                <MenuIcon sx={{ fontSize: '32px', color: '#fff' }} />
              </IconButton>
              <AppDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </Box>
            <Box sx={BoxContainer}>
              <Typography
                variant='h6'
                noWrap
                component={RouterLink}
                to='/home'
                sx={NavLogoStyle}
              >
                Kanban
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* <BoardsDropDown /> */}
            </Box>
            {/* {isBoardView && <BoardViewNavBar />} */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {/* <UserMenu /> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
