import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signIn } from "../firebase/auth"

const initialValues = {
  token: null,
  userData: null,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkApi) => {
  const result = await signIn(email, password);

  if (result.success) {
    const tokenInfo = result.data._tokenResponse
    localStorage.setItem('token', JSON.stringify(tokenInfo))
    localStorage.setItem('userData', JSON.stringify(result.data.user))
    return JSON.parse(JSON.stringify(result.data))
  }
  return thunkApi.rejectWithValue(result.data)
})

export const persistSession = createAsyncThunk('auth/persistSession', () => {
  const userData = localStorage.getItem('userData')
  const tokenInfo = localStorage.getItem('token')

  if (userData && tokenInfo) {
    return {
      userData: JSON.parse(userData),
      token: JSON.parse(tokenInfo)
    }
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    loadingStarted: (state) => ({
      ...state,
      isLoading: true
    }),
    loadingStopped: (state) => ({
      ...state,
      isLoading: false
    }),
    authRestarted: () => initialValues,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    }).addCase(login.rejected, (state, { payload }) => ({
      ...state,
      error: payload,
      isLoading: false,
    })).addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      userData: payload.user,
      error: null,
      isLoading: false,
      token: payload._tokenResponse
    })).addCase(persistSession.fulfilled, (state, { payload }) => ({
      ...state,
      userData: payload.userData,
      token: payload.token
    }))
  }
})

export const {
  authRestarted,
  loadingStarted,
  loadingStopped,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
