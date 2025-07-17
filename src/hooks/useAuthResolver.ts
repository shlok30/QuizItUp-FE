import { useEffect } from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthResolver, setLogin } from '../features/auth';
import endpoints from '../endpoints';

function useAuthResolver() {
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(setAuthResolver());
      return;
    }
    fetch(endpoints.getAuthResolved, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.ok) dispatch(setLogin());
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setAuthResolver());
      });
  }, []);
}

export default useAuthResolver;
