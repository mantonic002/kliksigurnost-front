import { useEffect, useState } from "react";
import { Log } from "../../models/Logs";
import logService from "../../services/log-service";
import { CanceledError } from "axios";
import "../../styles/components/Logs.css";
import { formatDate, utcToLocal } from "./Helpers";

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
    tenDaysAgo.setDate(now.getDate() - 10);

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
      fetchLogs("next"); // Pass a default direction
    }
  }, [startDateTime, endDateTime]);

  // Convert local time to UTC format for API request
  const convertToUTC = (localDate: string) => {
    const date = new Date(localDate);
    return date.toISOString(); // This automatically converts to UTC format
  };

  // Fetch logs based on time range
  const fetchLogs = (direction: "next" | "prev") => {
    setIsLoading(true);
    const utcStartDate = convertToUTC(startDateTime);
    const utcEndDate = convertToUTC(endDateTime);

    logService
      .getLogs({
        startDateTime: utcStartDate,
        endDateTime: utcEndDate,
        page: currentPage,
        pageSize,
        lastDateTime: direction === "next" ? lastLog?.datetime : undefined,
        lastPolicyId: direction === "next" ? lastLog?.policyId : undefined,
        direction,
      })
      .then((res) => {
        setLogs(res);
        setLastLog(res[res.length - 1] || null);
        setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
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

      {/* Table for desktop */}
      <div className="table-container d-none d-md-block">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Query Name</th>
              <th>Date & Time</th>
              <th>Application Name</th>
              <th>Category Names</th>
              {/* <th>Policy ID</th>
              <th>Policy Name</th> */}
              <th>Resolver Decision</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  <div className="spinner-border"></div>
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.policyId}>
                  <td>{log.queryName}</td>
                  <td>{formatDate(log.datetime)}</td>
                  <td>{log.matchedApplicationName}</td>
                  <td>{log.categoryNames.join(", ")}</td>
                  {/* <td>{log.policyId}</td>
                  <td>{log.policyName}</td> */}
                  <td>{log.resolverDecision.toString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="d-block d-md-none">
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          logs.map((log) => (
            <div key={log.policyId} className="log-card">
              <div className="log-card-item">
                <strong>Query Name:</strong> {log.queryName}
              </div>
              <div className="log-card-item">
                <strong>Date & Time:</strong>{" "}
                {formatDate(utcToLocal(log.datetime))}
              </div>

              {log.matchedApplicationName && (
                <div className="log-card-item">
                  <strong>Application Name:</strong>{" "}
                  {log.matchedApplicationName}
                </div>
              )}

              {log.categoryNames.length > 1 && (
                <div className="log-card-item">
                  <strong>Category Names:</strong>{" "}
                  {log.categoryNames.join(", ")}
                </div>
              )}

              {/* <div className="log-card-item">
                <strong>Policy ID:</strong> {log.policyId}
              </div> */}

              {/* <div className="log-card-item">
                <strong>Policy Name:</strong> {log.policyName}
              </div> */}
              <div className="log-card-item">
                <strong>Resolver Decision:</strong>{" "}
                {log.resolverDecision.toString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <button
          className="btn btn-success"
          onClick={() => fetchLogs("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => fetchLogs("next")}
          disabled={logs.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Logs;
