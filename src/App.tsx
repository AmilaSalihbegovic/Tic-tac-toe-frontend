import React, { useEffect, useState } from 'react';
import Login from './pages/login';
import SignIn from './pages/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/Room';
import RoomTwo from './pages/RoomTwo';
import History from './pages/History';

function App() {
  const[logedIn, setLogedIn] = useState(false);
  useEffect(()=>{

    const user = sessionStorage.getItem("UserToken");
    if(user){
      setLogedIn(true);
    }
  })
  return (
    <div>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/signin" element={<SignIn/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/history/:id" element={<History/>}/>
     <Route path='/room/:id' element={logedIn?<Room/>:<Login/>}/>
     <Route path='/room/two/:id' element={logedIn? <RoomTwo/>:<Login/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
