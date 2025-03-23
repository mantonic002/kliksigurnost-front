import { useEffect, useState } from "react";
import { Log } from "../../models/Logs";
import logService from "../../services/log-service";
import { CanceledError } from "axios";
import "../../styles/components/Logs.css";
import { formatDate, utcToLocal } from "./Helpers";
import React from "react";
import { toast } from "react-toastify";
import {
  BsCaretLeft,
  BsCaretLeftFill,
  BsCaretRight,
  BsCaretRightFill,
} from "react-icons/bs";

function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastLog, setLastLog] = useState<Log | null>(null);
  const [pageSize] = useState(25);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [resolverDecision, setResolverDecision] = useState<10 | 9 | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [logQueue, setLogQueue] = useState<Log[]>([]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
  };

  const resetStartAndEndDateTime = () => {
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 10);
    setDateRange({ start: formatDate(tenDaysAgo), end: formatDate(now) });
  };

  useEffect(() => {
    resetStartAndEndDateTime();
  }, []);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchLogs();
    }
  }, [
    dateRange.start,
    dateRange.end,
    resolverDecision,
    direction,
    currentPage,
  ]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await logService.getLogs({
        startDateTime: dateRange.start,
        endDateTime: dateRange.end,
        pageSize,
        lastDateTime: lastLog?.datetime,
        lastPolicyId: lastLog?.policyId,
        resolverDecision: resolverDecision || undefined,
      });
      setLogs(response);
      setHasNextPage(response.length === pageSize);
    } catch (error) {
      if (error instanceof CanceledError) return;
      toast.error("Neuspešno dobavljanje logova. Molimo pokušajte kasnije");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolverDecisionChange = (value: string) => {
    const decision = value === "allowed" ? 10 : value === "blocked" ? 9 : null;
    setCurrentPage(1);
    setLastLog(null);
    setLogQueue([]);
    setResolverDecision(decision);
  };

  const handlePagination = (newDirection: "next" | "prev") => {
    if (newDirection === "next") {
      // Add the first log of the current page to the queue
      if (logs.length > 0) {
        setLogQueue((prevQueue) => [...prevQueue, logs[0]]);
      }
      setCurrentPage((prev) => prev + 1);
      setLastLog(logs[logs.length - 1] || null);
    } else if (newDirection === "prev" && currentPage > 1) {
      // Pop the last log from the queue and use it as lastLog
      const previousLog = logQueue[logQueue.length - 1];
      setLogQueue((prevQueue) => prevQueue.slice(0, -1));
      setCurrentPage((prev) => prev - 1);
      setLastLog(previousLog || null);
    }
    setDirection(newDirection);
  };

  return (
    <div className="container  mt-4">
      <h3 className="mb-4">Logs</h3>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => handleResolverDecisionChange(e.target.value)}
        >
          <option value="">Sve</option>
          <option value="allowed">Dozvoljeno</option>
          <option value="blocked">Blokirano</option>
        </select>
      </div>

      <div className="table-container d-none d-md-block">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Link</th>
              <th>Datum i vreme</th>
              <th>Ime aplikacije</th>
              <th>Ime kategorija</th>
              <th>Dozvoljeno/Blokirano</th>
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
              logs.map((log) => <LogRow key={log.policyId} log={log} />)
            )}
          </tbody>
        </table>
      </div>
      <div className="d-block d-md-none">
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          logs.map((log) => (
            <div key={log.policyId} className="log-card">
              <LogItem log={log} />
            </div>
          ))
        )}
      </div>
      <div className="mt-3 d-flex align-items-center justify-content-center">
        {/* Left Arrow */}
        <div
          className={`action-icon ${logQueue.length === 0 ? "disabled" : ""}`}
          onClick={
            logQueue.length === 0 ? undefined : () => handlePagination("prev")
          }
        >
          <div className="icon-wrapper">
            <BsCaretLeft
              size={25}
              className={`action-blue outlined ${
                logQueue.length === 0 ? "text-muted" : ""
              }`}
            />
            <BsCaretLeftFill
              size={25}
              className={`action-blue filled ${
                logQueue.length === 0 ? "text-muted" : ""
              }`}
            />
          </div>
        </div>

        <span className="mx-2">Stranica {currentPage}</span>

        {/* Right Arrow */}
        <div
          className={`action-icon ${!hasNextPage ? "disabled" : ""}`}
          onClick={!hasNextPage ? undefined : () => handlePagination("next")}
        >
          <div className="icon-wrapper">
            <BsCaretRight
              size={25}
              className={`action-blue outlined ${
                !hasNextPage ? "text-muted" : ""
              }`}
            />
            <BsCaretRightFill
              size={25}
              className={`action-blue filled ${
                !hasNextPage ? "text-muted" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const LogRow = React.memo(({ log }: { log: Log }) => (
  <tr>
    <td>{log.queryName}</td>
    <td>{formatDate(log.datetime)}</td>
    <td>{log.matchedApplicationName}</td>
    <td>{log.categoryNames.join(", ")}</td>
    <td>
      {log.resolverDecision == 9 && (
        <div className="text-danger-alert">Blokirano</div>
      )}
      {log.resolverDecision == 10 && (
        <div className="text-success-alert">Dozvoljeno</div>
      )}
    </td>
  </tr>
));

const LogItem = React.memo(({ log }: { log: Log }) => (
  <>
    <div className="log-card-item">
      {log.resolverDecision == 9 && (
        <div className="text-danger-alert">Blokirano</div>
      )}
      {log.resolverDecision == 10 && (
        <div className="text-success-alert">Dozvoljeno</div>
      )}
    </div>
    <div className="log-card-item">
      <strong>Link:</strong> {log.queryName}
    </div>
    <div className="log-card-item">
      <strong>Datum i vreme:</strong> {formatDate(utcToLocal(log.datetime))}
    </div>
    {log.matchedApplicationName && (
      <div className="log-card-item">
        <strong>Ime aplikacije:</strong> {log.matchedApplicationName}
      </div>
    )}
    {log.categoryNames.length > 1 && (
      <div className="log-card-item">
        <strong>Ime kategorija:</strong> {log.categoryNames.join(", ")}
      </div>
    )}
  </>
));

export default Logs;
