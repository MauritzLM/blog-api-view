import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/homePage';
import Error from './pages/errorPage';
import Post from './pages/postPage';
import AllPosts from './pages/allPostsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/posts'>
        <Route index element={<AllPosts />} />
        <Route path=':id' element={<Post />} />

      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  );
}

export default App;
