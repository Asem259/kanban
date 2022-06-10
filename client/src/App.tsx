import { ComponentType } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from './app/store/hooks';

import { Boards, Login, Profile, BoardView, CardDetailPage } from './pages';
import { NavBar } from './components/NavBar';
import { Notification } from './components/Notification';
import { DialogContainer } from './components/Dialogs/DialogContainer';
import { CardDetailDialog } from './components/Card/CardDetailDialog';
import { selectAction } from './app/store/boardSlice';

interface PrivatePros {
  component: ComponentType;
}

const Private = ({ component: Component }: PrivatePros) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

function App() {
  const isActive = useAppSelector((state) => state.notification.isActive);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { action } = useAppSelector(selectAction);
  const location = useLocation();
  let locationState = location.state as { backgroundLocation?: Location };
  return (
    <>
      {isActive && <Notification />}
      {action && <DialogContainer />}
      {isAuthenticated && <NavBar />}
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path='/' element={<Private component={Boards} />} />
        <Route path='/login' element={<Login page='login' />} />
        <Route path='/register' element={<Login page='register' />} />
        <Route path='/profile' element={<Private component={Profile} />} />
        <Route path='/Boards' element={<Private component={Boards} />} />
        <Route path='/b/:boardId' element={<Private component={BoardView} />} />
        <Route
          path='/c/:cardId'
          element={<Private component={CardDetailPage} />}
        />
      </Routes>
      {locationState?.backgroundLocation && (
        <Routes>
          <Route
            path='/c/:cardId'
            element={<Private component={CardDetailDialog} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
