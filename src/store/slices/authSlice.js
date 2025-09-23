import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', { email, password });
      
      // Check if response is successful
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Login failed with status: ${response.status}`);
      }
    } catch (err) {
      // Handle different error scenarios
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data);
      } else if (err.message) {
        return rejectWithValue({ message: err.message });
      } else {
        return rejectWithValue({ message: 'Login failed' });
      }
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      return null;
    } catch (err) {
      return rejectWithValue({ message: 'Logout failed' });
    }
  }
);

// Initialize state from localStorage if available
const initializeAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const profileStr = localStorage.getItem('profile');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      const profile = profileStr ? JSON.parse(profileStr) : null;
      return {
        user,
        profile,
        token,
        loading: false,
        error: null,
        isAuthenticated: true
      };
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
    // Clear corrupted data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  }
  
  return {
    user: null,
    profile: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false
  };
};

const initialState = initializeAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { profile, user, accessToken } = action.payload;
      console.log('Setting credentials:', action.payload);
      state.user = user;
      state.profile = profile;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.error = null;
      
      // Store in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
    },
    initializeAuth: (state) => {
      const authState = initializeAuthState();
      Object.assign(state, authState);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the actual API response structure
        const response = action.payload;
        const { user, accessToken, profile } = response.data;
        state.user = user;
        state.profile = profile;
        state.token = accessToken;
        state.isAuthenticated = true;
        state.error = null;
        
        // Store token, user, and profile in localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        if (profile) {
          localStorage.setItem('profile', JSON.stringify(profile));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  }
});

export const { clearError, setCredentials, clearCredentials, initializeAuth } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentProfile = (state) => state.auth.profile;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserType = (state) => state.auth.user?.userType;
export const selectCollege = (state) => state.auth.profile?.college;

export default authSlice.reducer;
