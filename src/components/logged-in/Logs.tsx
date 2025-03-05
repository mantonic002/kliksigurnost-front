import {useEffect, useState } from "react";
import { Log } from "../../models/Logs";
import logService from "../../services/log-service";
import { CanceledError } from "axios";

function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastLog, setLastLog] = useState<Log | null>(null);
  const [pageSize] = useState(25);

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
      fetchLogs('next'); // Pass a default direction
    }
  }, [startDateTime, endDateTime]);

  // Convert local time to UTC format for API request
  const convertToUTC = (localDate: string) => {
    const date = new Date(localDate);
    return date.toISOString(); // This automatically converts to UTC format
  };

  // Fetch logs based on time range
  const fetchLogs = (direction: 'next' | 'prev') => {
    setIsLoading(true);
    const utcStartDate = convertToUTC(startDateTime);
    const utcEndDate = convertToUTC(endDateTime);

    logService.getLogs({
      startDateTime: utcStartDate,
      endDateTime: utcEndDate,
      page: currentPage,
      pageSize,
      lastDateTime: direction === 'next' ? lastLog?.datetime : undefined,
      lastPolicyId: direction === 'next' ? lastLog?.policyId : undefined,
      direction,
    })
      .then((res) => {
        setLogs(res);
        setLastLog(res[res.length - 1] || null);
        setCurrentPage(prev => direction === 'next' ? prev + 1 : prev - 1);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message || "Failed to fetch logs");
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <h3 className="mb-4">Logs</h3>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-container">
        <table className="table">
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
        <div>
          <button 
            className="btn btn-success"
            onClick={() => fetchLogs('prev')} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            className="btn btn-success"
            onClick={() => fetchLogs('next')} 
            disabled={logs.length < pageSize}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logs;