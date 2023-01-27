import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AllPets from './components/AllPets';
import NewPet from './components/NewPet';
import EditPet from './components/EditPet';
import OnePet from './components/OnePet';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/pets" replace />} /> */}
        <Route path="/" element={<AllPets />} />
        <Route path="/pets/new" element={<NewPet />} />
        <Route path="/pets/:id" element={<OnePet/>} />
        <Route path="/pets/:id/edit" element={<EditPet/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
