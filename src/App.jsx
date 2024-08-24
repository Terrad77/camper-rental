import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CamperCatalog from './pages/CamperCatalog/CamperCatalog';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';
import { selectLoading } from './redux/reducers/camperSlice';

function App() {
  const isLoading = useSelector(selectLoading);

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Navbar />
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CamperCatalog />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        )}
      </div>
    </Suspense>
  );
}

export default App;
