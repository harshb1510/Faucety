import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const StakePools = () => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/stake/getStakePools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPools(data);
      } catch (error) {
        console.error("Error fetching stake pools:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-cols-3 gap-4 p-4 text-white">
        {pools.map((pool) => (
          <div key={pool._id} className="border rounded-md p-4">
            <div className="mb-4">
            <a href={`https://${pool.cid}.ipfs.dweb.link`}>
              <img
                src={`https://${pool.cid}.ipfs.dweb.link`}
                className="w-48 h-48 mx-auto"
                alt="NFT Image"
              />
            </a>
            </div>
            <p className="text-center">Total Amount Staked: {pool.totalStakedAmount}</p>
            <p className="text-center">End Time: {pool.endTime}</p>
            <p className="text-center">Participants: {pool.participants.join(", ")}</p>
            <Link to={`/joinPool/${pool._id}`} className="block w-full text-center bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600">
              Stake Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StakePools;
