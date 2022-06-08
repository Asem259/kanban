import { Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';

import { colorButtonStyle, colorsContainer } from '../app/styles/styles';
import { useAppSelector } from '../app/store/hooks';
import { selectAction } from '../app/store/boardSlice';

interface Props {
  setColor: Dispatch<SetStateAction<string>>;
  color: string;
}

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
const labelBg = [
  '#ff5252',
  '#ba68c8',
  '#7986cb',
  '#64b5f6',
  '#26a69a',
  '#a1887f',
  '#ef6c00',
  '#689f3',
];

export const ColorBox = ({ setColor, color }: Props) => {
  const { entity } = useAppSelector(selectAction);

  const bgs = entity === 'Column' ? columnBg : labelBg;
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
