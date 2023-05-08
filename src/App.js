import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginContext } from './Context/Auth';
import { useState } from 'react';


import Login from './Pages/Login/Login';
import TestPage from './Pages/TestPage/TestPage';
import Roadmap from './Pages/Roadmap/Roadmap';
import Result from './Pages/Result/Result';

function App() {
  const [username, setUsername] = useState("")
  return (
    <LoginContext.Provider value={{ username, setUsername }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
