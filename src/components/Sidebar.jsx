// src/components/Sidebar.js
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoWhiteMode.png';
import { addCategory, setCategory } from '../slices/categorySlice'; // Add the addCategory import
import { closeSidebar } from '../slices/sidebarSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const categories = useSelector((state) => state.category.allCategories); // Get all categories
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState(''); // State for new category input
  const [showInput, setShowInput] = useState(false); // State to toggle input visibility

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(closeSidebar());
    navigate('/');
  };

  const handleSidebarClose = () => {
    console.log("closing")
    dispatch(closeSidebar());
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim())); // Dispatch action to add category
      setNewCategory(''); // Clear input field
      setShowInput(false); // Hide input after adding
    } else {
      alert('Please enter a category name');
    }
  };

  const handleCancel = () => {
    setNewCategory(''); // Clear the input field
    setShowInput(false); // Hide the input field
  };

  if (!isSidebarOpen) return null;

  return (
    <div className='h-[100vh] bg-red-100 relative'>
      <div className='logo p-10 flex items-center justify-between'>
        <img src={logo} alt='Logo' className='h-10' />
        <button
          onClick={handleSidebarClose}
          className='text-red-500 hover:text-red-700 -translate-y-1'
          aria-label='Close Sidebar'
        >
          <AiOutlineClose size={30} />
        </button>
      </div>
      <div className='options text-[2vh] font-semibold mt-10 flex flex-col gap-6 px-10'>
        {/* Keep "All" and "Featured" options static */}
        {['All', 'Featured'].map((category) => (
          <p
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer ${
              selectedCategory === category ? 'text-blue-500' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            {category}
          </p>
        ))}
        {/* Dynamically render other categories */}
        {categories.map((category) => (
          <p
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`cursor-pointer ${
              selectedCategory === category.name ? 'text-blue-500' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            {category.name}
          </p>
        ))}
      </div>

      {/* Button to show input field for adding a new category */}
      <div className='px-10 mt-10'>
        {showInput ? (
          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder='Enter category name'
              className='p-2 border rounded w-full text-black' // Ensure text is black
            />
            <button
              onClick={handleAddCategory}
              className='p-2 bg-blue-500 text-white rounded'
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className='p-2 bg-red-500 text-white rounded'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className='p-2 bg-green-500 text-white rounded'
          >
            + Create Category
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
