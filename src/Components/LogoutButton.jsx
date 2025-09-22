import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2 } from 'lucide-react';
import { logoutUser } from '../store/slices/authSlice';

const LogoutButton = ({ className = '', showText = true, variant = 'button' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => ({
    loading: state.auth.loading
  }));

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`text-red-600 hover:text-red-800 hover:underline flex items-center space-x-1 ${className}`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
        {showText && <span>Logout</span>}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center space-x-2 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      {showText && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;
