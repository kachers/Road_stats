import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Graph from './pages/Graph';
import Upload from './pages/Upload';
import Navbar from './components/Navbar';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/graph' element={<Graph />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;