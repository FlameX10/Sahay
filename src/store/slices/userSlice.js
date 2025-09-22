import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

// Load persisted user from localStorage
function loadPersistedUser() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistUser(user) {
  try {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  } catch {}
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Adjust endpoint as per backend
      const { data } = await api.get('/users/profile');
      return data?.data || data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch profile' });
    }
  }
);

const initialState = {
  user: loadPersistedUser(),
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload || null;
      state.error = null;
      persistUser(state.user);
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
      persistUser(null);
      // Optionally clear token
      try { localStorage.removeItem('token'); } catch {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload || null;
        persistUser(state.user);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || action.error;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user?.user || null;
export const selectUserRole = (state) => state.user?.user?.role || state.user?.user?.type || null;
export const selectIsAuthenticated = (state) => Boolean(localStorage.getItem('token')) && Boolean(state.user?.user);

export default userSlice.reducer;


