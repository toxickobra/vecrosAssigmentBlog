import { Route, Routes } from 'react-router-dom';
import EditBlog from './components/EditBlog';
import BlogDetails from './pages/BlogDetails';
import LandingPage from './pages/LandingPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
  );
}

export default App;
