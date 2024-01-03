import React, {useState} from 'react';
import Login from './components/Login';
import Usersprofile from './components/Usersprofile';
//import Register from './components/Register';
import {BrowserRouter, Routes, Route,Link} from "react-router-dom";
import Register from './components/Register';

function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
    
    <Routes>
    <Route path ="/" element={<Register/>}/>
    <Route path ="/login" element={<Login />}/>
    <Route path ="/usersprofile" element={<Usersprofile />}/>
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;