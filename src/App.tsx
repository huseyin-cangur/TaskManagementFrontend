
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from './assets/pages/Task';
import Login from './assets/pages/Login';





function App() {
 
  return (
    <>
      <BrowserRouter>
      <Routes>     
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />          
          <Route path="tasks" element={<Task />} />  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
