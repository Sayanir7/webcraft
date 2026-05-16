import API_URL from '../endpoint';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { toast } from 'sonner';

const useGoogleAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleGoogleLogin = async (credentialResponse) => {
        const { credential } = credentialResponse;

        dispatch(signInStart());

        
        try {
            const res = await fetch(`${API_URL}/api/auth/google`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token: credential }),
            });

            const data = await readApiResponse(res);

            if (!res.ok || data.success === false) {
                const message = typeof data.message === 'string' ? data.message : "Google login failed";
                toast.error(message);
                dispatch(signInFailure(message));
            } else {
                dispatch(signInSuccess(data));
                navigate('/new');
            }
        } catch (err) {
            console.error(err);
            dispatch(signInFailure(err.message));
            toast.error(err.message || "Something went wrong during Google sign-in.");
        }
    };

    return handleGoogleLogin;
};

export default useGoogleAuth;
