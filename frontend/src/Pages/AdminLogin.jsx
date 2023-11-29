import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/custom.scss';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

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
    
        try {
            const response = await fetch('http://localhost:3001/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
    
            login(data.token); 
            navigate('/dashboard');
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
                        <form className="border p-4 rounded" onSubmit={handleSubmit}>
                            <h2 className="mb-3 text-center">Admin Login</h2>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{color:'white'}} disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                            <p className="mt-3 text-center">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;