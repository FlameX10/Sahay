import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

// List registrations (admin protected)
export const listCollegeRegistrations = createAsyncThunk(
  'collegeRegistration/list',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/registration/college-registrations');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch registrations' });
    }
  }
);

// Create a college registration (multipart)
export const createCollegeRegistration = createAsyncThunk(
  'collegeRegistration/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/registration/college-registrations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to create registration' });
    }
  }
);

// Approve/Reject/Pending
export const approveCollegeRegistration = createAsyncThunk(
  'collegeRegistration/approve',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/registration/college-registrations/${id}/approve`);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to approve' });
    }
  }
);

export const rejectCollegeRegistration = createAsyncThunk(
  'collegeRegistration/reject',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/registration/college-registrations/${id}/reject`);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to reject' });
    }
  }
);

export const pendingCollegeRegistration = createAsyncThunk(
  'collegeRegistration/pending',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/registration/college-registrations/${id}/pending`);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to set pending' });
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  createStatus: 'idle'
};

const collegeRegistrationSlice = createSlice({
  name: 'collegeRegistration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(listCollegeRegistrations.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(listCollegeRegistrations.fulfilled, (state, action) => {
        state.loading = false; state.items = action.payload?.data || action.payload || [];
      })
      .addCase(listCollegeRegistrations.rejected, (state, action) => {
        state.loading = false; state.error = action.payload || action.error;
      })
      // create
      .addCase(createCollegeRegistration.pending, (state) => {
        state.createStatus = 'loading'; state.error = null;
      })
      .addCase(createCollegeRegistration.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        const created = action.payload?.data || action.payload;
        if (created) state.items.unshift(created);
      })
      .addCase(createCollegeRegistration.rejected, (state, action) => {
        state.createStatus = 'failed'; state.error = action.payload || action.error;
      })
      // status updates
      .addCase(approveCollegeRegistration.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id || i._id === action.payload.id);
        if (idx >= 0) state.items[idx].status = 'approved';
      })
      .addCase(rejectCollegeRegistration.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id || i._id === action.payload.id);
        if (idx >= 0) state.items[idx].status = 'rejected';
      })
      .addCase(pendingCollegeRegistration.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id || i._id === action.payload.id);
        if (idx >= 0) state.items[idx].status = 'pending';
      })
  }
});

export default collegeRegistrationSlice.reducer;


