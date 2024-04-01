import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { convertMinutesToTime } from "../../utils/timeUtils";
import AddStat from "../stats/AddStat";
import StatsChart from "../stats/StatsChart";
import Stats from "../stats/Stats";

const Goal = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/v1/goals/${goalId}`);
        if (!response.ok) {
          throw new Error("Could not fetch goal details");
        }
        const data = await response.json();
        setGoal(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoal();
  }, [goalId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!goal) return <div>Goal not found</div>;

  const lastStat = goal.stats[goal.stats.length - 1];
  const lastTrackedAt = lastStat ? lastStat.created_at : null;
  const currentValue = lastStat ? lastStat.value : null;

  const handleUpdate = () => navigate(0); // A simple way to refresh the current page

  return (
    <div className="container py-5">
      <h1>{goal.description}</h1>
      <p>
        <strong>Target Date: </strong>
        {new Date(goal.target_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Target Value: </strong>
        {convertMinutesToTime(goal.target_value)}
      </p>
      <p>
        <strong>Tracking Interval: </strong>
        {goal.tracking_interval}
      </p>
      <p>
        <strong>Current Value: </strong>
        {convertMinutesToTime(currentValue)}
      </p>
      <strong>Add Stat: </strong>
      <AddStat
        goalId={goalId}
        lastTrackedAt={lastTrackedAt}
        trackingInterval={goal.tracking_interval}
        onUpdate={handleUpdate}
      />
      <Stats stats={goal.stats} goalId={goalId} onUpdate={handleUpdate} />
      <StatsChart stats={goal.stats} targetValue={goal.target_value} />
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link
          to="/goals"
          className="btn border border-dark"
        >
          Back to Goals
        </Link>
      </div>
    </div>
  );
};

export default Goal;
