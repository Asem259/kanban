import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

import {
  cardContainer,
  tagsContainer,
  tasksProgressContainer,
} from '../../app/styles/cardStyle';
import { useGetCardQuery } from '../../app/services/cardApi';

interface Props {
  id: string;
}

export const Card = ({ id }: Props) => {
  const { data } = useGetCardQuery(id);
  console.log(data);

  const navigate = useNavigate();
  const tasksCount = data?.tasks.length ?? 0;
  const location = useLocation();

  return (
    <Box
      sx={{ ...cardContainer }}
      onClick={() =>
        navigate('/c/' + id, { state: { backgroundLocation: location } })
      }
    >
      <Box sx={tagsContainer}>
        {data?.labels.map((label) => (
          <Chip
            key={label.id}
            label={label.name}
            sx={{ backgroundColor: label.color }}
          />
        ))}
      </Box>
      <Typography align='left'>{data?.title}</Typography>
      <Typography
        align='left'
        sx={(theme) => ({
          color: theme.palette.grey['600'],
          wordBreak: 'break-word',
        })}
      >
        {data?.description}
      </Typography>
      <Divider variant='middle' light />

      <Box sx={(theme) => tasksProgressContainer}>
        {tasksCount > 0 && (
          <>
            <Typography variant='caption'>
              {data?.tasks.filter((task) => task.completed).length +
                ' / ' +
                data?.tasks.length}
            </Typography>
            <AssignmentTurnedInOutlinedIcon
              sx={{ height: '100%' }}
              fontSize='inherit'
            />
          </>
        )}
      </Box>
    </Box>
  );
};
