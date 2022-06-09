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
import { useGetCardQuery } from '../../app/services/cardApi';
import { useAppSelector } from '../../app/store/hooks';

interface Props {
  id: string;
}

export const Card = ({ id }: Props) => {
  const { data } = useGetCardQuery(id);

  const navigate = useNavigate();
  const tasksCount = data?.tasks.length ?? 0;
  const location = useLocation();

  return (
    <Paper elevation={2}>
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
