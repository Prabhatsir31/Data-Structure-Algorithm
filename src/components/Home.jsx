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
    </div>
  );
};

export default Home;
