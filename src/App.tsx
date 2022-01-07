import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<p>There's nothing here!</p>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;