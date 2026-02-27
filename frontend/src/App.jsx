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
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Form onStudentAdded={getStudents} />
    </div>
  )
}

export default App
