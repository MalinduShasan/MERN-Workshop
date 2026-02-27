import React, { useState } from 'react'
import './Form.css'

function Form({ onStudentAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !age) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), age: Number(age) }),
      });

      const data = await response.json();
      setMessage(`Student "${data.student.name}" added successfully!`);
      setName('');
      setAge('');
      if (onStudentAdded) onStudentAdded();
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            min="1"
            max="120"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  )
}

export default Form