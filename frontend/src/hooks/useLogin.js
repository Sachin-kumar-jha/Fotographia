// hooks/useLogin.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/thunks/authThunk';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser, loading, error } = useSelector((state) => state.auth);

  
  const handleLogin = async (credentials) => {
    const res = dispatch(loginUser(credentials));
  console.log(res);
    if (res.success) navigate('/user');
  };

  // ✅ Auto-redirect if already logged in

  useEffect(() => {
    if (user) {
      navigate('/user',);
    }
  }, [user, navigate]);

  return { handleLogin, loading, error };
};


export default useLogin;
