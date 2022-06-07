import { Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';

import { colorButtonStyle, colorsContainer } from '../app/styles/styles';

interface Props {
  setColor: Dispatch<SetStateAction<string>>;
  color: string;
}

export const ColorBox = ({ setColor, color }: Props) => {
  const columnBg = [
    '#f06292',
    '#9575cd',
    '#3f51b5',
    '#42a5f5',
    '#26a69a',
    '#4caf50',
    '#ffee58',
    '#ff7043',
  ];
  const labelsBg = [];
  return (
    <Stack direction='row' spacing={2} sx={{ ...colorsContainer }}>
      {columnBg.map((bg, i) => (
        <Box
          key={bg + i}
          sx={{ ...colorButtonStyle, backgroundColor: bg }}
          onClick={() => setColor(bg)}
        >
          {color === bg && <CheckIcon color='inherit' fontSize='large' />}
        </Box>
      ))}
    </Stack>
  );
};
