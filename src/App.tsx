import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {localStorage.getItem('token') 
      ? <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      : <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="*" element={<Navigate to="login" replace/>} />
    </Routes>
    }
    </BrowserRouter>
  )
}

export default App;