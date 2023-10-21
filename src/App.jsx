import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/admin/Home"
import Signup from "./pages/admin/authentication/Signup"
import Login from "./pages/admin/authentication/Login"
import Dashboard from './pages/admin/dashboard/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
