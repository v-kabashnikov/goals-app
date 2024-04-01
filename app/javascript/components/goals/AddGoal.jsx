import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertToTotalMinutes } from "../../utils/timeUtils";

const AddGoal = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  // Add 7 days to the current date to set the default target date to one week from now
  currentDate.setDate(currentDate.getDate() + 7);

  // Format the date as a string in 'YYYY-MM-DD' format for the input
  const defaultTargetDate = currentDate.toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState(defaultTargetDate);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [trackingInterval, setTrackingInterval] = useState("weekly");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/goals";
    const totalMinutes = convertToTotalMinutes(days, hours, minutes);

    const body = {
      description: description,
      target_date: targetDate,
      target_value: totalMinutes,
      tracking_interval: trackingInterval,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.error.join(", "));
          });
        }
      })
      .then((response) => navigate(`/goals`))
      .catch((error) => alert(error));

  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new goal.</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="goalName">Description</label>
              <input
                type="text"
                name="description"
                id="goalName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setDescription)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="targetDate">Target date</label>
              <input
                type="date"
                name="targetDate"
                id="targetDate"
                className="form-control"
                value={targetDate}
                required
                onChange={(event) => onChange(event, setTargetDate)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="trackingInterval">Tracking Interval</label>
              <select
                className="form-select"
                id="trackingInterval"
                name="trackingInterval"
                value={trackingInterval}
                required
                onChange={(event) => onChange(event, setTrackingInterval)}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <small id="intervalHelp" className="form-text text-muted">
                Time frames in which these stats are captured
              </small>
            </div>
            <div className="form-group mb-3">
              <label>Target value</label>
              <div className="row text-center">
                <div className="col">
                  <label htmlFor="days">Days</label>
                  <input
                    min={0}
                    max={30}
                    type="number"
                    className="form-control"
                    id="days"
                    placeholder="Days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="hours">Hours</label>
                  <input
                    min={0}
                    max={23}
                    type="number"
                    className="form-control"
                    id="hours"
                    placeholder="Hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="minutes">Minutes</label>
                  <input
                    min={0}
                    max={59}
                    type="number"
                    className="form-control"
                    id="minutes"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-secondary me-2">
                Create
              </button>
              <Link to="/goals" className="btn border border-dark">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGoal;
