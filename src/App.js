import { Route, Routes } from 'react-router-dom';
// import Signup from './pages/signup';
import Login from './pages/login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;