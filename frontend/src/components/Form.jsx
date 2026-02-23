import React from 'react'

function Form() {
  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;

    const response = await fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age }),
    });

    const data = await response.json();
    console.log(data);
  }
  
    return (
    <div>
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" />
            <input type="number" name="age" placeholder="Age" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form