import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Dropdown } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import { UserProfile } from "../../../models/UserProfile";
import { AdminPolicies } from "./AdminPolicies";
import React from "react";
import { BsCheck, BsLock, BsXLg } from "react-icons/bs";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openUserPolicies, setOpenUserPolicies] = useState<number>(-1);
  const [lockingUserId, setLockingUserId] = useState<number | null>(null);

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

  const handleLockUser = async (userId: number) => {
    setLockingUserId(userId);
    try {
      const updatedUser = await adminService.switchUserLock(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, locked: updatedUser.locked } : user
        )
      );
    } catch (err) {
      setError("Failed to toggle user lock status");
    } finally {
      setLockingUserId(null);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container  mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Auth Provider</th>
            <th>Organization</th>
            <th>Is setup</th>
            <th>Enabled</th>
            <th>Locked</th>
            <th>Actions</th>
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
                <td>{user.organizationName}</td>
                <td>{user.isSetUp ? <BsCheck /> : <BsXLg />}</td>
                <td>{user.enabled ? <BsCheck /> : <BsXLg />}</td>
                <td>{user.locked ? <BsCheck /> : <BsXLg />}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-actions">
                      actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleLockUser(user.id)}
                        disabled={lockingUserId === user.id}
                      >
                        {lockingUserId === user.id ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          <>
                            <BsLock />
                            {user.locked ? "Unlock" : "Lock"} User
                          </>
                        )}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>

              {openUserPolicies === user.id && (
                <tr>
                  <td colSpan={9} style={{ padding: 0 }}>
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
