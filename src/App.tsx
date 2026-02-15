import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { RawMaterials } from './pages/RawMaterials';
import { SideBar } from './pages/SideBar';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen flex relative">
        <Toaster position="top-right" />

        <SideBar />
        <main className="md:ml-64 ml-0 mb-10 w-full px-6 pt-20 md:pt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/materials" element={<RawMaterials />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
