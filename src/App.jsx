import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import AtoB from './pages/AtoB';
import Alchemy from './pages/Alchemy';
import WebDesign from './pages/WebDesign';
import BrandDesign from './pages/BrandDesign';
import Info from './pages/Info';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className={pathname !== '/' ? 'page-entering' : undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/atob" element={<AtoB />} />
        <Route path="/projects/alchemy" element={<Alchemy />} />
        <Route path="/projects/web-design" element={<WebDesign />} />
        <Route path="/projects/brand-design" element={<BrandDesign />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
