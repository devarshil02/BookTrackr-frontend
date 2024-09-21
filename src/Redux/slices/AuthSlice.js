import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};


export const fetchUserByToken = createAsyncThunk('user/fetchUserByToken', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/getById`, { UserId: user?._id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.isSuccess) {
      return response.data.data; 
    } else {
      return rejectWithValue(response.data.message); 
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
  }
});

const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginhandle: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logouthandle: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { loginhandle, logouthandle } = AuthSlice.actions;
export default AuthSlice.reducer;
