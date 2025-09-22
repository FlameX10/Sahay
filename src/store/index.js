import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import collegeRegistrationReducer from '../store/slices/collegeRegistrationSlice';

const store = configureStore({
  reducer: {
    collegeRegistration: collegeRegistrationReducer
  }
});

export default store;
export const useAppDispatch = () => useDispatch();


