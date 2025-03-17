import { useEffect, useState } from "react";
import { Tab, Tabs, Container, Spinner, Alert } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import AdminUsers from "./AdminUsers";
import AdminAccounts from "./AdminAccounts";
import AdminAppointments from "./AdminAppointments";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await adminService.getAllUsers();
        setIsLoading(false);
      } catch (err) {
        setError("err");
        setIsLoading(false);
      }
    };
    verifyAdmin();
  }, []);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Tabs defaultActiveKey="users" className="mb-3">
        <Tab eventKey="users" title="Users">
          <AdminUsers />
        </Tab>
        <Tab eventKey="accounts" title="Cloudflare Accounts">
          <AdminAccounts />
        </Tab>
        <Tab eventKey="appointments" title="Appointments">
          <AdminAppointments />
        </Tab>
      </Tabs>
    </Container>
  );
};
export default AdminDashboard;
