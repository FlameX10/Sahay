import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

// Async thunk for counselor registration
export const registerCounselor = createAsyncThunk(
  'counselor/registerCounselor',
  async (counselorData, { rejectWithValue }) => {
    try {
      const response = await api.post('/registration/register-any', counselorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register counselor'
      );
    }
  }
);

// Async thunk for fetching counselors by college
export const fetchCounselors = createAsyncThunk(
  'counselor/fetchCounselors',
  async (collegeId, { rejectWithValue }) => {
    try {
      let url = '/counselors';
      if (collegeId) {
        url = `/counselors/college/${collegeId}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch counselors'
      );
    }
  }
);

// Async thunk for fetching all counselors (admin only)
export const fetchAllCounselors = createAsyncThunk(
  'counselor/fetchAllCounselors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/counselors');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch all counselors'
      );
    }
  }
);

// Async thunk for updating counselor status
export const updateCounselorStatus = createAsyncThunk(
  'counselor/updateCounselorStatus',
  async ({ counselorId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/counselors/${counselorId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update counselor status'
      );
    }
  }
);

// Async thunk for deleting counselor
export const deleteCounselor = createAsyncThunk(
  'counselor/deleteCounselor',
  async (counselorId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/counselors/${counselorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete counselor'
      );
    }
  }
);

const initialState = {
  counselors: [],
  loading: false,
  error: null,
  registrationSuccess: false,
  registrationError: null,
  total: 0,
  page: 1,
  totalPages: 0
};

const counselorSlice = createSlice({
  name: 'counselor',
  initialState,
  reducers: {
    clearRegistrationStatus: (state) => {
      state.registrationSuccess = false;
      state.registrationError = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register counselor
      .addCase(registerCounselor.pending, (state) => {
        state.loading = true;
        state.registrationError = null;
      })
      .addCase(registerCounselor.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.registrationError = null;
        // Add the new counselor to the list
        if (action.payload.counselor) {
          state.counselors.push(action.payload.counselor);
        }
      })
      .addCase(registerCounselor.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false;
        state.registrationError = action.payload;
      })
      // Fetch counselors
      .addCase(fetchCounselors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounselors.fulfilled, (state, action) => {
        state.loading = false;
        state.counselors = action.payload.counselors || action.payload;
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 0;
        state.error = null;
      })
      .addCase(fetchCounselors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all counselors
      .addCase(fetchAllCounselors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCounselors.fulfilled, (state, action) => {
        state.loading = false;
        state.counselors = action.payload.counselors || action.payload;
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 0;
        state.error = null;
      })
      .addCase(fetchAllCounselors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update counselor status
      .addCase(updateCounselorStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCounselorStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCounselor = action.payload;
        const index = state.counselors.findIndex(c => c._id === updatedCounselor._id);
        if (index !== -1) {
          state.counselors[index] = updatedCounselor;
        }
        state.error = null;
      })
      .addCase(updateCounselorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete counselor
      .addCase(deleteCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCounselor.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted counselor from the list
        state.counselors = state.counselors.filter(c => c._id !== action.meta.arg);
        state.error = null;
      })
      .addCase(deleteCounselor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearRegistrationStatus, clearError } = counselorSlice.actions;
export default counselorSlice.reducer;