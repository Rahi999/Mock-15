import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import Home from "./Home";
import PlayZone from "./PlayZone";

export default function AllRoutes() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playZone" element={<PlayZone />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </div>
    </>
  );
}
