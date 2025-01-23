import { useEffect, useState } from "react";
import { Device } from "../models/Device";
import deviceService from "../services/device-service";
import { CanceledError } from "axios";

function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false); // isLoading deleted, add later if needed
  const [error, setError] = useState<string | null>(null);

  // Fetch devices on component mount
  useEffect(() => {
    setIsLoading(true);
    deviceService
      .getDevices()
      .then((res) => {
        setDevices(res);
        setIsLoading(false);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
        setError(error.message || "Failed to fetch policies");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mb-5">Devices</h1>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-5">
        <h2>Device List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Last Seen</th>
              <th>Email</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="spinner-border"></div>
          ) : (
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.manufacturer}</td>
                  <td>{device.model}</td>
                  <td>{device.lastSeenTime}</td>
                  <td>{device.email}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Devices;
