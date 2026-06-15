import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ScrollToTop from './components/common/ScrollToTop';
import PWAInstallPrompt from './components/common/PWAInstallPrompt';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <PWAInstallPrompt />
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="shiny-pink-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#b3366c" />
            <stop offset="100%" stopColor="#771d3e" />
          </linearGradient>
          <linearGradient id="shiny-pink-grad-hover" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#d84b84" />
            <stop offset="100%" stopColor="#52142b" />
          </linearGradient>
        </defs>
      </svg>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
