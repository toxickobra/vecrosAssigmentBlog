import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog } from "../slices/blogsSlice";

function BlogDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { allBlogs } = useSelector((state) => state.blogs);

  const blog = allBlogs.find((blog) => blog.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const handleDeleteClick = () => {
    dispatch(deleteBlog(id)); // Dispatch deleteBlog action with the blog ID
    navigate("/"); // Redirect to the home page after deletion
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <MdOutlineKeyboardBackspace size={40} onClick={handleBackClick} />
        </div>
        <div className="flex gap-5">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="border-2 p-2 rounded-lg bg-black text-white"
        >
          Edit
        </button>

          <button
            onClick={handleDeleteClick}
            className="border-2 p-2 rounded-lg bg-black text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <h1 className="text-[2rem] font-semibold">{blog.title}</h1>
      <img src={blog.imageUrl} alt={blog.title} className="rounded-md" />
      <p className="mt-5 text-[1.5rem]">{blog.author}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p className="absolute right-10">{blog.publicationDate}</p>
    </div>
  );
}

export default BlogDetails;
