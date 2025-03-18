import Alert from "react-bootstrap/esm/Alert";
import { BsInfoCircleFill } from "react-icons/bs";

function GpsTracking() {
  return (
    <div className="container mt-4">
      <Alert>
        <BsInfoCircleFill size={30} className="me-2" />
        <strong>GPS praćenje dolazi 02.09.2025.</strong>
        <hr />
        <p className="mb-0">
          Ostanite u toku! Nova funkcionalnost će omogućiti precizno lociranje
          uredjaja u realnom vremenu.
        </p>
      </Alert>
    </div>
  );
}

export default GpsTracking;
