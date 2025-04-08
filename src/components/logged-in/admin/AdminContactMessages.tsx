import { useEffect, useState, useCallback } from "react";
import {
  Table,
  Spinner,
  Alert,
  Button,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { BsCheckCircleFill, BsEnvelope, BsClockHistory } from "react-icons/bs";
import adminService from "../../../services/admin-service";
import {
  ContactFormMessage,
  ContactFormStatus,
} from "../../../models/ContactFormMessage";
import { toast } from "react-toastify";

type FilterType = "pending" | "all";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState<ContactFormMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("pending");
  const [resolvingId, setResolvingId] = useState<number | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let response: ContactFormMessage[];
      if (filter === "pending") {
        response = await adminService.getPendingMessages();
      } else {
        response = await adminService.getAllMessages();
      }
      response.sort(
        (a, b) =>
          new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
      );
      setMessages(response);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError(`Failed to fetch messages. Filter: ${filter}`);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleResolveMessage = async (id: number) => {
    setResolvingId(id);
    try {
      const resolvedMessage = await adminService.resolveMessage(id);
      toast.success(`Message #${id} marked as resolved.`);

      if (filter === "pending") {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== id)
        );
      } else {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id ? { ...msg, status: resolvedMessage.status } : msg
          )
        );
      }
    } catch (err) {
      toast.error(`Failed to resolve message #${id}.`);
      setError(`Failed to resolve message #${id}.`);
    } finally {
      setResolvingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString("sr-RS")} ${date.toLocaleTimeString(
        "sr-RS"
      )}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="container mt-4">
      <h2>Contact Form Messages</h2>

      {/* Filter Buttons */}
      <ButtonGroup className="mb-3">
        <Button
          variant={filter === "pending" ? "primary" : "outline-primary"}
          onClick={() => setFilter("pending")}
        >
          <BsClockHistory className="me-1" /> Pending
        </Button>
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => setFilter("all")}
        >
          <BsEnvelope className="me-1" /> All Messages
        </Button>
      </ButtonGroup>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" /> Loading messages...
        </div>
      )}
      {error && !loading && <Alert variant="danger">{error}</Alert>}

      {/* Messages Table */}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Submitted</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ minWidth: "200px" }}>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">
                  No messages found for this filter.
                </td>
              </tr>
            )}
            {messages.map((msg) => (
              <tr key={msg.id} style={{ verticalAlign: "middle" }}>
                <td>{msg.id}</td>
                <td>{formatDate(msg.submissionDate)}</td>
                <td>{msg.name}</td>
                <td>
                  <a href={`mailto:${msg.userEmail}`}>{msg.userEmail}</a>
                </td>
                <td>
                  <a href={`tel:${msg.phoneNumber}`}>{msg.phoneNumber}</a>
                </td>
                <td>{msg.message}</td>
                <td>
                  <Badge
                    bg={
                      msg.status === ContactFormStatus.RESOLVED
                        ? "success"
                        : "warning"
                    }
                  >
                    {msg.status}
                  </Badge>
                </td>
                <td>
                  {msg.status === ContactFormStatus.PENDING && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleResolveMessage(msg.id)}
                      disabled={resolvingId === msg.id}
                      title="Mark as Resolved"
                    >
                      {resolvingId === msg.id ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        <BsCheckCircleFill />
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminContactMessages;
