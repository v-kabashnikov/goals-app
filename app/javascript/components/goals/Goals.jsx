import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddStat from "../stats/AddStat";
import { convertMinutesToTime } from "../../utils/timeUtils";

const getProgressClassName = (currentValue, targetValue) => {
  const percentage = (currentValue / targetValue) * 100;
  if (percentage < 33) return "bg-danger";
  if (percentage < 67) return "bg-warning";
  return "bg-success";
};

const Goals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const url = "/api/v1/goals";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setGoals(res))
      .catch(() => navigate("/"));
  }, []);

  const handleUpdate = () => {
    const url = "/api/v1/goals";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setGoals(res))
      .catch(() => navigate("/"));
  };

  const deleteGoal = (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      const url = `/api/v1/goals/${goalId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          setGoals(goals.filter((goal) => goal.id !== goalId));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Goals</h1>
          <p className="lead text-muted">
            Track your progress and achieve your goals.
          </p>
        </div>
      </section>
      <div className="container py-5">
        {goals.length > 0 ? (
          <>
            <table className="table text-center align-middle">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Current Progress</th>
                  <th>Target Value</th>
                  <th>Tracking Interval</th>
                  <th>Track Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.description}</td>
                    <td
                      className={getProgressClassName(
                        goal.current_value,
                        goal.target_value
                      )}
                    >
                      {convertMinutesToTime(goal.current_value)}
                    </td>
                    <td>{convertMinutesToTime(goal.target_value)}</td>
                    <td>{goal.tracking_interval}</td>
                    <td>
                      <AddStat
                        goalId={goal.id}
                        lastTrackedAt={goal.last_tracked_at}
                        trackingInterval={goal.tracking_interval}
                        onUpdate={handleUpdate}
                      />
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link
                          to={`/goal/${goal.id}`}
                          className="btn border border-dark"
                        >
                          View
                        </Link>
                        <button
                          className="btn border border-dark"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mb-3">
              <Link to="/add_goal" className="btn btn-secondary">
                Add Goal
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center mb-3">
            No goals yet. <Link to="/add_goal">Create one</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Goals;
