import { ComponentType } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector } from './app/store/hooks';

import { Boards, Login, Profile, BoardView } from './pages';
import { Notification, NavBar } from './components';
import { DialogContainer } from './components/Dialogs/DialogContainer';
import { selectAction } from './app/store/boardSlice';

interface PrivatePros {
  Component: ComponentType;
}

const Private = ({ Component }: PrivatePros) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

function App() {
  const isActive = useAppSelector((state) => state.notification.isActive);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { action } = useAppSelector(selectAction);
  return (
    <>
      {isActive && <Notification />}
      {action && <DialogContainer />}
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login page='login' />} />
        <Route path='/register' element={<Login page='register' />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/Boards' element={<Boards />} />
        <Route path='/b/:boardId' element={<BoardView />} />
      </Routes>
    </>
  );
}

export default App;
