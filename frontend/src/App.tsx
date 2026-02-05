import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import type { AppDispatch } from 'store/store';
import {  Outlet, useNavigate } from 'react-router-dom';
import { refreshSession } from 'store/authActions';
import { rootPaths } from 'routes/paths';

const App = () => {
  const dispatch      = useAppDispatch();
  const refreshToken  = localStorage.getItem('refreshToken');
  const { token }     = useAppSelector((state) => state.auth);
  const navigate      = useNavigate();

  useEffect(() => {
    if (!token && refreshToken === 'true') {
      dispatch( refreshSession() );
    }
  }, [dispatch, token]);

  return <Outlet />;
};

export default App;
