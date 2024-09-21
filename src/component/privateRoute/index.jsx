import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByToken, loginhandle } from "../../Redux/slices/AuthSlice"; 
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user")); 

  const { isAuthenticated, status, error, userInfo } = useSelector((state) => state.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (userFromLocalStorage && !isAuthenticated) {
    
      dispatch(loginhandle(userFromLocalStorage));
    }
    setIsLoaded(true); 
  }, [dispatch, isAuthenticated, userFromLocalStorage]);

  
  useEffect(() => {
    const authenticateUser = async () => {
      if (token && status === 'idle') {
        try {
          await dispatch(fetchUserByToken());
        } catch (error) {
          toast.error('Failed to authenticate user.');
        }
      }
    };
    authenticateUser();
  }, [dispatch, token, status]);


  useEffect(() => {
    if (status === 'failed') {
      toast.error(error || 'Authentication failed.');
      navigate("/login");
    }
  }, [status, error, navigate]);


  if (!isLoaded || status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <svg
          className="animate-spin h-9 w-9 mr-3 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (isAuthenticated && userInfo) {
    if (userInfo.user_type === 1) {
      return <Outlet />; 
    } else {
      return <Navigate to="/" />; 
    }
  }

  if (!isAuthenticated && status === 'succeeded') {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/" />;
};

export default PrivateRoutes;
