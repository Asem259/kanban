import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { selectCardById } from '../../app/services/cardApi';
import { useAppSelector } from '../../app/store/hooks';
import { dialogTextField } from '../../app/styles/dialogStyle';
import { LabelMenu } from '../Label/LabelMenu';
import { ProgressBar } from './ProgressBar';
import { Task } from './Task';

interface Props {
  cardId: string;
}

export const CardContent = ({ cardId }: Props) => {
  const card = useAppSelector(selectCardById(cardId));
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  // const progressValue = card?.tasks.length
  //   ? Math.round(
  //       card.tasks.filter((task) => task.completed).length / card.tasks.length
  //     )
  //   : 0;

  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(12, 1fr)'
      alignContent='flex-start'
      gap={2}
      px={4}
      sx={(theme) => ({
        height: '100%',
        [theme.breakpoints.down('sm')]: {
          px: '8px',
        },
      })}
    >
      <Box gridColumn='span 12'>
        <Typography fontWeight={700} variant='h6'>
          {card?.title}
        </Typography>
      </Box>
      <Box gridColumn='span 12' display='flex' flexDirection='column' gap={1}>
        <Typography variant='h6' fontWeight='600'>
          Description
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={5}
          placeholder='Enter Description ...'
          sx={(theme) => dialogTextField}
        />
      </Box>
      <Box
        gridColumn='span 12'
        py={1}
        display='flex'
        gap={1}
        flexWrap='wrap'
        alignItems='center'
      >
        {card?.labels.map((label) => (
          <Chip
            key={label.id}
            label={label.name}
            sx={{ backgroundColor: label.color, color: '#fff' }}
          />
        ))}
        {matches && <LabelMenu cardId={cardId} icon />}
      </Box>
      <Box gridColumn='span 12' py={1}>
        <Typography variant='h6' fontWeight='600'>
          Tasks
        </Typography>
        <Box sx={{ width: '100%' }} my={2}>
          <ProgressBar value={40} />
        </Box>
        <Box
          sx={{ width: '100%' }}
          gap={1}
          display='flex'
          flexDirection='column'
        >
          {card?.tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
