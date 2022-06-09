import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { selectCardById } from '../../app/services/boardApi';
import { useAppSelector } from '../../app/store/hooks';
import { LabelMenu } from '../Label/LabelMenu';
import { ProgressBar } from './ProgressBar';
import { Task } from './Task';
import { EditCardContentForm } from './EditCardContentForm';
import { AddNewTaskMenu } from './AddNewTaskMenu';
import { selectCurrentBoard } from '../../app/store/boardSlice';

interface Props {
  cardId: string;
}

export const CardContent = ({ cardId }: Props) => {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const card = useAppSelector(selectCardById(currentBoard, cardId));

  const [showForm, setShowForm] = useState<boolean>(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  let progressValue = 0;
  if (card && card.total_tasks > 0)
    progressValue = Math.round(
      (card?.completed_tasks / card?.total_tasks) * 100
    );

  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(12, 1fr)'
      alignContent='flex-start'
      gap={2}
      pr={2}
      sx={(theme) => ({
        height: '100%',
      })}
    >
      <Box
        gridColumn='span 12'
        display='flex'
        sx={{ height: 'fit-content' }}
        flexDirection='column'
        gap={1}
        onClick={() => setShowForm(true)}
      >
        <Typography variant='h6' fontWeight='600'>
          Description
        </Typography>
        {!showForm ? (
          <Typography>{card?.description || '\n'}</Typography>
        ) : (
          <EditCardContentForm
            multiLine
            field='description'
            cardId={cardId}
            setShowForm={setShowForm}
          />
        )}
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
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' fontWeight='600'>
            Tasks
          </Typography>
          {matches && <AddNewTaskMenu cardId={card?.id as string} />}
        </Box>

        <Box sx={{ width: '100%' }} my={2}>
          <ProgressBar value={progressValue} />
        </Box>
        <Box
          sx={{ width: '100%' }}
          gap={1}
          display='flex'
          flexDirection='column'
        >
          {card?.tasks.map((task) => (
            <Task key={task.id} {...task} card={cardId} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
