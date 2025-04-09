import { useEffect, useState } from "react";
import { Device } from "../../models/Device";
import deviceService from "../../services/device-service";
import { CanceledError } from "axios";
import { formatDate } from "./Helpers";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";

function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        toast.error(error.message || "Neuspešno dobavljanje uređaja");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container  mt-4">
      <h3 className="mb-4">Uređaji</h3>

      <div className="card-container">
        <Alert className="card card-disabled">
          <div className="card-item-overflow">
            <BsInfoCircleFill size={30} className="me-2" />
            <strong>
              Možete povezati do 5 različitih uređaja!
            </strong>
          </div>
          <hr />
          <div className="card-item-overflow">
            Ukoliko se uređaj koji ste podesili ne izlistava na ovoj stranici, kontaktirajte tehničku podršku.
          </div>
        </Alert>
        {isLoading ? (
          <div className="spinner-border"></div>
        ) : (
          devices.map((device) => (
            <div key={device.id} className="card">
              <div className="card-item">
                <strong>Proizvođač:</strong> {device.manufacturer}
              </div>
              <div className="card-item">
                <strong>Model:</strong> {device.model}
              </div>
              <div className="card-item">
                <strong>Zadnji put viđen:</strong>{" "}
                {formatDate(device.lastSeenTime)}
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
