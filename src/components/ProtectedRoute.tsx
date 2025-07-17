import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RootState } from '../store'; // Adjust based on your setup
import Loader from './Loader';

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isLoggedIn, isAuthResolved } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthResolved) return <Loader />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
