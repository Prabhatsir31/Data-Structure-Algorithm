// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../index.css'; 

const Navbar = ({ selected, onSelect }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setOpenDropdown(null);
  };

  return (
    <nav ref={navRef} className="navbar" aria-label="Primary navigation">
      <ul>
        <NavDropdown
          label="Stack"
          isOpen={openDropdown === 'stack'}
          onToggle={() => toggleDropdown('stack')}
          items={[{ label: 'Stack Operations', value: 'stack' }]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Queue"
          isOpen={openDropdown === 'queue'}
          onToggle={() => toggleDropdown('queue')}
          items={[
            { label: 'Simple Queue', value: 'queue-simple' },
            { label: 'Circular Queue', value: 'queue-circular' },
            { label: 'Priority Queue', value: 'queue-priority' },
          ]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Linked List"
          isOpen={openDropdown === 'linkedList'}
          onToggle={() => toggleDropdown('linkedList')}
          items={[
            { label: 'Singly Linked List', value: 'linkedList-singly' },
            { label: 'Circular Linked List', value: 'linkedList-circular' },
            { label: 'Doubly Linked List', value: 'linkedList-doubly' },
            { label: 'Doubly Circular Linked List', value: 'linkedList-doublyCircular' },
          ]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Tree"
          isOpen={openDropdown === 'tree'}
          onToggle={() => toggleDropdown('tree')}
          items={[{ label: 'Binary Search Tree', value: 'tree-bst' }]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Graph Algorithms"
          isOpen={openDropdown === 'graph'}
          onToggle={() => toggleDropdown('graph')}
          items={[
            { label: "Dijkstra's Algorithm", value: 'graph-dijkstra' },
            { label: "Prim's & Kruskal's", value: 'graph-primKruskal' },
            { label: 'Bellman-Ford', value: 'graph-bellmanFord' },
            { label: 'Floyd-Warshall', value: 'graph-floydWarshall' },
            { label: 'Topological Sort', value: 'graph-topologicalSort' },
            { label: 'Union-Find', value: 'graph-unionFind' },
          ]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Searching Algorithms"
          isOpen={openDropdown === 'searching'}
          onToggle={() => toggleDropdown('searching')}
          items={[
            { label: 'Sequential Search', value: 'Sequential Search' },
            { label: 'Binary Search', value: 'Binary Search' },
          ]}
          onSelect={handleSelect}
          selected={selected}
        />
        <NavDropdown
          label="Sorting Algorithms"
          isOpen={openDropdown === 'sorting'}
          onToggle={() => toggleDropdown('sorting')}
          items={[
            { label: "Insertion Sort", value: 'Insertion Sort' },
            { label: "Selection Sort", value: 'Selection Sort' },
            { label: 'Bubble Sort', value: 'Bubble Sort' },
            { label: 'Heap Sort', value: 'Heap Sort' },
            { label: 'Merge Sort', value: 'Merge Sort' },
            { label: 'Quick Sort', value: 'Quick Sort' },
            { label: 'Radix Sort', value: 'Radix Sort' },
            { label: 'Bucket Sort', value: 'Bucket Sort' },
            { label: 'Counting Sort', value: 'Counting Sort' },
          ]}
          onSelect={handleSelect}
          selected={selected}
        />
      </ul>
    </nav>
  );
};

const NavDropdown = ({ label, isOpen, onToggle, items, selected, onSelect }) => {
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Focus first item when dropdown opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstItem = menuRef.current.querySelector('button[role="menuitem"]');
      firstItem?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation inside dropdown
  const onMenuKeyDown = (e) => {
    const menuItems = Array.from(menuRef.current.querySelectorAll('button[role="menuitem"]'));
    const idx = menuItems.indexOf(document.activeElement);

    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      const nextIdx = (idx + 1) % menuItems.length;
      menuItems[nextIdx].focus();
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      const prevIdx = (idx - 1 + menuItems.length) % menuItems.length;
      menuItems[prevIdx].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onToggle();
      buttonRef.current.focus();
    }
  };

  return (
    <li className="nav-list-item">
      <button
        type="button"
        ref={buttonRef}
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`${label}-menu`}
        className={`nav-item ${selected === label.toLowerCase() || items.some(i => i.value === selected) ? 'nav-item-selected' : ''}`}
      >
        {label}
        <span aria-hidden="true" style={{ marginLeft: 6 }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      <ul
        id={`${label}-menu`}
        ref={menuRef}
        role="menu"
        aria-label={`${label} submenu`}
        className={`dropdown ${isOpen ? 'open' : ''}`}
        onKeyDown={onMenuKeyDown}
      >
        {items.map(({ label: itemLabel, value }) => (
          <li key={value} role="none" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <button
              type="button"
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => onSelect(value)}
              className={`dropdown-item ${selected === value ? 'selected' : ''}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(value);
                }
              }}
            >
              {itemLabel}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Navbar;
