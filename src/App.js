import React from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Queries from './components/Queries';
import Query from './components/Query'
import Title from './Title';
import AddQuery from './components/AddQuery'
import DashBoard from './components/DashBoard'
import DisplayUserDetails from './components/DisplayUserDetails'

function App() {
  return (
    <BrowserRouter>
    <Title/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/list-queries" element={<Queries/>}/>
      <Route path="/query" element={<Query/>}/>
      <Route path="/add-request" element={<AddQuery/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/list-userDetails" element={<DisplayUserDetails/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
