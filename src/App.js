import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homePage/homePage';
import { ListingPage } from './pages/listingPage/listingPage';
import { VideoDetail } from './pages/videoDetail/videoDetail';
import { WatchLater } from './pages/watchLater/watchLater';
import { Explore } from './pages/explore/explore';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:categorySelected" element={<ListingPage />} />
        <Route path="/listing/:categorySelected/:videoSelected" element={<VideoDetail />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
