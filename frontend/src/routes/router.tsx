import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));

// * AUTENTICACION
const AuthLayout  = lazy(() => import('layouts/auth-layout'));
const SignIn      = lazy(() => import('pages/authentication/SignIn'));
const SignUp      = lazy(() => import('pages/authentication/SignUp'));

// * PRINCIPALES
const MainLayout  = lazy(() => import('layouts/main-layout'));
const Dashboard   = lazy(() => import('pages/dashboard/Dashboard'));
const Profile     = lazy(() => import('pages/profile/Profile'));

import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import RequireAuth from './RequireAuth';
import { useAppSelector } from 'store/hooks';

const NotFoundRedirect = () => {
  // const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const { token }     = useAppSelector((state) => state.auth);
  const isAuth    = token ? true : false;
  if (isAuth) {
    return <Navigate to={`${rootPaths.root}/tasks`} replace />;
  }

  return <Navigate to={paths.signin} replace />;
};

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.root,
        element: (
          <RequireAuth>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </RequireAuth>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'tasks',
            element: <Dashboard />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: rootPaths.authRoot, // 'authentication'
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [
          { path: 'sign-in', element: <SignIn /> },
          { path: 'sign-up', element: <SignUp /> },
        ],
      },
      // Catch-all: si la ruta no existe redirige según estado de autenticación
      {
        path: '*',
        element: <NotFoundRedirect />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/' });

export default router;
