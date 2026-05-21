const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    next();
});

// Student Data
let students = [
    { id: 1, name: "Arun", age: 20 },
    { id: 2, name: "Priya", age: 21 }
];

// GET API
app.get('/students', (req, res) => {
    res.json(students);
});

// POST API
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);

    res.json({
        message: "Student added successfully",
        students
    });
});

// PUT API
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.json({
        message: "Student updated successfully",
        students
    });
});

// DELETE API
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully",
        students
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});