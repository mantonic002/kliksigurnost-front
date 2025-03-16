import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import { UserProfile } from "../../../models/UserProfile";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { AdminPolicies } from "./AdminPolicies";
import React from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openUserPolicies, setOpenUserPolicies] = useState<number>(-1);

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
    <div className="container">
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
            <React.Fragment key={user.id}>
              <tr
                onClick={() =>
                  setOpenUserPolicies(
                    openUserPolicies === user.id ? -1 : user.id
                  )
                }
              >
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.authProvider}</td>
                <td>{user.cloudflareAccount?.accountId}</td>
                <td>
                  {user.isSetUp ? <AiOutlineCheck /> : <AiOutlineClose />}
                </td>
                <td>
                  {user.enabled ? <AiOutlineCheck /> : <AiOutlineClose />}
                </td>
                <td>{user.locked ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
              </tr>

              {openUserPolicies === user.id && (
                <tr>
                  <td colSpan={8} style={{ padding: 0 }}>
                    <div className="p-3" style={{ backgroundColor: "#f8f9fa" }}>
                      <AdminPolicies
                        policies={user.policies}
                        isLoading={false}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AdminUsers;
