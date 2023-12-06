import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Header from "./Header.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.scss";

function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [organizationType, setOrganizationType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/organizations"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        setOrganizations(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setOrganizationName("");
    setOrganizationAddress("");
    setOrganizationType("");
  };

  const handleOrganizationNameChange = (event) =>
    setOrganizationName(event.target.value);
  const handleOrganizationAddressChange = (event) =>
    setOrganizationAddress(event.target.value);
  const handleOrganizationTypeChange = (event) =>
    setOrganizationType(event.target.value);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/organizations");
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleAddOrganization = async (event) => {
    event.preventDefault();

    if (!organizationName || !organizationAddress || !organizationType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (organizations.some((org) => org.OrganizationName === organizationName)) {
      toast.error("Organization with the same name already exists.");
      return;
    }

    const formData = {
      organizationName,
      organizationAddress,
      organizationType,
    };

    try {
      const response = await fetch("http://localhost:3001/admin/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleCloseModal();
        fetchOrganizations();
        toast.success("Organization successfully added!");
      } else {
        console.error("Failed to add organization");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bodeh">
      <div>
        <Header />
      </div>
      <div className="table-organization-container">
        <div className="table-organization-responsive">
          <h3 style={{ textAlign: "center" }}>Organization View</h3>
          <Button
            variant="primary"
            onClick={handleShowModal}
            className="add-organization-btn"
          >
            Add Organization
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>OrgID</th>
                <th>Organization Name</th>
                <th>Organization Address</th>
                <th>Organization Type</th>
              </tr>
            </thead>
            <tbody>
              {organizations.length > 0 ? (
                organizations.map((organization) => (
                  <tr key={organization.OrganizationId}>
                    <td>{organization.OrganizationId}</td>
                    <td>{organization.OrganizationName}</td>
                    <td>{organization.OrganizationAddress}</td>
                    <td>{organization.OrganizationType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="div3">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrganization}>
              <Form.Group controlId="formOrganizationName">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Organization Name"
                  value={organizationName}
                  onChange={handleOrganizationNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formOrganizationAddress">
                <Form.Label>Organization Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Organization Address"
                  value={organizationAddress}
                  onChange={handleOrganizationAddressChange}
                />
              </Form.Group>

              <Form.Group controlId="formOrganizationType">
                <Form.Label>Organization Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Organization Type"
                  value={organizationType}
                  onChange={handleOrganizationTypeChange}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" style={{ color: "white" }}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Organization;
