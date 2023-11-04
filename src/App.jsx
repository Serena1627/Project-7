import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
import ReadCrewmates from './pages/ReadCrewmates'; // Import the ReadCrewmates component
import { supabase } from './client';
import RecordForm from './pages/CreateCrewmate';
import EditCrewmate from './pages/EditCrewmate';

function App() {

  return (
    <BrowserRouter>
      <div className="App">

            <h1>Create Record Form</h1>
            <RecordForm />
            <ReadCrewmates />
              <Routes>
                <Route path="/edit/:id" component={EditCrewmate} />
              </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App


