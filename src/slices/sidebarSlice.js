// src/slices/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isSidebarOpen: false,
};

// Create the slice
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isSidebarOpen:false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen; // Toggles the sidebar open state
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true; // Opens the sidebar
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false; // Closes the sidebar
    },
  },
});

// Export the actions
export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;

// Export the reducer to be used in the store
export default sidebarSlice.reducer;
