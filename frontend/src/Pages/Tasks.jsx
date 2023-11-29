import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Header from './Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.scss';


const TASK_DIFFICULTY_MAP = {
    "Easy": "1",
    "Normal": "2",
    "Hard": "3"
};

const Tasks = () => {
    const [editTask, setEditTask] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDifficulty, setTaskDifficulty] = useState('Easy');
    const [taskDescription, setTaskDescription] = useState('');
    const [verdiPoints, setVerdiPoints] = useState('');
    const [tasks, setTasks] = useState([]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  
    const [taskToDelete, setTaskToDelete] = useState(null);  

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleTaskNameChange = (event) => setTaskName(event.target.value);
    const handleTaskDifficultyChange = (event) => setTaskDifficulty(event.target.value);
    const handleTaskDescriptionChange = (event) => setTaskDescription(event.target.value);
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
            const response = await fetch(`http://localhost:3001/admin/task/${taskId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const newTasks = tasks.filter(task => task.TaskId !== taskId);
                setTasks(newTasks);
                
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // Handlers for Edit Modal
    const handleEditTask = (task) => {
        setEditTask(task);
        setTaskName(task.TaskName);
        setTaskDifficulty(
            task.DifficultyId === 1 ? "Easy" :
                task.DifficultyId === 2 ? "Normal" :
                    task.DifficultyId === 3 ? "Hard" : "Unknown"
        );
        setTaskDescription(task.TaskDescription);
        setVerdiPoints(task.TaskPoints);
        setShowEditModal(true);
    };

    // TODO: Implement the handleEditSubmit function
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            taskName,
            taskDescription,
            taskPoints: verdiPoints,
            taskDifficulty: TASK_DIFFICULTY_MAP[taskDifficulty]
        };

        try {
            const response = await fetch(`http://localhost:3001/admin/task/${editTask.TaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowEditModal(false);
                toast.success("Tasks updated successfully");
                fetchTasks();
            } else {
                toast.error("Failed to update tasks");

            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeactivateTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3001/admin/task/inactive/${taskId}`, {
                method: 'PUT'
            });
            if (response.ok) {
                const updatedTasks = tasks.map(task => {
                    if (task.TaskId === taskId) {
                        task.Status = "Inactive";
                    }
                    return task;
                });
                setTasks(updatedTasks);
            } else {
                toast.error("Failed to update tasks");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            taskName,
            taskDescription,
            taskPoints: verdiPoints,
            taskDifficulty: TASK_DIFFICULTY_MAP[taskDifficulty]
        };

        try {
            const response = await fetch('http://localhost:3001/admin/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                handleCloseModal();
                fetchTasks();
                toast.success("Tasks successfully added!");
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='div3'>
                <div className='div3'>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><h1>Daily Task</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter task name" value={taskName} onChange={handleTaskNameChange} />
                                </Form.Group>

                                <Form.Group controlId="formTaskDifficulty">
                                    <Form.Label>Task Difficulty</Form.Label>
                                    <Form.Control as="select" value={taskDifficulty} onChange={handleTaskDifficultyChange}>
                                        <option value="Easy">Easy</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Hard">Hard</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formTaskDescription">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter task description" value={taskDescription} onChange={handleTaskDescriptionChange} />
                                </Form.Group>

                                <Form.Group controlId="formVerdiPoints">
                                    <Form.Label>VerdiPoints (Rewards)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter VerdiPoints" value={verdiPoints} onChange={handleVerdiPointsChange} />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>

                <div className="table-task-container">
                    <div className="table-task-responsive">
                        <Button variant="primary" onClick={handleShowModal} className="add-task-btn">ADD TASK</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task Name</th>
                                    <th>Task Difficulty</th>
                                    <th>Task Description</th>
                                    <th>VerdiPoints</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={task.TaskId}>
                                        <td>{index + 1}</td>
                                        <td>{task.TaskName}</td>
                                        <td>
                                            {task.DifficultyId === 1 ? "Easy" :
                                                task.DifficultyId === 2 ? "Normal" :
                                                    task.DifficultyId === 3 ? "Hard" : "Unknown"}
                                        </td>
                                        <td>{task.TaskDescription}</td>
                                        <td>{task.TaskPoints}</td>
                                        <td>{task.Status}</td>
                                        <td>
                                        <span
                                            role="img"
                                            aria-label="edit"
                                            style={{ cursor: 'pointer', marginRight: '10px' }}
                                            onClick={() => handleEditTask(task)}>  
                                            ✏️
                                        </span>
                                        <span
                                            role="img"
                                            aria-label="deactivate"
                                            style={{ cursor: 'pointer', marginRight: '10px' }}
                                            onClick={() => handleDeactivateTask(task.TaskId)}>
                                            ⏸️
                                        </span>
                                        <span
                                            role="img"
                                            aria-label="soft-delete"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDeleteClick(task.TaskId)}>
                                            🗑️
                                        </span>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title><h1>Edit Task</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEditSubmit}>
                                <Form.Group controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter task name" value={taskName} onChange={handleTaskNameChange} />
                                </Form.Group>

                                <Form.Group controlId="formTaskDifficulty">
                                    <Form.Label>Task Difficulty</Form.Label>
                                    <Form.Control as="select" value={taskDifficulty} onChange={handleTaskDifficultyChange}>
                                        <option value="Easy">Easy</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Hard">Hard</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formTaskDescription">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter task description" value={taskDescription} onChange={handleTaskDescriptionChange} />
                                </Form.Group>

                                <Form.Group controlId="formVerdiPoints">
                                    <Form.Label>VerdiPoints (Rewards)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter VerdiPoints" value={verdiPoints} onChange={handleVerdiPointsChange} />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Insert the delete confirmation modal here */}
                    <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this task?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
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
    );
};

export default Tasks;