import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props {
  handleChange: (
    p: 'password'
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
}

export const PasswordField = ({ handleChange, password }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl sx={{ my: 1 }} variant='outlined' fullWidth>
      <InputLabel htmlFor='outlined-adornment-password'>Password *</InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
        value={password}
        required
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      />
    </FormControl>
  );
};
