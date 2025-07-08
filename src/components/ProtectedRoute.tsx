import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RootState } from '../store'; // Adjust based on your setup

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
