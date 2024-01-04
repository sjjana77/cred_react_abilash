import React, {useState} from 'react';
import Login from './components/Login';
import Usersprofile from './components/Usersprofile';
//import Register from './components/Register';
import {BrowserRouter, Routes, Route,Link} from "react-router-dom";
import Register from './components/Register';

function App() {
  const api_key = "059581f518d94a9d85bdb69e69353173";
  
  const api_url = "https://crudcrud.com/api/"+api_key+"/reg";
  
  return (
    <div className="App">
    <BrowserRouter>
    
    <Routes>
    <Route path ="/" element={<Register api_url={api_url} />}/>
    <Route path ="/login" element={<Login api_url={api_url} />}/>
    <Route path ="/usersprofile" element={<Usersprofile api_url={api_url} />}/>
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;