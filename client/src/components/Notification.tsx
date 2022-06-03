import { forwardRef, useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { resetNotifications } from '../app/store/notificationSlice';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={3} ref={ref} variant='standard' {...props} />;
});

export const Notification = () => {
  const { isActive, type, msg } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: number | undefined;
    if (isActive)
      timer = setTimeout(() => dispatch(resetNotifications()), 4000);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <>
      <Snackbar
        open={isActive}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={type}>{msg}</Alert>
      </Snackbar>
    </>
  );
};
