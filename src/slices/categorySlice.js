// src/slices/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/category'; // Your initial category data

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    allCategories: categories, // Set the initial categories
    selectedCategory: 'All', // Default selected category
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    addCategory: (state, action) => {
      state.allCategories.push({ id: Date.now(), name: action.payload }); // Add new category
    },
    deleteCategory: (state, action) => {
      // Filter out the deleted category
      state.allCategories = state.allCategories.filter(
        (category) => category.name !== action.payload
      );
      // Reset selected category if it was deleted
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = 'All';
      }
    },
  },
});

export const { setCategory, updateCategories, addCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
