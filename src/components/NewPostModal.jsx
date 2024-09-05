import JoditEditor from "jodit-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBlog } from '../slices/blogsSlice'; // Ensure this path is correct

const NewPostModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategories) || [];
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(''); // State for rich text content
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState(''); // State for author
  const [isFeatured, setIsFeatured] = useState(false); // State for featured

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].name); // Set default category
    }
  }, [categories, category]);

  if (!isOpen) return null;

  const handleCreatePost = () => {
    if (!title || !excerpt || !content || !category || !author) {
      alert('Please fill in all fields');
      return;
    }

    const newPost = {
      id: uuidv4(), // Generate a unique ID for the new post
      title,
      excerpt,
      content,
      category,
      publicationDate: new Date().toISOString().split('T')[0], // Set the current date in YYYY-MM-DD format
      author, // Include author
      imageUrl: 'https://via.placeholder.com/600x400', // Placeholder or default image
      featured: isFeatured // Include featured status
    };

    console.log('Dispatching addPost with:', newPost); // Debugging line
    dispatch(addBlog(newPost)); // Dispatch action to add new post
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <div className="overflow-y-auto max-h-[70vh] p-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
          ></textarea>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="mb-2"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option value="">No Categories Available</option>
            )}
          </select>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="featured"
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
              className="mr-2"
            />
            <label htmlFor="featured">Featured</label>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="border p-2 rounded-lg mr-2 text-red-600 border-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePost}
            className="border p-2 rounded-lg bg-black text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
