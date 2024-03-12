import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';

const SelectWinner = () => {
  const [winner, setWinner] = useState(null);

  const handleSelectWinner = async () => {
    try {
      const response = await fetch('http://localhost:8000/selectWinner/:id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any necessary data to the request body
      });
      const data = await response.json();
      setWinner(data.winner); // Assuming the winner is returned from the backend in the response
    } catch (error) {
      console.error('Error selecting winner:', error);
    }
  };

  const handleClosePopup = () => {
    setWinner(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <Sidebar/>
      {/* Button to trigger selecting the winner */}
      <button
        onClick={handleSelectWinner}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Select Winner
      </button>

      {/* Popup to display the winner */}
      {winner && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Winner:</h2>
            <p className="text-xl">{winner}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectWinner;
