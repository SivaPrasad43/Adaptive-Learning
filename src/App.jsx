import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginContext } from './Context/Auth';
import { useState } from 'react';


import Login from './Pages/Login/Login';
import TestPage from './Pages/TestPage/TestPage';
import Roadmap from './Pages/Roadmap/Roadmap';
import Result from './Pages/Result/Result';
import SelectSub from './Pages/SelectSub/SelectSub';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Instructions from './Pages/Instructions/Instructions';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {

  const [username, setUsername] = useState("")

  return (
    <LoginContext.Provider value={{ username, setUsername }}>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route exact path="/" element={<Login />} />
          <Route path='/select-sub' element={<SelectSub/>}/>
          <Route path='/instructions' element={<Instructions/>}/>
          <Route path="/test/Python" element={<TestPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/result" element={<Result />} />
          <Route path="/dashboard/:username/" element={<Dashboard />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
