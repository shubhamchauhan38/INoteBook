import React, { useState } from 'react';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Note:', note);
    setEmail('');
    setPassword('');
    setNote('');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add a Note</h1>
      
      <form onSubmit={handleSubmit} className="shadow p-4 rounded border">
        
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="note" className="form-label">Note:</label>
          <input
            type="text"
            id="note"
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">Add Note</button>
      </form>

      <h2 className="mt-5">Your Notes</h2>
      {/* Render your notes here */}
    </div>
  );
};

export default Home;
