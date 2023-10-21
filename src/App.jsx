import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/admin/Home"
import Signup from "./pages/admin/authentication/Signup"
import Login from "./pages/admin/authentication/Login"

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
