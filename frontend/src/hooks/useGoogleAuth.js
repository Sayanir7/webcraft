import { jwtDecode } from 'jwt-decode';
import API_URL from '../endpoint';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { toast } from 'sonner';

const useGoogleAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = async (credentialResponse) => {
        const { credential } = credentialResponse;
        const decoded = jwtDecode(credential); 
        // console.log(decoded); 

        dispatch(signInStart());

        
        try {
            const res = await fetch(`${API_URL}/api/auth/google`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token: credential }),
            });

            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message || "Google login failed");
                dispatch(signInFailure(data.message));
            } else {
                dispatch(signInSuccess(data));
                navigate('/new');
            }
        } catch (err) {
            console.error(err);
            dispatch(signInFailure(err.message));
            toast.error("Something went wrong during Google sign-in.");
        }
    };

    return handleGoogleLogin;
};

export default useGoogleAuth;
