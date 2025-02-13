import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import API_URL from '../endpoint';

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (formData) => {
    dispatch(signInStart());
    try {
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' ,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message)
        dispatch(signInFailure(data.message));
      } else {
        navigate('/new');
        // console.log(data);
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return {
    handleSubmit,
  };
};

export default useSignIn;
