import React, { useState } from 'react';
import './MatrixGame.css';

const MatrixGame = () => {
  // Initialize a 3x3 matrix with white color
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill('white')));
  const [clickedOrder, setClickedOrder] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleBoxClick = (row, col) => {
    // If the game is complete or the box is already clicked, return
    if (isComplete || matrix[row][col] !== 'white') return;

    // Create a new matrix with the clicked box colored green
    const newMatrix = [...matrix];
    newMatrix[row][col] = 'green';
    setMatrix(newMatrix);

    // Update the clicked order
    const newClickedOrder = [...clickedOrder, { row, col }];
    setClickedOrder(newClickedOrder);

    // Check if this is the last box (all boxes are clicked)
    if (newClickedOrder.length === 9) {
      setIsComplete(true);
      // Start the sequence animation
      let delay = 0;
      // Include the current click in the sequence
      const allClicks = [...newClickedOrder, { row, col }];
      
      // Function to update a single box
      const updateBox = (index) => {
        if (index < allClicks.length) {
          const { row, col } = allClicks[index];
          setMatrix(prevMatrix => {
            const updatedMatrix = [...prevMatrix];
            updatedMatrix[row][col] = 'orange';
            return updatedMatrix;
          });
          // Schedule the next box update
          setTimeout(() => updateBox(index + 1), 500);
        }
      };

      // Start the sequence
      updateBox(0);
    }
  };

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="matrix-box"
              style={{ backgroundColor: cell }}
              onClick={() => handleBoxClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixGame; 