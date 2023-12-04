import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Header from './Header.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.scss';

const Rewards = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productSize, setProductSize] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [pointsRequired, setPointsRequired] = useState('');
    const [rewards, setRewards] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleShowModal = () => setShowProductModal(true);
    const handleCloseModal = () => setShowProductModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleEditReward = (reward) => {
        setProductId(reward.ProductId);
        setProductName(reward.ProductName);
        setProductDescription(reward.ProductDescription);
        setProductSize(reward.ProductSize);
        setProductQuantity(reward.ProductQuantity);
        setPointsRequired(reward.PointsRequired);
        setShowEditModal(true);
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/admin/rewards/${productId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    productDescription,
                    productSize,
                    productQuantity,
                    pointsRequired
                })
            });

            if (response.status === 200) { 
                const data = await response.json();
                toast.success(data.message);
                fetchRewardsData();
                handleCloseEditModal(); 
            } else {
                console.error("Failed to edit product.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleShowDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDeleteReward = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3001/admin/rewards/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                const updatedRewards = rewards.filter(reward => reward.ProductId !== productId);
                setRewards(updatedRewards);
                setShowDeleteModal(false);
                toast.success("Rewards successfully deleted!");
            } else {
                console.error("Failed to delete product:", data.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const fetchRewardsData = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/reward'); 
            const data = await response.json();
            setRewards(data);
        } catch (error) {
            console.error('Failed to fetch rewards:', error);
        }
    };

    useEffect(() => {
        fetchRewardsData();
    }, []); 

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/admin/rewards', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    productName,
                    productDescription,
                    productSize,
                    productQuantity,
                    pointsRequired
                })
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log(data.message);  
                handleCloseModal(); 
                fetchRewardsData();
                toast.success("Reward successfully added!");
            } else {
                console.error("Failed to add product.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
    const handleProductSizeChange = (e) => setProductSize(e.target.value);
    const handleProductQuantityChange = (e) => setProductQuantity(e.target.value);
    const handlePointsRequiredChange = (e) => setPointsRequired(e.target.value);

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='div3'>
                <div className='div3'>
                    <Modal show={showProductModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><h1>Product Details</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleProductSubmit}>
                                <Form.Group controlId="formProductName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" value={productName} onChange={handleProductNameChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductDescription">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter product description" value={productDescription} onChange={handleProductDescriptionChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductSize">
                                    <Form.Label>Product Size</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product size" value={productSize} onChange={handleProductSizeChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductQuantity">
                                    <Form.Label>Product Quantity</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Quantity" value={productQuantity} onChange={handleProductQuantityChange} />
                                </Form.Group>
                                <Form.Group controlId="formPointsRequired">
                                    <Form.Label>Points Required</Form.Label>
                                    <Form.Control type="number" placeholder="Enter points required" value={pointsRequired} onChange={handlePointsRequiredChange} />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit" style={{ color:"white" }}>Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>

                <div className="table-reward-container">
                    <div className="table-reward-responsive">
                        <Button variant="primary" onClick={handleShowModal} className="add-reward-btn">ADD REWARDS</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Description</th>
                                    <th>Product Size</th>
                                    <th>Product Quantity</th>
                                    <th>Points Required</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewards.map((reward, index) => (
                                    <tr key={reward.ProductId}>
                                        <td>{index + 1}</td>
                                        <td>{reward.ProductName}</td>
                                        <td>{reward.ProductDescription}</td>
                                        <td>{reward.ProductSize}</td>
                                        <td>{reward.ProductQuantity}</td>
                                        <td>{reward.PointsRequired}</td>
                                        <td>
                                            <span
                                                role="img"
                                                aria-label="edit"
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                                onClick={() => handleEditReward(reward)}>
                                                ✏️
                                            </span>
                                            <span
                                                role="img"
                                                aria-label="delete"
                                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                                                onClick={() => handleShowDeleteModal(reward)}>
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
                            <Modal.Title><h1>Edit Product</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEditSubmit}>
                                <Form.Group controlId="formProductName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" value={productName} onChange={handleProductNameChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductDescription">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter product description" value={productDescription} onChange={handleProductDescriptionChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductSize">
                                    <Form.Label>Product Size</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product size" value={productSize} onChange={handleProductSizeChange} />
                                </Form.Group>
                                <Form.Group controlId="formProductQuantity">
                                    <Form.Label>Product Quantity</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Quantity" value={productQuantity} onChange={handleProductQuantityChange} />
                                </Form.Group>
                                <Form.Group controlId="formPointsRequired">
                                    <Form.Label>Points Required</Form.Label>
                                    <Form.Control type="number" placeholder="Enter points required" value={pointsRequired} onChange={handlePointsRequiredChange} />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit" style={{ color:"white" }}>Update</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this product?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteReward(productToDelete.ProductId)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
