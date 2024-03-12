import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const JoinPool = () => {
  const [pool, setPool] = useState({});
  const [amount, setAmount] = useState("");
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [winner, setWinner] = useState(null);

  const handleSelectWinner = async () => {
    try {
      const response = await fetch('http://localhost:8000/selectWinner/:id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
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


  useEffect(() => {
    const fetchPoolDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/stake/getStakePoolByID/${id}`
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
        `http://localhost:8000/stake/joinPool/${id}`,
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
    } catch (error) {
      console.error("Error joining pool:", error);
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
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 mr-3 rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-600"
        >
          Join Pool
        </button>
        <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
      </div>
    </div>
  );
};

export default JoinPool;
