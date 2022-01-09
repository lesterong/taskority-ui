import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState } from 'react';

function App() {  
  const initialState = localStorage.getItem('token') ? true : false;
  const [authed, setAuthed] = useState<boolean>(initialState);
  const updateAuth = (status: boolean) => setAuthed(status);

  return (
    <BrowserRouter>
      {authed ? (
      <Routes>
        <Route path="/" element={<Home updateAuth={updateAuth}/>} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      ) : (
      <Routes>
        <Route path="/login" element={<Login updateAuth={updateAuth}/>} />
        <Route path="/signup" element={<Signup updateAuth={updateAuth} />}/>
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;