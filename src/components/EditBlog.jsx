import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBlog } from '../slices/blogsSlice';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.blogs);

  const blog = allBlogs.find((blog) => blog.id === id);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setExcerpt(blog.excerpt);
      setContent(blog.content);
      setCategory(blog.category);
      setAuthor(blog.author);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ id, title, excerpt, content, category, author }));
    navigate(`/blog/${id}`); // Redirect to the blog details page after updating
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-[2rem] font-semibold">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full"
            rows="10"
          />
        </div>
        <div>
          <label className="block">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="border-2 p-2 mt-4 rounded-lg bg-black text-white">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
