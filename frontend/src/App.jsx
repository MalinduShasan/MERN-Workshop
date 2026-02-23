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
      <div className="students-grid">
        {studentsData.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-header">
              <h2 className="student-name">{student.name}</h2>
            </div>
            <div className="student-body">
              <p><span className="label">Age:</span> <span className="value">{student.age}</span></p>
            </div>
          </div>
        ))}
      </div>
      <Form />
    </div>
    
  )
}

export default App
