import React from "react";
import { Routes, Route } from 'react-router-dom';
import Hospital from "./hospital/Hospital";
import Activities from "./activity/Activity";
import Navatar from "./navatar/Navatar";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/hospitals" element={<Hospital />} />
          <Route path="/navatars" element={<Navatar />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;