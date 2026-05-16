
import { useDispatch } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import API_URL from '../endpoint';

const useSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const readApiResponse = async (res) => {
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      return res.json();
    }

    const text = await res.text();
    throw new Error(
      text.trim().startsWith('<!DOCTYPE')
        ? 'API request returned the frontend HTML. Check the deployed API URL/rewrite configuration.'
        : text || 'Unexpected server response'
    );
  };

  const handleSubmit = async (formData) => {
    dispatch(signUpStart());
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await readApiResponse(res);
      if (!res.ok || data.success === false) {
        const message = typeof data.message === 'string' ? data.message : 'Signup failed';
        toast.error(message)
        dispatch(signUpFailure(message));
      } else {
        navigate('/new');
        // console.log(data);
        dispatch(signUpSuccess(data));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(signUpFailure(error.message));
    }
  };

  return {
    handleSubmit,
  };
};

export default useSignUp;
