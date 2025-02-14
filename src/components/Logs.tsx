import {useEffect, useState } from "react";
import { Log } from "../models/Logs";
import logService from "../services/log-service";
import { CanceledError } from "axios";

function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Date filter state
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");

  // Function to initialize start and end date to default values
  function resetStartAndEndDateTime() {
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 20);

    // Format both dates in the required format (YYYY-MM-DDTHH:mm)
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Set the default start and end date times
    setStartDateTime(formatDate(tenDaysAgo));
    setEndDateTime(formatDate(now));
  }

  useEffect(() => {
    // Initialize start and end date only once
    resetStartAndEndDateTime();
  }, []);

  // UseEffect that triggers after startDateTime and endDateTime are set
  useEffect(() => {
    if (startDateTime && endDateTime) {
      fetchLogs();
    }
  }, [startDateTime, endDateTime]); // Dependency on startDateTime and endDateTime

  // Function to calculate the difference in seconds
  const calculateDateDifferenceInSeconds = (start: string, end: string): number => {
    const startDate = new Date(start).getTime(); // Get time in milliseconds
    const endDate = new Date(end).getTime(); // Get time in milliseconds
    const timeDifferenceInSeconds = (endDate - startDate) / 1000; // Convert milliseconds to seconds
    return timeDifferenceInSeconds;
  };

  // Handler for Start Date change
  // function handleStartChange(ev: ChangeEvent<HTMLInputElement>) {
  //   if (!ev.target["validity"].valid) return;
  //   const dt = ev.target["value"] + ":00Z";
  //   setStartDateTime(dt);
  // }

  // // Handler for End Date change
  // function handleEndChange(ev: ChangeEvent<HTMLInputElement>) {
  //   if (!ev.target["validity"].valid) return;
  //   const dt = ev.target["value"] + ":00Z";
  //   setEndDateTime(dt);
  // }

  // Convert local time to UTC format for API request
  const convertToUTC = (localDate: string) => {
    const date = new Date(localDate);
    return date.toISOString(); // This automatically converts to UTC format
  };

  // Fetch logs based on time range
  const fetchLogs = () => {
    if (!startDateTime || !endDateTime) {
      setError("Please select both start and end date/time");
      return;
    }

    // Check if the difference between the dates is more than 2,590,000 seconds (30 days)
    const dateDifferenceInSeconds = calculateDateDifferenceInSeconds(startDateTime, endDateTime);
    if (dateDifferenceInSeconds > 2592000) {
      setError("The selected date range cannot be more than 30 days apart.");
      return;
    }

    setIsLoading(true);

    const utcStartDate = convertToUTC(startDateTime);
    const utcEndDate = convertToUTC(endDateTime);

    logService
      .getLogs(utcStartDate, utcEndDate)
      .then((res) => {
        setLogs(res);
        setIsLoading(false);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
        setError(error.message || "Failed to fetch logs");
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <h1 className="mb-5">Logs</h1>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-5">
        <h2>Log List</h2>

        {/* Time range inputs */}
        {/* <div className="mb-3">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={startDateTime}
            onChange={(e) => handleStartChange(e)}
          />
        </div>

        <div className="mb-3">
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={endDateTime}
            onChange={(e) => handleEndChange(e)}
          />
        </div>

        <button className="btn btn-primary" onClick={fetchLogs}>
          Fetch Logs
        </button> */}

        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th>Category Names</th>
              <th>Query name</th>
              <th>Date & Time</th>
              <th>Application Name</th>
              <th>Policy ID</th>
              <th>Policy Name</th>
              <th>Resolver Decision</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="spinner-border"></div>
          ) : (
            <tbody>
              {logs.map((log) => (
                <tr key={log.policyId}>
                  <td>{log.categoryNames.join(", ")}</td>
                  <td>{log.queryName}</td>
                  <td>{log.datetime}</td>
                  <td>{log.matchedApplicationName}</td>
                  <td>{log.policyId}</td>
                  <td>{log.policyName}</td>
                  <td>{log.resolverDecision.toString()}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Logs;
