import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/main/Header";
import './App.css';
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Order from "./components/Order";
import Admin_panel from "./components/Admin_panel"

function App() {

  return (
    <div className="App">
      <Router> {/* Make sure Router is here */}
        <Routes>
          <Route element={<Header />}>
            <Route index element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin_panel />} />
          </Route>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
