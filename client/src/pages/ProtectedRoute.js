import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'; //<Navigate/> from 'react-router-dom' also an option

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate('/landing');
    }
  }, [user, navigate]);

  return children;
};
export default ProtectedRoute;
