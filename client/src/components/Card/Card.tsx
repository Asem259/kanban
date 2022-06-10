import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

import {
  cardContainer,
  tagsContainer,
  tasksProgressContainer,
} from '../../app/styles/cardStyle';

import { useAppSelector } from '../../app/store/hooks';
import { selectCardById } from '../../app/services/boardApi';
import { selectCurrentBoard } from '../../app/store/boardSlice';
import { Card as CardType } from '../../types/index.ts';
import { useItemDrag } from '../../hooks/useItemDrag';
import { useItemDrop } from '../../hooks/useItemDrop';

interface Props {
  id: string;
  isPreview: boolean;
}

export const Card = ({ id, isPreview }: Props) => {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const data = useAppSelector(selectCardById(currentBoard, id));

  const navigate = useNavigate();
  const tasksCount = data?.tasks.length ?? 0;
  const location = useLocation();

  const draggedItem = useAppSelector((state) => state.board.draggedItem);

  const { drag } = useItemDrag({ type: 'CARD', ...(data as CardType) });
  const { ref, drop } = useItemDrop({
    type: 'CARD',
    ...(data as CardType),
  });
  drag(drop(ref));

  return (
    <Paper
      component='div'
      elevation={2}
      ref={ref}
      sx={{
        opacity: draggedItem?.id === id && !isPreview ? 0 : 1,

        transform: isPreview ? 'rotate(5deg)' : 'none',
        width: '300px',
      }}
    >
      <Box
        sx={{ ...cardContainer }}
        onClick={() =>
          navigate('/c/' + id, { state: { backgroundLocation: location } })
        }
      >
        {(data?.labels.length as number) > 0 && (
          <Box sx={tagsContainer}>
            {data?.labels.map((label) => (
              <Chip
                key={label.id}
                label={label.name}
                sx={{ backgroundColor: label.color }}
              />
            ))}
          </Box>
        )}
        <Typography align='left'>{data?.title}</Typography>
        {data?.description && (
          <Typography
            align='left'
            sx={(theme) => ({
              color: theme.palette.grey['600'],
              wordBreak: 'break-word',
            })}
          >
            {data?.description}
          </Typography>
        )}

        {(data?.total_tasks as number) > 0 && (
          <Box sx={(theme) => tasksProgressContainer}>
            {tasksCount > 0 && (
              <>
                <Typography variant='caption'>
                  {data?.completed_tasks + ' / ' + data?.total_tasks}
                </Typography>
                <AssignmentTurnedInOutlinedIcon
                  sx={{ height: '100%' }}
                  fontSize='inherit'
                />
              </>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};
