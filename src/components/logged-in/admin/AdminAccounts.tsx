import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import { CloudflareAccount } from "../../../models/UserProfile";
import React from "react";

const AdminAccounts = () => {
  const [accs, setAccs] = useState<CloudflareAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccs = async () => {
      try {
        const response = await adminService.getAllAccounts();
        setAccs(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch accounts");
        setLoading(false);
      }
    };
    fetchAccs();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>AuthToken</th>
            <th>EnrollmentApplicationId</th>
            <th>EnrollmentPolicyId</th>
            <th>User num.</th>
          </tr>
        </thead>
        <tbody>
          {accs.map((acc) => (
            <React.Fragment key={acc.accountId}>
              <tr>
                <td>{acc.accountId}</td>
                <td>{acc.email}</td>
                <td>{acc.authorizationToken}</td>
                <td>{acc.enrollmentApplicationId}</td>
                <td>{acc.enrollmentPolicyId}</td>
                <td>{acc.userNum}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AdminAccounts;
