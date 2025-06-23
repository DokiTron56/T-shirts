import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Admin from './Admin'; // este es el componente nuevo
import { CarritoProvider } from './CarritoContext';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;

