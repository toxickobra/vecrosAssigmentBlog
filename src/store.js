import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './slices/blogsSlice';
import categoryReducer from './slices/categorySlice';
import sidebarReducer from './slices/sidebarSlice';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    category: categoryReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
