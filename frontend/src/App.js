import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './helper/ProtectedRoute';
import Login from './Pages/AdminLogin';
import Register from './Pages/AdminRegistration';
import Dashboard from './Pages/Dashboard';
import Task from './Pages/Tasks';
import Events from './Pages/Event';
import Rewards from './Pages/Rewards';
import Users from './Pages/Users';
import Coordinators from './Pages/Coordinators';
import Organization from './Pages/Organization';
import Subscriber from './Pages/Subscriber';
import StatisticalReport from './Pages/StatisticalReport';
import EventReports from './Pages/EventReport';
import Participants from './Pages/Participants';
import TaskReport from './Pages/TaskReport'; // Import the TaskReport component
import TaskParticipants from './Pages/TaskParticipants'; // Import the TaskParticipants component (you'll need to create this component)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="tasks" element={<ProtectedRoute><Task /></ProtectedRoute>} />
                    <Route path="event" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                    <Route path="EventReport" element={<ProtectedRoute><EventReports /></ProtectedRoute>} />
                    <Route path="Rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                    <Route path="TaskReport" element={<ProtectedRoute><TaskReport /></ProtectedRoute>} /> {/* Add this route */}
                    <Route path="task-participants/:taskId" element={<ProtectedRoute><TaskParticipants /></ProtectedRoute>} /> {/* Add this route */}
                    <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path="coordinator" element={<ProtectedRoute><Coordinators /></ProtectedRoute>} />
                    <Route path="organization" element={<ProtectedRoute><Organization /></ProtectedRoute>} />
                    <Route path="subscriber" element={<ProtectedRoute><Subscriber /></ProtectedRoute>} />
                    <Route path="statisticalReports" element={<ProtectedRoute><StatisticalReport /></ProtectedRoute>} />
                    <Route path="participants/:eventId" element={<ProtectedRoute><Participants /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
