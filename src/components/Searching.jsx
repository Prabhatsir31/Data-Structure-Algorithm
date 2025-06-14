// Searching.jsx
import React, { useState } from 'react';
import '../index.css';

const Searching = ({ type, onBack }) => {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState([]);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(num => Number(num.trim()));
    setArray(value);
  };

  const sequentialSearch = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Return the index of the found element
      }
    }
    return -1; // Not found
  };

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return mid; // Return the index of the found element
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1; // Not found
  };

  const handleSearch = () => {
    const target = Number(inputValue);
    let index;

    if (type === 'Sequential Search') {
      index = sequentialSearch(array, target);
    } else if (type === 'Binary Search') {
      // Ensure the array is sorted for binary search
      const sortedArray = [...array].sort((a, b) => a - b);
      index = binarySearch(sortedArray, target);
    }

    setResult(index !== -1 ? `Element found at index: ${index}` : 'Element not found');
  };

  return (
    <div className="searching-container">
      <h3>{type}</h3>
      <div>
        <label>
          Enter numbers (comma-separated):
          <input type="text" value={array.join(', ')} onChange={handleArrayChange} />
        </label>
      </div>
      <div>
        <label>
          Enter value to search:<br />      
          <input type="number" value={inputValue} onChange={handleInputChange} />
        </label>
        <br /><br />
      </div>
      <button className="btn" onClick={handleSearch}>Search</button>
      <button className="btn btn-back" onClick={onBack}>Back</button>
      {result && <div className="output-text">{result}</div>}<br />
    </div>
  );
};

export default Searching;
