// LinkedList.jsx
import React, { useState } from 'react';
import '../index.css'; 

const LinkedList = ({ onBack }) => {
  const [listType, setListType] = useState(null);

  if (!listType) {
    return (
      <div className="container con">
        <h2>Linked List Types</h2>
        <div className="input-container">
          <button className="btn" onClick={() => setListType('singly')}>Singly Linked List</button>
          <button className="btn" onClick={() => setListType('circular')}>Circular Linked List</button>
          <button className="btn" onClick={() => setListType('doubly')}>Doubly Linked List</button>
          <button className="btn" onClick={() => setListType('doublyCircular')}>Doubly Circular Linked List</button>
          <button className="btn-back" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {listType === 'singly' && <SinglyLinkedList onBack={() => setListType(null)} />}
      {listType === 'circular' && <CircularLinkedList onBack={() => setListType(null)} />}
      {listType === 'doubly' && <DoublyLinkedList onBack={() => setListType(null)} />}
      {listType === 'doublyCircular' && <DoublyCircularLinkedList onBack={() => setListType(null)} />}
    </div>
  );
};

// Singly Linked List implementation
const SinglyLinkedList = ({ onBack }) => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState('');

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  const insertAtBeginning = (data) => {
    const newNode = new Node(data);
    newNode.next = head;
    setHead(newNode);
  };

  const insertAtEnd = (data) => {
    const newNode = new Node(data);
    if (!head) {
      setHead(newNode);
      return;
    }
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  };

  const deleteFromBeginning = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    setHead(head.next);
  };

  const deleteFromEnd = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (!head.next) {
      setHead(null);
      return;
    }
    let current = head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
  };

  const displayList = () => {
    let elements = [];
    let current = head;
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    return elements.join(' → ');
  };

  return (
    <div>
      <h3>Singly Linked List</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-style"
        />
        <button className="btn" onClick={() => { if(input !== '') { insertAtBeginning(Number(input)); setInput(''); } }}>Insert at Beginning</button>
        <button className="btn" onClick={() => { if(input !== '') { insertAtEnd(Number(input)); setInput(''); } }}>Insert at End</button>
      </div>
      <div className="btn-container">
        <button className="btn-small" onClick={deleteFromBeginning}>Delete from Beginning</button>
        <button className="btn-small" onClick={deleteFromEnd}>Delete from End</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>List: </strong>{displayList() || 'Empty'}
      </div>
      <div className="linked-list-diagram">
        <h4>Linked List Diagram:</h4>
        {head ? (
          <div className="linked-list-visual">
            {displayList().split(' → ').map((element, index) => (
              <div key={index} className="linked-list-node">
                {element}
                {index < displayList().split(' → ').length - 1 && ' → '}
              </div>
            ))}
          </div>
        ) : (
          <div>No elements in list</div>
        )}
      </div>
    </div>
  );
};

// Circular Linked List implementation
const CircularLinkedList = ({ onBack }) => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState('');

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  const insertAtBeginning = (data) => {
    const newNode = new Node(data);
    if (!head) {
      newNode.next = newNode;
      setHead(newNode);
      return;
    }
    let tail = head;
    while (tail.next !== head) {
      tail = tail.next;
    }
    newNode.next = head;
    tail.next = newNode;
    setHead(newNode);
  };

  const insertAtEnd = (data) => {
    const newNode = new Node(data);
    if (!head) {
      newNode.next = newNode;
      setHead(newNode);
      return;
    }
    let tail = head;
    while (tail.next !== head) {
      tail = tail.next;
    }
    tail.next = newNode;
    newNode.next = head;
  };

  const deleteFromBeginning = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (head.next === head) {
      setHead(null);
      return;
    }
    let tail = head;
    while (tail.next !== head) {
      tail = tail.next;
    }
    const newHead = head.next;
    tail.next = newHead;
    setHead(newHead);
  };

  const deleteFromEnd = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (head.next === head) {
      setHead(null);
      return;
    }
    let tail = head;
    let prev = null;
    while (tail.next !== head) {
      prev = tail;
      tail = tail.next;
    }
    if (prev) {
      prev.next = head;
    }
  };

  const displayList = () => {
    if (!head) return '';
    let result = [];
    let current = head;
    do {
      result.push(current.data);
      current = current.next;
    } while (current !== head);
    return result.join(' → ');
  };

  return (
    <div>
      <h3>Circular Linked List</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-style"
        />
        <button className="btn" onClick={() => { if(input !== '') { insertAtBeginning(Number(input)); setInput(''); } }}>Insert at Beginning</button>
        <button className="btn" onClick={() => { if(input !== '') { insertAtEnd(Number(input)); setInput(''); } }}>Insert at End</button>
      </div>
      <div className="btn-container">
        <button className="btn-small" onClick={deleteFromBeginning}>Delete from Beginning</button>
        <button className="btn-small" onClick={deleteFromEnd}>Delete from End</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>List: </strong>{displayList() || 'Empty'}
      </div>
      <div className="linked-list-diagram">
        <h4>Linked List Diagram:</h4>
        {head ? (
          <div className="linked-list-visual">
            {displayList().split(' → ').map((element, index) => (
              <div key={index} className="linked-list-node">
                {element}
                {index < displayList().split(' → ').length - 1 && ' → '}
              </div>
            ))}
            {head && <span> (circular)</span>}
          </div>
        ) : (
          <div>No elements in list</div>
        )}
      </div>
    </div>
  );
};

// Doubly Linked List implementation
const DoublyLinkedList = ({ onBack }) => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState('');

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }

  const insertAtBeginning = (data) => {
    const newNode = new Node(data);
    if (!head) {
      setHead(newNode);
      return;
    }
    newNode.next = head;
    head.prev = newNode;
    setHead(newNode);
  };

  const insertAtEnd = (data) => {
    const newNode = new Node(data);
    if (!head) {
      setHead(newNode);
      return;
    }
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    newNode.prev = current;
  };

  const deleteFromBeginning = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (!head.next) {
      setHead(null);
      return;
    }
    const newHead = head.next;
    newHead.prev = null;
    setHead(newHead);
  };

  const deleteFromEnd = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (!head.next) {
      setHead(null);
      return;
    }
    let current = head;
    while (current.next) {
      current = current.next;
    }
    if (current.prev) {
      current.prev.next = null;
    }
  };

  const displayList = () => {
    let elements = [];
    let current = head;
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    return elements.join(' ↔ ');
  };

  return (
    <div>
      <h3>Doubly Linked List</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-style"
        />
        <button className="btn" onClick={() => { if(input !== '') { insertAtBeginning(Number(input)); setInput(''); } }}>Insert at Beginning</button>
        <button className="btn" onClick={() => { if(input !== '') { insertAtEnd(Number(input)); setInput(''); } }}>Insert at End</button>
      </div>
      <div className="btn-container">
        <button className="btn-small" onClick={deleteFromBeginning}>Delete from Beginning</button>
        <button className="btn-small" onClick={deleteFromEnd}>Delete from End</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>List: </strong>{displayList() || 'Empty'}
      </div>
      <div className="linked-list-diagram">
        <h4>Linked List Diagram:</h4>
        {head ? (
          <div className="linked-list-visual">
            {displayList().split(' ↔ ').map((element, index) => (
              <div key={index} className="linked-list-node">
                {element}
                {index < displayList().split(' ↔ ').length - 1 && ' ↔ '}
              </div>
            ))}
          </div>
        ) : (
          <div>No elements in list</div>
        )}
      </div>
    </div>
  );
};

// Doubly Circular Linked List implementation
const DoublyCircularLinkedList = ({ onBack }) => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState('');

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }

  const insertAtBeginning = (data) => {
    const newNode = new Node(data);
    if (!head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      setHead(newNode);
      return;
    }
    newNode.next = head;
    newNode.prev = head.prev;
    head.prev.next = newNode;
    head.prev = newNode;
    setHead(newNode);
  };

  const insertAtEnd = (data) => {
    const newNode = new Node(data);
    if (!head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      setHead(newNode);
      return;
    }
    newNode.prev = head.prev;
    newNode.next = head;
    head.prev.next = newNode;
    head.prev = newNode;
  };

  const deleteFromBeginning = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (head.next === head) {
      setHead(null);
      return;
    }
    const newHead = head.next;
    newHead.prev = head.prev;
    head.prev.next = newHead;
    setHead(newHead);
  };

  const deleteFromEnd = () => {
    if (!head) {
      alert('List is empty!');
      return;
    }
    if (head.next === head) {
      setHead(null);
      return;
    }
    const tail = head.prev;
    tail.prev.next = head;
    head.prev = tail.prev;
  };

  const displayList = () => {
    if (!head) return '';
    let result = [];
    let current = head;
    do {
      result.push(current.data);
      current = current.next;
    } while (current !== head);
    return result.join(' ↔ ');
  };

  return (
    <div>
      <h3>Doubly Circular Linked List</h3>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter element"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-style"
        />
        <button className="btn" onClick={() => { if(input !== '') { insertAtBeginning(Number(input)); setInput(''); } }}>Insert at Beginning</button>
        <button className="btn" onClick={() => { if(input !== '') { insertAtEnd(Number(input)); setInput(''); } }}>Insert at End</button>
      </div>
      <div className="btn-container">
        <button className="btn-small" onClick={deleteFromBeginning}>Delete from Beginning</button>
        <button className="btn-small" onClick={deleteFromEnd}>Delete from End</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>List: </strong>{displayList() || 'Empty'}
      </div>
      <div className="linked-list-diagram">
        <h4>Linked List Diagram:</h4>
        {head ? (
          <div className="linked-list-visual">
            {displayList().split(' ↔ ').map((element, index) => (
              <div key={index} className="linked-list-node">
                {element}
                {index < displayList().split(' ↔ ').length - 1 && ' ↔ '}
              </div>
            ))}
            {head && <span> (circular)</span>}
          </div>
        ) : (
          <div>No elements in list</div>
        )}
      </div>
    </div>
  );
};

export default LinkedList;
