// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Stack from './components/Stack';
import Queue from './components/Queue';
import LinkedList from './components/LinkedList';
import Tree from './components/Tree';
import Graph from './components/Graph';
import Searching from './components/Searching';
import Sorting from './components/Sorting';
import Home from './components/Home'; 

const App = () => {
  const [selected, setSelected] = useState(null);

  const renderComponent = () => {
    switch (selected) {
      case 'stack':
        return <Stack />;
      case 'queue-simple':
      case 'queue-circular':
      case 'queue-priority':
        return <Queue type={selected} />;
      case 'linkedList-singly':
      case 'linkedList-circular':
      case 'linkedList-doubly':
      case 'linkedList-doublyCircular':
        return <LinkedList type={selected} />;
      case 'tree-bst':
        return <Tree type={selected} />;
      case 'graph-dijkstra':
      case 'graph-primKruskal':
      case 'graph-bellmanFord':
      case 'graph-floydWarshall':
      case 'graph-topologicalSort':
      case 'graph-unionFind':
        return <Graph type={selected} />;
      case 'Sequential Search':
      case 'Binary Search':
        return <Searching type={selected} onBack={handleBack} />;
      case 'Insertion Sort':
      case 'Selection Sort':
      case 'Bubble Sort':
      case 'Heap Sort':
      case 'Merge Sort':
      case 'Quick Sort':
      case 'Radix Sort':
      case 'Bucket Sort':
      case 'Counting Sort':
        return <Sorting type={selected} onBack={handleBack} />;
      default:
        return 
        <div >
          Please select a data structure to view operations.
          <Home />
          Please select a data structure to view operations.
        </div>;
    }
  };

  const handleBack = () => {
    setSelected(null); // Reset selection to go back to the main menu
  };

  return (
    <div>
      <Navbar selected={selected} onSelect={setSelected} onBack={handleBack} />
      <main style={{ maxWidth: '900px', margin: '24px auto', padding: '0 16px' }}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default App;
