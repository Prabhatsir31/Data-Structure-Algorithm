import React, { useState } from 'react';
import '../index.css'; // Create a corresponding CSS file for styling

const Home = () => {
  const [number, setNumber] = useState('');
  const [traversalResults, setTraversalResults] = useState({
    inorder: 'Empty',
    preorder: 'Empty',
    postorder: 'Empty',
  });

  const handleInsert = () => {
    // Logic for inserting the number into the binary search tree
    // Update traversal results here accordingly

    if (!isNaN(number) && number.trim() !== '') {
      console.log(`Inserting ${number}`);
      // Update traversalResults based on insertion
      // For example:
      // setTraversalResults({ inorder: '25, 40, 45', preorder: '50, 25, 40', postorder: '40, 25, 50' });
    } else {
      alert('Please enter a valid number.');
    }

    setNumber(''); // Reset input field
  };

  return (
    <div className="home">
      <h1>Binary Search Tree Visualization</h1>
      <input 
        type="text" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
        placeholder="Enter a number" 
      />
      <button onClick={handleInsert}>Insert</button>

      <h3>Results:</h3>
      <div>
        <p>Inorder Traversal: {traversalResults.inorder}</p>
        <p>Preorder Traversal: {traversalResults.preorder}</p>
        <p>Postorder Traversal: {traversalResults.postorder}</p>
      </div>

      <h3>Binary Search Tree Diagram:</h3>
      {/* You would implement a graphic representation of the tree here */}
      <div className="tree-diagram">
        {/* Visualization code goes here */}
      </div>
    </div>
  );
};

export default Home;
