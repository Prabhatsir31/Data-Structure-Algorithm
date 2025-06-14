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
    // Update traversal results here accordingly (not included for brevity)
    console.log(`Inserting ${number}`);
  };

  return (
    <div className="home">
        Hello World
    </div>
  );
};

export default Home;
