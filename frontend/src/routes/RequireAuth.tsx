import { Navigate, useLocation } from 'react-router-dom';
import paths from './paths';
import { useAppSelector } from 'store/hooks';
import Progress from 'components/loading/Progress';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    // const isAuth    = localStorage.getItem('isAuthenticated') === 'true';
    const { token, isInitialized } = useAppSelector((state) => state.auth);
    
    const isAuth    = token ? true : false;
    const location  = useLocation();

    if (!isInitialized) {
        return <Progress />;
    }

    if (!isAuth) {
        return <Navigate to={paths.signin} state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
