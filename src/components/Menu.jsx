import React, { useState } from 'react';
import Stack from './Stack';
import Queue from './Queue';
import LinkedList from './LinkedList';
import Tree from './Tree';
import Graph from './Graph';
import '../index.css';

const Menu = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const renderComponent = () => {
        switch (selectedOption) {
            case 'stack':
                return <Stack onBack={() => setSelectedOption(null)} />;
            case 'queue':
                return <Queue onBack={() => setSelectedOption(null)} />;
            case 'linkedList':
                return <LinkedList onBack={() => setSelectedOption(null)} />;
            case 'tree':
                return <Tree onBack={() => setSelectedOption(null)} />;
            case 'graph':
                return <Graph onBack={() => setSelectedOption(null)} />;
            default:
                return null; // No component to render
        }
    };

    return (
        <div className="menu-container">
            <h1 className="menu-title">Data Structures Menu</h1>
            {!selectedOption ? (
                <ul className="menu-list">
                    <li>
                        <button className="menu-button" onClick={() => setSelectedOption('stack')}>Stack</button>
                    </li>
                    <li>
                        <button className="menu-button" onClick={() => setSelectedOption('queue')}>Queue</button>
                    </li>
                    <li>
                        <button className="menu-button" onClick={() => setSelectedOption('linkedList')}>Linked List</button>
                    </li>
                    <li>
                        <button className="menu-button" onClick={() => setSelectedOption('tree')}>Tree</button>
                    </li>
                    <li>
                        <button className="menu-button" onClick={() => setSelectedOption('graph')}>Graph Algorithms</button>
                    </li>
                    <li>
                        <button className="menu-button" onClick={() => alert('Exiting application')}>Exit</button>
                    </li>
                </ul>
            ) : (
                <button className="btn-back" onClick={() => setSelectedOption(null)}>Back to Menu</button>
            )}
            {renderComponent()}
        </div>
    );
};

export default Menu;
