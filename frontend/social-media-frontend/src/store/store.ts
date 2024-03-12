import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { authApi } from './middleware/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store