// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors());

// Counter to generate unique IDs
let userIdCounter = 1;

// Endpoint to handle user registration
app.post('/api/register', (req, res) => {
    // Extract form data fields
    const { name, email, mobile, password, designation, gender, course } = req.body;

    // Check if the image is provided
    const image = req.files ? req.files.image : null;

    // Generate unique ID for the new user
    const userId = userIdCounter++;

    // Create a new user object with ID
    const newUser = { id: userId, name, email, mobile, password, designation, gender, course };

    // Assuming you're storing users in a JSON file
    const users = getUsers();

    // Check if the email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Add the new user to the array
    users.push(newUser);
    saveUsers(users);

    res.json({ success: true, message: 'User registered successfully', userId });
});

// Helper function to read users from file
function getUsers() {
    const filePath = path.join(__dirname, 'users.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return [];
}

// Helper function to save users to file
function saveUsers(users) {
    const filePath = path.join(__dirname, 'users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
app.get('/api/users', (req, res) => {
    // Assuming you're storing users in a JSON file
    const users = getUsers();
    res.json(users);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
