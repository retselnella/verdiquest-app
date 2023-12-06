import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Header from "./Header.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.scss";

const TASK_DIFFICULTY_MAP = {
  Easy: "1",
  Normal: "2",
  Hard: "3",
};

const Tasks = () => {
  const [editTask, setEditTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("Easy");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [verdiPoints, setVerdiPoints] = useState(150);
  const [tasks, setTasks] = useState([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    clearFormFields();
  };

  const clearFormFields = () => {
    setTaskName("");
    setTaskDifficulty("Easy");
    setTaskDescription("");
    setTaskDuration("");
    setVerdiPoints(150);
  };

  const handleTaskNameChange = (event) => setTaskName(event.target.value);
  const handleTaskDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setTaskDifficulty(newDifficulty);

    switch (newDifficulty) {
      case "Easy":
        setVerdiPoints(150);
        break;
      case "Normal":
        setVerdiPoints(250);
        break;
      case "Hard":
        setVerdiPoints(500);
        break;
    }
  };
  const handleTaskDescriptionChange = (event) =>
    setTaskDescription(event.target.value);
  const handleTaskDurationChange = (event) =>
    setTaskDuration(event.target.value);
  const handleVerdiPointsChange = (event) => setVerdiPoints(event.target.value);

  const handleDeleteTaskConfirm = async () => {
    if (taskToDelete) {
      handleDeleteTask(taskToDelete);
      setTaskToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/task/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const newTasks = tasks.filter((task) => task.TaskId !== taskId);
        setTasks(newTasks);
        toast.error("Task Deleted");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setTaskName(task.TaskName);
    setTaskDifficulty(
      task.DifficultyId === 1
        ? "Easy"
        : task.DifficultyId === 2
        ? "Normal"
        : task.DifficultyId === 3
        ? "Hard"
        : "Unknown"
    );
    setTaskDescription(task.TaskDescription);
    setTaskDuration(task.TaskDuration);
    setVerdiPoints(task.TaskPoints);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    if (!taskName || !taskDescription || !taskDuration) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const formData = {
      taskDifficulty: TASK_DIFFICULTY_MAP[taskDifficulty],
      taskName: taskName,
      taskDescription: taskDescription,
      taskPoints: verdiPoints,
      taskDuration: taskDuration,
    };
  
    try {
      const response = await fetch(
        `http://localhost:3001/admin/task/${editTask.TaskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        setShowEditModal(false);
        toast.success("Task updated successfully");
        fetchTasks();
        clearFormFields();
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the task.");
    }
  };

  const handleDeactivateTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/task/inactive/${taskId}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        const updatedTasks = tasks.map((task) => {
          if (task.TaskId === taskId) {
            task.Status = "Inactive";
          }
          return task;
        });
        setTasks(updatedTasks);
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/tasks");
      const data = await response.json();
      data.sort((a, b) => a.TaskId - b.TaskId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!taskName || !taskDescription || !taskDuration) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const formData = {
      taskDifficulty: TASK_DIFFICULTY_MAP[taskDifficulty],
      organizationId: "1",
      taskName: taskName,
      taskDescription: taskDescription,
      taskPoints: verdiPoints,
      taskDuration: taskDuration,
      Status: "Active",
    };
  
    try {
      const response = await fetch("http://localhost:3001/admin/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        handleCloseModal();
        toast.success("Task successfully added!");
        fetchTasks();
        clearFormFields();
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the task.");
    }
  };

  return (
    <div className="bodeh">
      <div>
        <Header />
      
      <div className="div3">
        <div className="div3">
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Daily Task</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTaskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={handleTaskNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskDifficulty">
                  <Form.Label>Task Difficulty</Form.Label>
                  <Form.Control
                    as="select"
                    value={taskDifficulty}
                    onChange={handleTaskDifficultyChange}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Hard">Hard</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTaskDescription">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskDuration">
                  <Form.Label>Task Duration</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter task Duration (hrs)"
                    value={taskDuration}
                    onChange={handleTaskDurationChange}
                  />
                </Form.Group>

                <Form.Group controlId="formVerdiPoints">
                  <Form.Label>VerdiPoints (Rewards)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter VerdiPoints"
                    value={verdiPoints}
                    onChange={handleVerdiPointsChange}
                    readOnly
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ color: "white" }}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>

        <div className="table-task-container">
          <div className="table-task-responsive">
            <h3 style={{ textAlign: "center" }}>Tasks View</h3>
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="add-task-btn"
            >
              ADD TASK
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Organization Name</th>
                  <th>Task Name</th>
                  <th>Task Difficulty</th>
                  <th>Task Description</th>
                  <th>Task Duration</th>
                  <th>VerdiPoints</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tasks) && tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr key={task.TaskId}>
                      <td>{index + 1}</td>
                      <td>{task.OrganizationName}</td>
                      <td>{task.TaskName}</td>
                      <td>
                        {task.DifficultyId === 1
                          ? "Easy"
                          : task.DifficultyId === 2
                          ? "Normal"
                          : task.DifficultyId === 3
                          ? "Hard"
                          : "Unknown"}
                      </td>
                      <td>{task.TaskDescription}</td>
                      <td>{task.TaskDuration}</td>
                      <td>{task.TaskPoints}</td>
                      <td>{task.Status}</td>
                      <td>
                        <span
                          role="img"
                          aria-label="edit"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleEditTask(task)}
                        >
                          ✏️
                        </span>
                        <span
                          role="img"
                          aria-label="deactivate"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleDeactivateTask(task.TaskId)}
                        >
                          ⏸️
                        </span>
                        <span
                          role="img"
                          aria-label="soft-delete"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(task.TaskId)}
                        >
                          🗑️
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No tasks available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Modal
            show={showEditModal}
            onHide={() => {
              setShowEditModal(false);
              clearFormFields();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Edit Task</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group controlId="formTaskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={handleTaskNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskDifficulty">
                  <Form.Label>Task Difficulty</Form.Label>
                  <Form.Control
                    as="select"
                    value={taskDifficulty}
                    onChange={handleTaskDifficultyChange}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Hard">Hard</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTaskDescription">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskDuration">
                  <Form.Label>Task Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task duration (hr)"
                    value={taskDuration}
                    onChange={handleTaskDurationChange}
                  />
                </Form.Group>

                <Form.Group controlId="formVerdiPoints">
                  <Form.Label>VerdiPoints (Rewards)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter VerdiPoints"
                    value={verdiPoints}
                    onChange={handleVerdiPointsChange}
                    readOnly
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ color: "white" }}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal
            show={showDeleteConfirm}
            onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteTaskConfirm}>
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tasks;
