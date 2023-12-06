import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Header from "./Header.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.scss";

function Coordinator() {
  const [coordinators, setCoordinators] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newCoordinator, setNewCoordinator] = useState({
    OrganizationId: "",
    Rank: "0",
    Username: "",
    Password: "",
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewCoordinator({
      OrganizationId: "",
      Rank: "0",
      Username: "",
      Password: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCoordinator((prevCoordinator) => ({
      ...prevCoordinator,
      [name]: value,
    }));
  };

  const handleRankChange = (event) => {
    const rankValue = parseInt(event.target.value, 10);
    setNewCoordinator((prevCoordinator) => ({
      ...prevCoordinator,
      Rank: rankValue,
    }));
  };

  const getRankLabel = (rank) => {
    return rank === 0 ? "Regular" : rank === 1 ? "Head" : "";
  };

  const handleAddCoordinator = async () => {
    if (
      newCoordinator.OrganizationId === "" ||
      newCoordinator.OrganizationId === "Select Organization" ||
      newCoordinator.Username === "" ||
      newCoordinator.Password === ""
    ) {
      toast.error("Please fill in all required fields and Organization.");
      return;
    }

    try {
      // Fetch the list of existing coordinators to check for username existence
      const coordinatorsResponse = await fetch(
        "http://localhost:3001/admin/coordinators"
      );
      const coordinatorsData = await coordinatorsResponse.json();

      if (!coordinatorsResponse.ok) {
        throw new Error(
          coordinatorsData.message || "Failed to fetch coordinators"
        );
      }

      // Check if the input username already exists in the list of coordinators
      const isUsernameTaken = coordinatorsData.some(
        (coordinator) => coordinator.Username === newCoordinator.Username
      );

      if (isUsernameTaken) {
        toast.error("Username already exists. Please choose another username.");
        return;
      }

      // If the username doesn't exist, add the coordinator
      const { PersonId, ...coordinatorWithoutPersonId } = newCoordinator;
      const response = await fetch(
        "http://localhost:3001/admin/addCoordinator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCoordinator),
        }
      );

      if (response.ok) {
        handleCloseModal();
        toast.success("Coordinator successfully added!");

        // Fetch the updated list of coordinators
        fetchCoordinators();
      } else {
        console.error("Failed to add coordinator");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organizations
        const organizationsResponse = await fetch(
          "http://localhost:3001/admin/organizations"
        );
        const organizationsData = await organizationsResponse.json();

        if (!organizationsResponse.ok) {
          throw new Error(
            organizationsData.message || "Failed to fetch organizations"
          );
        }

        setOrganizations(organizationsData);

        // Fetch coordinators
        const coordinatorsResponse = await fetch(
          "http://localhost:3001/admin/coordinators"
        );
        const coordinatorsData = await coordinatorsResponse.json();

        if (!coordinatorsResponse.ok) {
          throw new Error(
            coordinatorsData.message || "Failed to fetch coordinators"
          );
        }

        setCoordinators(coordinatorsData);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/coordinators");
      const data = await response.json();
      data.sort((a, b) => {
        if (a.Rank === b.Rank) {
          return a.OrganizationId - b.OrganizationId;
        }
      });
      setCoordinators(data);
    } catch (error) {
      console.error("Failed to fetch coordinators:", error);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

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
        <div className="table-subscriber-container">
          <h3 style={{ textAlign: "center" }}>Coordinator View</h3>
          <div className="table-coordinator-responsive">
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="add-coordinator-btn"
            >
              Add Coordinator
            </Button>
            <div className="table-container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>CoordinatorId</th>
                    <th>Organization Name</th>
                    <th>Rank</th>
                    <th>PersonId</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {coordinators.length > 0 ? (
                    coordinators.map((coordinator) => (
                      <tr key={coordinator.CoordinatorId}>
                        <td>{coordinator.CoordinatorId}</td>
                        <td>{coordinator.OrganizationName}</td>
                        <td>{getRankLabel(coordinator.Rank)}</td>
                        <td>{coordinator.PersonId}</td>
                        <td>{coordinator.Username}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", color: "white" }}
                      >
                        No coordinators data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <div className="div3">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Coordinator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formOrganizationId">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  as="select"
                  name="OrganizationId"
                  value={newCoordinator.OrganizationId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org) => (
                    <option key={org.OrganizationId} value={org.OrganizationId}>
                      {org.OrganizationName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRank">
                <Form.Label>Rank</Form.Label>
                <div key="inline-radio" className="mb-3">
                  <Form.Check
                    inline
                    label="Regular"
                    type="radio"
                    id="radio-regular"
                    name="Rank"
                    value={0}
                    defaultChecked={newCoordinator.Rank == 0}
                    onChange={handleRankChange}
                  />
                  <Form.Check
                    inline
                    label="Head"
                    type="radio"
                    id="radio-head"
                    name="Rank"
                    value={1}
                    checked={newCoordinator.Rank === 1}
                    onChange={handleRankChange}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here"
                  name="Username"
                  value={newCoordinator.Username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Type here"
                  name="Password"
                  value={newCoordinator.Password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <br />
              <Button
                variant="primary"
                onClick={handleAddCoordinator}
                style={{ color: "white" }}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Coordinator;
