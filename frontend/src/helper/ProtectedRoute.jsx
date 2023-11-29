import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        // Show toast warning
        toast.warn('Unauthorized access attempt detected. Please log in.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        // Redirect to login
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
