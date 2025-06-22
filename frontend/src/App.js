import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ENDofDAIZYReplica from './components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ENDofDAIZYReplica />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;