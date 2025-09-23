import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import collegeRegistrationReducer from '../store/slices/collegeRegistrationSlice';
import userReducer from '../store/slices/userSlice';
import authReducer from '../store/slices/authSlice';
import counselorReducer from '../store/slices/counselorSlice';

const store = configureStore({
  reducer: {
    collegeRegistration: collegeRegistrationReducer,
    user: userReducer,
    auth: authReducer,
    counselor: counselorReducer
  }
});

export default store;
export const useAppDispatch = () => useDispatch();


