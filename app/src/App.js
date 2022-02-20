import React , { useState } from "react";
import {HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

//import Game from "./dependences/pages/game/Game";
import Home from "./dependences/pages/home/Home";
import Loby from "./dependences/pages/loby/Loby";
import Login from "./dependences/pages/login/Login";
import Signup from "./dependences/pages/signup/Signup";
import PrivateRoute from "./dependences/privateRoute/PrivateRoute";
import socketio from "socket.io-client";
import { location } from "./dependences/utilities/location";
//import PrivateRoute from "./dependences/privateRoute/PrivateRoute";

export const Switch = () => {

  const [stateDatas , setStateDatas] = useState({}) //state data array for entire application
 
  const getSocket = () => {
    const token = stateDatas.jwtToken // get jwt token from local storage or cookie
    let dataBuffer = stateDatas
     let socket = socketio.connect(location, {
        query: { token },
        cors: {
          origin: "http://localhost:3000",
      }
      });
      dataBuffer.socket = socket
      setStateDatas(dataBuffer)
    
  };

  return (<>
  <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login stateDatas={stateDatas} setStateDatas ={setStateDatas} />}/>
              {/*<Route path = "/loby" element={<Loby stateDatas={stateDatas} setStateDatas ={setStateDatas} />}/>*/}
              <Route path = "/loby" element={<PrivateRoute stateDatas={stateDatas} ><Loby stateDatas={stateDatas} setStateDatas ={setStateDatas} getSocket={getSocket}/></PrivateRoute>}/>{/*https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5*/}
              {/*<Route path = "/game" element={<PrivateRoute stateDatas={stateDatas} ><Game stateDatas={stateDatas} setStateDatas ={setStateDatas}/></PrivateRoute>} />*/}
            </Routes>
  </>)
};

function App() {
  return (
    <div className="App">
    <Router>
            <Switch />
      </Router>
    </div>
  );
}

export default App;