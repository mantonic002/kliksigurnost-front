import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Form, Button, Row, Col } from "react-bootstrap";
import adminService from "../../../services/admin-service";
import { CloudflareAccount } from "../../../models/UserProfile";
import React from "react";

const AdminAccounts = () => {
  const [accs, setAccs] = useState<CloudflareAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    accountId: "",
    email: "",
    organizationName: "",
    authToken: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setFormSuccess("");

    try {
      await adminService.setupAccount({
        accountId: formData.accountId,
        email: formData.email,
        organizationName: formData.organizationName,
        authorizationToken: formData.authToken,
      });

      setFormSuccess("Account setup successfully!");
      setFormData({
        accountId: "",
        email: "",
        organizationName: "",
        authToken: "",
      });
      // Refresh accounts list
      const response = await adminService.getAllAccounts();
      setAccs(response);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Failed to setup account");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container  mt-4">
      <h2 className="my-4">Setup New Cloudflare Account</h2>

      <Form onSubmit={handleSubmit} className="mb-5">
        <Row>
          <Col md={4}>
            <Form.Group controlId="accountId" className="mb-3">
              <Form.Label>Account ID</Form.Label>
              <Form.Control
                type="text"
                name="accountId"
                value={formData.accountId}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="organizationName" className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="authToken" className="mb-3">
              <Form.Label>Authorization Token</Form.Label>
              <Form.Control
                type="text"
                name="authToken"
                value={formData.authToken}
                onChange={handleInputChange}
                placeholder="Bearer ..."
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {formError && (
          <Alert variant="danger" className="my-2">
            {formError}
          </Alert>
        )}
        {formSuccess && (
          <Alert variant="success" className="my-2">
            {formSuccess}
          </Alert>
        )}

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Setting Up...</span>
            </>
          ) : (
            "Setup Account"
          )}
        </Button>
      </Form>

      <h2 className="my-4">Existing Accounts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Organization</th>
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
                <td>{acc.organizationName}</td>
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
