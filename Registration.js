import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    const location = useLocation();
    const { userToEdit } = location.state || {};
    const [name, setName] = useState(userToEdit ? userToEdit.name : '');
    const [email, setEmail] = useState(userToEdit ? userToEdit.email : '');
    const [mobile, setMobile] = useState(userToEdit ? userToEdit.mobile : '');
    const [password, setPassword] = useState(userToEdit ? userToEdit.password : '');
    const [designation, setDesignation] = useState(userToEdit ? userToEdit.designation : '');
    const [gender, setGender] = useState(userToEdit ? userToEdit.gender : '');
    const [course, setCourse] = useState(userToEdit ? userToEdit.course : '');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('password', password);
            formData.append('designation', designation);
            formData.append('gender', gender);
            formData.append('course', course);
            formData.append('image', image);

            let url = 'http://localhost:5000/api/register';
            if (userToEdit) {
                url = `http://localhost:5000/api/users/${userToEdit.id}`;
                formData.append('userId', userToEdit.id);
            }

            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Mobile:
                    <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Designation:
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                </label>
                <label>
                    Gender:
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label>
                    Course:
                    <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
                </label>
                <label>
                    Upload Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <button type="submit">{userToEdit ? 'Update' : 'Register'}</button>
            </form>
        </div>
    );
};

export default Registration;
