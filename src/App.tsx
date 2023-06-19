import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Nav';
import { PaletteGenerator } from './components/PaletteGenerator';
import { PhotoColorSeeker } from './components/PhotoColorSeeker';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleIsSignedIn = () => {
    setIsSignedIn(true)
  }
  const handleIsSignedOut = () => {
    setIsSignedIn(false)
  }

  return (
    <div className="h-screen md:overflow-hidden sm:overflow-y-auto sm:overflow-x-hidden">
      <Router>
        <Navbar handleIsSignedIn={handleIsSignedIn} handleIsSignedOut={handleIsSignedOut}/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='palGenerator' element={<PaletteGenerator signedIn={isSignedIn}/>} />
          <Route path='photoColors' element={<PhotoColorSeeker/>} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
