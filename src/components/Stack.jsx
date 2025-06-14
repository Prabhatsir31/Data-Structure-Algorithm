import React, { useState } from 'react';
import '../index.css'; 

const Stack = () => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [peekValue, setPeekValue] = useState(null); // State to hold the peek value

    const push = () => {
        setStack([...stack, inputValue]);
        setInputValue('');
        setPeekValue(null); // Reset peek value on push
    };

    const pop = () => {
        setStack(stack.slice(0, -1));
        setPeekValue(null); // Reset peek value on pop
    };

    const peek = () => {
        return stack[stack.length - 1];
    };

    const handlePeek = () => {
        const value = peek();
        setPeekValue(value); // Update peek value state
    };

    return (
        <div className="container">
            <h2>Stack Operations</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter element"
            /><br /><br />
            <div className="input-group">
                <button className="btn" onClick={push}>Push</button>
                <button className="btn" onClick={pop}>Pop</button>
                <button className="btn" onClick={handlePeek}>Peek</button>
            </div>
            <div className="output-text">Stack Elements: {stack.join(', ')}</div>
            {peekValue !== null && (
                <div className="output-text">Top Element (Peek): {peekValue}</div>
            )}
            <div className="stack-diagram">
                {stack.length === 0 ? (
                    <div>No elements in stack</div>
                ) : (
                    stack.map((element, index) => (
                        <div key={index} className="stack-element">
                            {element}
                        </div>
                    )).reverse() // Reverse to show the top of the stack at the top
                )}
            </div>
        </div>
    );
};

export default Stack;
