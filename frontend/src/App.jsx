import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form';

function App() {
  const [studentsData, setStudentsData] = useState([]);

  async function getStudents() {
    const data = await fetch('http://localhost:3000/students');
    const students = await data.json();
    setStudentsData(students);
  }

  async function deleteStudent(id) {
    await fetch(`http://localhost:3000/students/${id}`, {
      method: 'DELETE',
    });
    getStudents();
  }

  useEffect(() => {
    getStudents();
  }, [])

  return (
    <div className="app-container">
      <h1 className="title">Students Directory</h1>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Form onStudentAdded={getStudents} />
    </div>
  )
}

export default App
