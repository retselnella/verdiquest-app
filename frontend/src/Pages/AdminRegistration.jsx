import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  logo from '../Images/logo.png'
const AdminRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null); 
    
        try {
            const response = await fetch('http://localhost:3001/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Username already exists, please try another valid username.');
                } else {
                    throw new Error(data.message || 'Something went wrong!');
                }
            }
    
            setSuccess('Admin successfully registered! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
    
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="d-flex align-items-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="border p-4 rounded" style={{backgroundColor:'white',}} onSubmit={handleSubmit}>
                            <h2 className="mb-3 text-center">Admin Registration</h2>
                            {error && <p className="text-danger text-center">{error}</p>}
                            {success && <p className="text-success text-center">{success}</p>}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{color:'white'}} disabled={isSubmitting}>
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                            <p className="mt-3 text-center">
                                Already have an account? <Link to="/">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <img src={logo} alt="Logo" style={{ 
                    position: 'absolute', 
                    right: '10px', 
                    bottom: '10px', 
                    width: '100px', // Adjust size as needed
                    height: 'auto' 
                }} />
        </main>
    );
};

export default AdminRegistration;
