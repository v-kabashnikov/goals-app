import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Goals from "../components/goals/Goals";
import AddGoal from "../components/goals/AddGoal";
import Goal from "../components/goals/Goal";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/goal/:goalId" element={<Goal />} />
      <Route path="/add_goal" element={<AddGoal />} />
    </Routes>
  </Router>
);
