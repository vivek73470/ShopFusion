
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { productApi } from '../services/api/productApi';
import { cartApi } from '../services/api/cartApi';
import { orderApi } from '../services/api/orderApi';
import { contactApi } from '../services/api/contactApi';
import { userApi } from '../services/api/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      contactApi.middleware,
      userApi.middleware
    ),
});
