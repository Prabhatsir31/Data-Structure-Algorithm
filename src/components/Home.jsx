// Home.jsx
import React, { useState } from 'react';
import './Home.css'; // Create a corresponding CSS file for styling

const Home = () => {
  const [number, setNumber] = useState('');
  const [traversalResults, setTraversalResults] = useState({
    inorder: 'Empty',
    preorder: 'Empty',
    postorder: 'Empty',
  });

  const handleInsert = () => {
    // Logic for inserting the number into the binary search tree
    // Update traversal results here accordingly (not included for brevity)
    console.log(`Inserting ${number}`);
  };

  return (
    <div className="home">
      <h1>Binary Search Tree</h1>
      <input 
        type="number" 
        placeholder="Enter a number" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
        className="number-input"
      />
      <button onClick={handleInsert} className="insert-button">
        Insert
      </button>
      <div className="traversal-buttons">
        <button className="traversal-button">Inorder Traversal</button>
        <button className="traversal-button">Preorder Traversal</button>
        <button className="traversal-button">Postorder Traversal</button>
      </div>
      <div className="traversal-results">
        <p>Inorder: {traversalResults.inorder}</p>
        <p>Preorder: {traversalResults.preorder}</p>
        <p>Postorder: {traversalResults.postorder}</p>
      </div>
      <button className="back-button">Back</button>
    </div>
  );
};

export default Home;
