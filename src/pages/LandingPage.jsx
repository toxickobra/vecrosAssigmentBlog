import React, { useEffect, useRef, useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewPostModal from '../components/NewPostModal';
import Sidebar from '../components/Sidebar';
import { deleteBlogsByCategory } from '../slices/blogsSlice'; // Import the delete action
import { deleteCategory } from '../slices/categorySlice';
import { closeSidebar, openSidebar } from '../slices/sidebarSlice';

function LandingPage() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isSidebarOpen) {
          dispatch(closeSidebar());
        }
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = (newPost) => {
    // Logic to handle creating the post (e.g., dispatch an action to add the post)
    console.log('New Post:', newPost);
    // Dispatch an action to update the posts in your Redux store
  };

  const allBlogs = useSelector((state) => state.blogs.allBlogs) || [];
  const selectedCategory = useSelector((state) => state.category.selectedCategory);


  const filteredBlogs = allBlogs.filter((blog) => {
    if (selectedCategory === 'Featured') {
      return blog.featured;
    }
    return selectedCategory === 'All' || blog.category === selectedCategory;
  });

  const handleSidebarToggle = () => {
    dispatch(isSidebarOpen ? closeSidebar() : openSidebar());
  };

  const handleNewPostClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteCategoryPosts = () => {
    if (selectedCategory !== 'All' && selectedCategory !== 'Featured') {
      dispatch(deleteCategory(selectedCategory));
      dispatch(deleteBlogsByCategory(selectedCategory));
    } else {
      alert('Cannot delete this category');
    }
  };

  return (
    <div className='w-[100vw] pt-10 pr-10'>
      <div
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`fixed w-[100vw] md:w-[30vw] lg:w-[20vw] top-0 left-0 h-full bg-red-200 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
      <div className='pl-10 pb-10 flex items-center justify-between'>
        <button onClick={handleSidebarToggle} className='text-[2rem]'>
          <HiMenuAlt1 size={30} />
        </button>
        <p className='text-[2rem] ml-4'>{selectedCategory}</p>
        <div className='flex justify-center items-center gap-5'>
            <button
              onClick={handleNewPostClick}
              className='border-2 p-2 rounded-lg bg-black text-white'
            >
              New Post
            </button>
            <button onClick={handleDeleteCategoryPosts}>
              <MdDeleteOutline size={30}/>
            </button>
        </div>
      </div>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
         <div className='blog-container'>
           <div key={blog.id} className='blog pl-12 mb-6  w-fit'>
            <div
              onClick={() => {
                navigate(`/blog/${blog.id}`);
              }}
              className='cursor-pointer'
            >
              <h2 className='font-medium text-xl mb-2'>{blog.title}</h2>
              {/* <img src={blog.imageUrl} alt={blog.title} className='h-[30vh] w-[70vw] object-cover mb-2' /> */}
              <p className='text-gray-600'>{blog.excerpt}</p>
            </div>
            <p className='text-sm text-gray-400'>{blog.publicationDate}</p>
          </div>
         </div>
        ))
      ) : (
        <div>No blogs available</div>
      )}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}

export default LandingPage;
