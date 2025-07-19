import React from "react";
import { Routes, Route } from 'react-router-dom';
import Hospital from "./hospital/Hospital";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Hospital />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;