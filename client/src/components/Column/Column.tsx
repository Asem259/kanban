import Box from '@mui/material/Box';

import { ColumnHeader } from './ColumnHeader';
import { useGetColumnQuery } from '../../app/services/columnApi';
import { columnContainer } from '../../app/styles/columnStyle';
import { Card } from '../Card/Card';
import { AddNewItem } from '../AddNewItem/AddNewItem';

interface Props {
  id: string;
}
export const Column = ({ id }: Props) => {
  const { data, isSuccess, isError, isLoading } = useGetColumnQuery(id);

  return (
    <Box sx={columnContainer}>
      <ColumnHeader
        id={id}
        title={data?.title || ''}
        bg={data?.background || ''}
      />
      {data?.cards.map((cardId) => (
        <Card key={cardId} id={cardId} />
      ))}

      <AddNewItem entity='Card' />
    </Box>
  );
};
