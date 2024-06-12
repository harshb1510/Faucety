import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const JoinPool = () => {
  const [pool, setPool] = useState({});
  const [amount, setAmount] = useState("");
  const [winner, setWinner] = useState(null); // State to store the winner
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchPoolDetails = async () => {
      try {
        const response = await fetch(
          `https://faucety.onrender.com/stake/getStakePoolByID/${id}`
        );
        const data = await response.json();
        setPool(data);
      } catch (error) {
        console.error("Error fetching pool details:", error);
      }
    };
    fetchPoolDetails();
  }, [id]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleJoinPool = async () => {
    try {
      const response = await fetch(
        `https://faucety.onrender.com/stake/joinPool/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: user.userName, amount }),
        }
      );
      const data = await response.json();
      setAmount("");
      window.location.reload();
    } catch (error) {
      console.error("Error joining pool:", error);
    }
  };

  // Function to handle selecting a winner
  const handleSelectWinner = async () => {
    try {
      const response = await fetch(`https://faucety.onrender.com/stake/selectWinner/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      setWinner(data.winner); // Assuming the winner is returned from the backend in the response
    } catch (error) {
      console.error("Error selecting winner:", error);
    }
  };
  

  return (
    <div className="flex h-screen bg-3f757e text-yellow-500">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Join Pool</h2>
        <div className="border rounded-md p-4 mb-4">
          <p>Pool ID: {pool._id}</p>
          <p>Creator: {pool.creator}</p>
          <p>Total Staked Amount: {pool.totalStakedAmount}</p>
          <p>End Time: {pool.endTime}</p>
          <p>
            Participants: {pool.participants && pool.participants.join(", ")}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-yellow-500"
          >
            Enter Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={handleJoinPool}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-600 mr-4"
        >
          Join Pool
        </button>
        
        {/* Button to select winner */}
        <button
          onClick={handleSelectWinner}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-600"
        >
          Select Winner
        </button>
      </div>

      {/* Popup to display the winner */}
      {winner && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Winner:</h2>
            <p className="text-xl">{winner}</p>
            <button
              onClick={() => setWinner(null)}
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

export default JoinPool;
