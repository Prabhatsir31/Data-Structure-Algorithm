// Sorting.jsx
import React, { useState } from 'react';
import '../index.css';

const Sorting = ({ type, onBack }) => {
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(num => Number(num.trim()));
    setArray(value);
  };

  const bubbleSort = (arr) => {
    const sorted = [...arr];
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = 0; j < sorted.length - i - 1; j++) {
        if (sorted[j] > sorted[j + 1]) {
          [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        }
      }
    }
    return sorted;
  };

  const selectionSort = (arr) => {
    const sorted = [...arr];
    for (let i = 0; i < sorted.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sorted.length; j++) {
        if (sorted[j] < sorted[minIndex]) {
          minIndex = j;
        }
      }
      [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
    }
    return sorted;
  };

  const insertionSort = (arr) => {
    const sorted = [...arr];
    for (let i = 1; i < sorted.length; i++) {
      const key = sorted[i];
      let j = i - 1;
      while (j >= 0 && sorted[j] > key) {
        sorted[j + 1] = sorted[j];
        j--;
      }
      sorted[j + 1] = key;
    }
    return sorted;
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const heapSort = (arr) => {
    const sorted = [...arr];
    const n = sorted.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(sorted, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [sorted[0], sorted[i]] = [sorted[i], sorted[0]];
      heapify(sorted, i, 0);
    }
    return sorted;
  };

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  };

  const radixSort = (arr) => {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }
    return arr;
  };

  const countingSort = (arr, exp) => {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      count[Math.floor((arr[i] / exp) % 10)]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
      count[Math.floor((arr[i] / exp) % 10)]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }
  };

  const bucketSort = (arr) => {
    if (arr.length === 0) return arr;
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);
    const bucketCount = Math.floor(maxValue - minValue) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    arr.forEach(num => {
      buckets[num - minValue].push(num);
    });

    return buckets.reduce((acc, bucket) => {
      return acc.concat(bucket.sort((a, b) => a - b));
    }, []);
  };

  const handleSort = () => {
    let sorted;
    switch (type) {
      case 'Bubble Sort':
        sorted = bubbleSort(array);
        break;
      case 'Selection Sort':
        sorted = selectionSort(array);
        break;
      case 'Insertion Sort':
        sorted = insertionSort(array);
        break;
      case 'Merge Sort':
        sorted = mergeSort(array);
        break;
      case 'Quick Sort':
        sorted = quickSort(array);
        break;
      case 'Heap Sort':
        sorted = heapSort(array);
        break;
      case 'Radix Sort':
        sorted = radixSort(array);
        break;
      case 'Bucket Sort':
        sorted = bucketSort(array);
        break;
      default:
        sorted = [];
    }
    setSortedArray(sorted);
  };

  return (
    <div className="sorting-container">
      <h3>{type}</h3>
      <div>
        <label>
          Enter numbers (comma-separated):
          <input type="text" value={array.join(', ')} onChange={handleArrayChange} />
        </label>
      </div><br />
      <button className="btn" onClick={handleSort}>Sort</button>
      <button className="btn btn-back" onClick={onBack}>Back</button>
      {sortedArray.length > 0 && (
        <div className="output-text">Sorted Array: {sortedArray.join(', ')}</div>
      )} <br />
      {/* <button className="btn btn-back" onClick={onBack}>Back</button> */}
    </div>
  );
};

export default Sorting;
