import { useEffect, useState } from "react";
import { Device } from "../../models/Device";
import deviceService from "../../services/device-service";
import { CanceledError } from "axios";
import { formatDate } from "./Helpers";

function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        setError(error.message || "Failed to fetch devices");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">Devices</h3>

      {error && <div className="text-danger-alert">{error}</div>}

      <div className="card-container">
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          devices.map((device) => (
            <div key={device.id} className="card">
              <div className="card-item">
                <strong>Manufacturer:</strong> {device.manufacturer}
              </div>
              <div className="card-item">
                <strong>Model:</strong> {device.model}
              </div>
              <div className="card-item">
                <strong>Last Seen:</strong> {formatDate(device.lastSeenTime)}
              </div>
              <div className="card-item">
                <strong>Email:</strong> {device.email}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Devices;
