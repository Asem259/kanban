import { Box } from '@mui/material';

export const CardDetailPage = () => {
  return (
    <Box sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <div>Card Detail</div>
    </Box>
  );
};
