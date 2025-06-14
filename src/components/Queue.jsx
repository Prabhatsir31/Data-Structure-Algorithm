// Queue.jsx
import React, { useState } from 'react';
import '../index.css'; 

// Main Queue component with subtype selection
const Queue = ({ onBack }) => {
  const [queueType, setQueueType] = useState(null);

  if (!queueType) {
    return (
      <div className="queue-container">
        <h2 className="queue-title">Queue Types</h2>
        <div className="btn-container">
          <button className="btn" onClick={() => setQueueType('simple')}>Simple Queue</button>
          <button className="btn" onClick={() => setQueueType('circular')}>Circular Queue</button>
          <button className="btn" onClick={() => setQueueType('priority')}>Priority Queue</button>
          <button className="btn btn-back" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {queueType === 'simple' && <SimpleQueue onBack={() => setQueueType(null)} />}
      {queueType === 'circular' && <CircularQueueComponent onBack={() => setQueueType(null)} />}
      {queueType === 'priority' && <PriorityQueueComponent onBack={() => setQueueType(null)} />}
    </div>
  );
};

// Simple Queue component
const SimpleQueue = ({ onBack }) => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [peekValue, setPeekValue] = useState(null);
  const [message, setMessage] = useState('');

  const enqueue = () => {
    if (inputValue === '') return;
    setQueue([...queue, Number(inputValue)]);
    setInputValue('');
    setPeekValue(null);
    setMessage('Element enqueued successfully!');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    setQueue(queue.slice(1));
    setPeekValue(null);
    setMessage('Element dequeued successfully!');
  };

  const peek = () => (queue.length === 0 ? null : queue[0]);

  const handlePeek = () => {
    const value = peek();
    setPeekValue(value);
    setMessage(value !== null ? `Front Element (Peek): ${value}` : 'Queue is empty!');
  };

  return (
    <div className="queue-container">
      <h3 className="queue-title">Simple Queue</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="input"
        />
        <button onClick={enqueue} className="btn btn-small">Enqueue</button>
        <button onClick={dequeue} className="btn btn-small">Dequeue</button>
        <button onClick={handlePeek} className="btn btn-small">Peek</button>
        <button onClick={onBack} className="btn btn-back">Back</button>
      </div>
      <div className="queue-elements">
        <strong>Queue Elements:</strong> {queue.length === 0 ? 'Empty' : queue.join(', ')}
      </div>
      {peekValue !== null && (
        <div className="output-text">Front Element (Peek): {peekValue}</div>
      )}
      {message && (
        <div className="output-text">{message}</div>
      )}
      <div className="queue-diagram">
        <h4>Queue Diagram:</h4>
        {queue.length === 0 ? (
          <div>No elements in queue</div>
        ) : (
          <div className="queue-diagram-visual-horizontal">
            {queue.map((element, index) => (
              <div key={index} className="queue-element">
                {element}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Circular Queue logic class
class CircularQueueClass {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }

  isFull = () => this.size === this.capacity;
  isEmpty = () => this.size === 0;

  enqueue = (element) => {
    if (this.isFull()) return false;
    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = element;
    this.size++;
    return true;
  };

  dequeue = () => {
    if (this.isEmpty()) return null;
    const elem = this.queue[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return elem;
  };

  peek = () => (this.isEmpty() ? null : this.queue[this.front]);

  getElements = () => {
    if (this.isEmpty()) return [];
    const elements = [];
    let count = 0;
    let idx = this.front;
    while (count < this.size) {
      elements.push(this.queue[idx]);
      idx = (idx + 1) % this.capacity;
      count++;
    }
    return elements;
  };
}

// Circular Queue React component
const CircularQueueComponent = ({ onBack }) => {
  const [capacity, setCapacity] = useState('');
  const [circularQueue, setCircularQueue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [queueElements, setQueueElements] = useState([]);
  const [peekValue, setPeekValue] = useState(null);
  const [message, setMessage] = useState('');

  const initializeQueue = () => {
    const cap = Number(capacity);
    if (cap > 0) {
      const cq = new CircularQueueClass(cap);
      setCircularQueue(cq);
      setQueueElements(cq.getElements());
      setInputValue('');
      setPeekValue(null);
      setMessage('Circular Queue created successfully!');
    } else {
      setMessage('Enter a valid positive capacity');
    }
  };

  const enqueueElement = () => {
    if (inputValue === '') return;
    if (circularQueue.isFull()) {
      setMessage('Queue is full!');
      return;
    }
    circularQueue.enqueue(Number(inputValue));
    setQueueElements(circularQueue.getElements());
    setInputValue('');
    setPeekValue(null);
    setMessage('Element enqueued successfully!');
  };

  const dequeueElement = () => {
    if (circularQueue.isEmpty()) {
      setMessage('Queue is empty!');
      return;
    }
    circularQueue.dequeue();
    setQueueElements(circularQueue.getElements());
    setPeekValue(null);
    setMessage('Element dequeued successfully!');
  };

  const handlePeek = () => {
    const value = circularQueue.peek();
    setPeekValue(value);
    setMessage(value !== null ? `Front Element (Peek): ${value}` : 'Queue is empty!');
  };

  if (!circularQueue) {
    return (
      <div className="queue-container">
        <h3 className="queue-title">Circular Queue</h3>
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          placeholder="Enter capacity"
          className="input" 
        />
        <br/><br/>
        <button onClick={initializeQueue} className="btn">Create Circular Queue</button>&nbsp;
        <button onClick={onBack} className="btn btn-back">Back</button>
      </div>
    );
  }

  return (
    <div className="queue-container">
      <h3 className="queue-title">Circular Queue (Capacity: {circularQueue.capacity})</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="input"
        />
        <button onClick={enqueueElement} className="btn btn-small">Enqueue</button>
        <button onClick={dequeueElement} className="btn btn-small">Dequeue</button>
        <button onClick={handlePeek} className="btn btn-small">Peek</button>
        <button onClick={onBack} className="btn btn-back">Back</button>
      </div>
      <div className="queue-elements">
        <strong>Queue Elements:</strong> {queueElements.length === 0 ? 'Empty' : queueElements.join(', ')}
      </div>
      {peekValue !== null && (
        <div className="output-text">Front Element (Peek): {peekValue}</div>
      )}
      {message && (
        <div className="output-text">{message}</div>
      )}
      <div className="queue-diagram">
        <h4>Queue Diagram:</h4>
        {queueElements.length === 0 ? (
          <div>No elements in queue</div>
        ) : (
          <div className="queue-diagram-visual-horizontal">
            {queueElements.map((element, index) => (
              <div key={index} className="queue-element">
                {element}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Priority Queue component
const PriorityQueueComponent = ({ onBack }) => {
  const [pq, setPQ] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [peekValue, setPeekValue] = useState(null);
  const [message, setMessage] = useState('');

  const enqueue = () => {
    if (inputValue === '') return;
    const newItem = Number(inputValue);
    const newPQ = [...pq, newItem].sort((a, b) => a - b);
    setPQ(newPQ);
    setInputValue('');
    setPeekValue(null);
    setMessage('Element enqueued successfully!');
  };

  const dequeue = () => {
    if (pq.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    setPQ(pq.slice(1));
    setPeekValue(null);
    setMessage('Element dequeued successfully!');
  };

  const handlePeek = () => {
    const value = peek();
    setPeekValue(value);
    setMessage(value !== null ? `Front Element (Peek): ${value}` : 'Queue is empty!');
  };

  const peek = () => (pq.length === 0 ? null : pq[0]);

  return (
    <div className="queue-container">
      <h3 className="queue-title">Priority Queue</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="input"
        />
        <button onClick={enqueue} className="btn btn-small">Enqueue</button>
        <button onClick={dequeue} className="btn btn-small">Dequeue</button>
        <button onClick={handlePeek} className="btn btn-small">Peek</button>
        <button onClick={onBack} className="btn btn-back">Back</button>
      </div>
      <div className="queue-elements">
        <strong>Queue Elements:</strong> {pq.length === 0 ? 'Empty' : pq.join(', ')}
      </div>
      {peekValue !== null && (
        <div className="output-text">Front Element (Peek): {peekValue}</div>
      )}
      {message && (
        <div className="output-text">{message}</div>
      )}
      <div className="queue-diagram">
        <h4>Queue Diagram:</h4>
        {pq.length === 0 ? (
          <div>No elements in queue</div>
        ) : (
          <div className="queue-diagram-visual-horizontal">
            {pq.map((element, index) => (
              <div key={index} className="queue-element">
                {element}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Queue;
