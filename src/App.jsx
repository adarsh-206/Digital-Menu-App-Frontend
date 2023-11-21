import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/admin/Home";
import Signup from "./pages/admin/authentication/Signup";
import Login from "./pages/admin/authentication/Login";
import Dashboard from './pages/admin/dashboard/Dashboard';
import Layout from './components/sidebar/Layout';
import MyMenu from "./pages/admin/dashboard/MyMenu";
import PreviewMenu from "./pages/admin/dashboard/PreviewMenu";
import DesignQR from "./pages/admin/dashboard/DesignQR";
import EditMenu from "./pages/admin/dashboard/EditMenu";
import Menu from "./pages/user/Menu";
import RegisterRestaurant from "./pages/admin/restaurant-registration/RegisterRestaurant";

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="register-restauarant" element={<RegisterRestaurant />} />
        <Route path="dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="my-menu" element={<Layout><MyMenu /></Layout>} />
        <Route path="edit-menu" element={<Layout><EditMenu /></Layout>} />
        <Route path="preview-menu" element={<Layout><PreviewMenu /></Layout>} />
        <Route path="design-qr" element={<Layout><DesignQR /></Layout>} />
        <Route path="menu/:gst_no/:menu_id" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;