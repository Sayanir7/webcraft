import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutSuccess} from '../redux/user/userSlice';
import API_URL from '../endpoint';
// import { useNavigate } from 'react-router-dom';

const useAuthSync = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/chat/checkauth`, {
          method: 'GET',
          credentials: 'include', // ensure cookies are sent
        });

        // const data = await res.json();
        console.log(res.status);
        if (res.status==401) {
            // navigate('/sign-in');
            dispatch(signoutSuccess());
            localStorage.removeItem('user');
        }
      } catch (err) {
        dispatch(signoutSuccess());
        localStorage.removeItem('user');
      }
    };

    syncAuth();
  }, [dispatch]);
};

export default useAuthSync;
