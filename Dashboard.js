import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (userId) => {
        // Navigate to Registration component with user ID as a parameter
        window.location.href = `/registration/${userId}`;
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            fetchUsers(); // Refresh users after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><img src={user.image} alt="User" /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.designation}</td>
                            <td>{user.gender}</td>
                            <td>{user.course}</td>
                            <td>{user.createDate}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
