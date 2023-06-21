import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/homePage';
import Error from './pages/errorPage';
import Post from './pages/postPage';
import AllPosts from './pages/allPostsPage';

function App() {

  const [recentPosts, setRecentPosts] = useState([]);

  // get 5 most recent posts*
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:3001/recentposts", { method: 'GET' });

        const data = await response.json();

        if (data.error) {
          console.log(data.error);
          return;
        }

        console.log(data);

        setRecentPosts([...data]);

      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home recentPosts={recentPosts} />} />
      <Route path='/posts'>
        <Route index element={<AllPosts />} />
        <Route path=':id' element={<Post recentPosts={recentPosts} />} />

      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  );
}

export default App;
