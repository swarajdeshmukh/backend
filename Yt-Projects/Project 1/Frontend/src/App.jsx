import { Route, Router, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Home from './pages/Home'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed-section" element={<Feed />} />
      </Routes>
    </>
  );
}

export default App
