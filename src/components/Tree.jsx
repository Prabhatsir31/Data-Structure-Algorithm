import React, { useState } from 'react';
import '../index.css'; 

const BinarySearchTree = ({ onBack }) => {
  const [root, setRoot] = useState(null);
  const [input, setInput] = useState('');
  const [inorderResult, setInorderResult] = useState([]);
  const [preorderResult, setPreorderResult] = useState([]);
  const [postorderResult, setPostorderResult] = useState([]);

  class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  const insertNode = (node, data) => {
    if (!node) {
      return new Node(data);
    }
    if (data < node.data) {
      node.left = insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = insertNode(node.right, data);
    }
    return node;
  };

  const handleInsert = () => {
    if (input === '') return;
    const val = Number(input);
    const newRoot = insertNode(root, val);
    setRoot(newRoot);
    setInput('');
    setInorderResult([]);
    setPreorderResult([]);
    setPostorderResult([]);
  };

  const inorderTraversal = (node, result = []) => {
    if (node) {
      inorderTraversal(node.left, result);
      result.push(node.data);
      inorderTraversal(node.right, result);
    }
    return result;
  };

  const preorderTraversal = (node, result = []) => {
    if (node) {
      result.push(node.data);
      preorderTraversal(node.left, result);
      preorderTraversal(node.right, result);
    }
    return result;
  };

  const postorderTraversal = (node, result = []) => {
    if (node) {
      postorderTraversal(node.left, result);
      postorderTraversal(node.right, result);
      result.push(node.data);
    }
    return result;
  };

  const renderTree = (node, depth = 0) => {
    if (!node) return null;
    return (
      <div className="tree-node" style={{ paddingLeft: depth * 20 }}>
        <div className="node-value">{node.data}</div>
        <div className="children">
          <div className="left-child">
            {renderTree(node.left, depth + 1)}
          </div>
          <div className="right-child">
            {renderTree(node.right, depth + 1)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h3>Binary Search Tree</h3>
      <input
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="input-style"
        placeholder="Enter a number"
      /><br /><br />
      <button className="btn" onClick={handleInsert}>Insert</button>

      <div style={{ marginTop: 12 }}>
        <button
          className="btn"
          onClick={() => setInorderResult(inorderTraversal(root))}
        >
          Inorder Traversal
        </button>
        <button 
          className="btn" 
          onClick={() => setPreorderResult(preorderTraversal(root))}
          style={{ marginLeft: 8 }}
        >
          Preorder Traversal
        </button>
        <button
          className="btn"
          onClick={() => setPostorderResult(postorderTraversal(root))}
          style={{ marginLeft: 8 }}
        >
          Postorder Traversal
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>
          <strong>Inorder:</strong> {inorderResult.length ? inorderResult.join(' → ') : 'Empty'}
        </div>
        <div>
          <strong>Preorder:</strong> {preorderResult.length ? preorderResult.join(' → ') : 'Empty'}
        </div>
        <div>
          <strong>Postorder:</strong> {postorderResult.length ? postorderResult.join(' → ') : 'Empty'}
        </div>
      </div>

      <div className="tree-diagram">
        <h4>Binary Search Tree Diagram:</h4>
        {renderTree(root) || <div>No elements in tree</div>}
      </div>

      <button className="btn-back" onClick={onBack} style={{ marginTop: 16 }}>Back</button>
    </div>
  );
};

export default BinarySearchTree;
