import { configureStore } from '@reduxjs/toolkit';
import Cartslicer from './cartReducer';
export const Store = configureStore({
  reducer: {
    cart: Cartslicer,
  },
});
