import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { columnHeader } from '../../app/styles/columnStyle';
import { OptionsMenu } from '../Dialogs/OptionsMenu';

interface Props {
  id: string;
  title: string;
  bg: string;
}

export const ColumnHeader = ({ id, title, bg }: Props) => {
  return (
    <Box sx={(theme) => ({ ...columnHeader, backgroundColor: bg })}>
      <OptionsMenu entity='Column' id={id} title={title} />
      <Typography fontWeight='bold'>{title}</Typography>
    </Box>
  );
};
