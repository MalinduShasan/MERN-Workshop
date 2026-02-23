const express = require('express');
const app = express();
const PORT = 3000;  
const cors = require('cors');

//middleware
app.use(express.json());

//impliment cors
app.use(cors());

const students = [
    {
      id: 0,
      name: "John Doe",
      age: 20
        
    }, {
      id: 1,
      name: "Jane Smith",
      age: 22
    }
  ]
app.get('/students', (req, res) => {
    res.json(students);
})

app.post('/students', (req, res) => {
  const { name, age } = req.body;
  const newStudent = { id: students.length, name, age };
  students.push(newStudent);
  res.json({ message: 'Student added successfully', student: newStudent });
  console.log(students);
});

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  students[id] = { name, age };
  res.json({ message: 'Student updated successfully' });
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  students.splice(id, 1);
  res.json({ message: 'Student deleted successfully' });
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
