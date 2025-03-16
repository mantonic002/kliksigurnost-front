// components/admin/AdminUsers.tsx
import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import { UserProfile } from "../../../models/UserProfile";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getAllUsers();
        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
          <th>Auth Provider</th>
          <th>Cloudflare account</th>
          <th>Is setup</th>
          <th>Enabled</th>
          <th>Locked</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.authProvider}</td>
            <td>{user.cloudflareAccount?.accountId}</td>
            <td>{user.isSetUp ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
            <td>{user.enabled ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
            <td>{user.locked ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminUsers;
