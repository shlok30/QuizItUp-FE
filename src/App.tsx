import { Route, Routes } from 'react-router';
import ProtectedRoutes from './components/ProtectedRoute';
import routes from './routes';
import useAuthResolver from './hooks/useAuthResolver';

function App() {
  useAuthResolver();
  return (
    <>
      <Routes>
        {routes.map(({ path, component: Component, isProtected }) => (
          <Route
            path={path}
            element={
              isProtected ? (
                <ProtectedRoutes>
                  <Component />
                </ProtectedRoutes>
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
