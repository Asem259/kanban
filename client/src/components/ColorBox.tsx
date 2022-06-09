import { Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';

import { colorButtonStyle, colorsContainer } from '../app/styles/styles';
import { useAppSelector } from '../app/store/hooks';
import { selectAction } from '../app/store/boardSlice';

const tagsBg = [
  '#f06292',
  '#ba68c8',
  '#7986cb',
  '#ffeb3b',
  '#2e7d32',
  '#ff5722',
  '#757575',
  '#8d6e63',
];
const columnsBg = [
  '#f06292',
  '#9575cd',
  '#3f51b5',
  '#42a5f5',
  '#26a69a',
  '#4caf50',
  '#ffee58',
  '#ff7043',
];

interface Props {
  setColor: Dispatch<SetStateAction<string>>;
  color: string;
}

export const ColorBox = ({ setColor, color }: Props) => {
  const { entity } = useAppSelector(selectAction);

  const bgs = entity === 'Column' ? columnsBg : tagsBg;

  return (
    <Stack direction='row' sx={{ ...colorsContainer }}>
      {bgs.map((bg, i) => (
        <Box
          key={bg + i}
          sx={{ ...colorButtonStyle, backgroundColor: bg }}
          onClick={() => setColor(bg)}
        >
          {color === bg && <CheckIcon color='inherit' fontSize='small' />}
        </Box>
      ))}
    </Stack>
  );
};
