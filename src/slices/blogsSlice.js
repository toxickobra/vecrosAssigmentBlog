import { createSlice } from '@reduxjs/toolkit';
import { blogs } from '../data/blogs'; // Import sample blog data

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    allBlogs: blogs, // Initialize with sample blog data
  },
  reducers: {
    addBlog: (state, action) => {
      state.allBlogs.push(action.payload);
    },
    deleteBlog: (state, action) => {
      state.allBlogs = state.allBlogs.filter(blog => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      const { id, title, excerpt, content, category, author } = action.payload;
      const blogIndex = state.allBlogs.findIndex(blog => blog.id === id);
      if (blogIndex !== -1) {
        state.allBlogs[blogIndex] = { ...state.allBlogs[blogIndex], title, excerpt, content, category, author };
      }
    },
    deleteBlogsByCategory: (state, action) => {
      state.allBlogs = state.allBlogs.filter(blog => blog.category !== action.payload);
    },
    // Add other reducers as needed
  },
});

export const {deleteBlogsByCategory, addBlog, deleteBlog, updateBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
