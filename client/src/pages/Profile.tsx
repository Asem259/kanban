import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '../app/store/store';
import { buttonStyle } from '../app/styles/styles';
import { useUpdateUserMutation } from '../app/services/api';

export const Profile = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const id = useAppSelector((state) => state.user.id);

  const [updateUser] = useUpdateUserMutation();

  return (
    <Container maxWidth='md' sx={{ height: 'calc(100vh - 48px)', pt: '32px' }}>
      <Grid container spacing={3}>
        <Grid item sx={{ width: '100%' }}>
          <Typography
            align='center'
            variant='h3'
            fontSize='32px'
            fontWeight='700'
          >
            Profile
          </Typography>
        </Grid>
        <Grid
          sx={{ gap: '10px', my: '20px' }}
          item
          container
          justifyContent='center'
          xs={12}
        >
          <Button sx={{ flexGrow: 1 }} variant='outlined' disabled>
            Change Email
          </Button>
          <Button sx={{ flexGrow: 1 }} variant='outlined' disabled>
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            label='First Name'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            label='Last Name'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={() =>
              updateUser({ id, first_name: firstName, last_name: lastName })
            }
            disableElevation
            size='large'
            variant='contained'
            fullWidth
            sx={buttonStyle}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
