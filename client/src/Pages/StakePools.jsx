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
          <div key={pool._id} className="border rounded-md ">
            <div className="">
            <a href={`https://${pool.cid}.ipfs.dweb.link`}>
              <img
                src={`https://${pool.cid}.ipfs.dweb.link`}
                className="w-72 h-56 mx-auto "
                alt="NFT Image"
              />
            </a>
            </div>
            <div className="bg-black p-4">
            <p className="text-center flex mb-2"><h1 className="font-bold mr-2">Total Amount Staked : </h1>  {pool.totalStakedAmount}</p>
            <p className="text-left text-sm flex mb-2"><h1 className="font-bold mr-2 ">End Time:</h1> {pool.endTime}</p>
            <p className="text-center flex"><h1 className="font-bold mr-2 text-md">Participants:</h1> {pool.participants.join(", ")}</p>
            <Link to={`/joinPool/${pool._id}`} className="block w-full text-center bg-yellow-500 text-black font-bold rounded-md py-2 mt-4 hover:bg-yellow-600">
              Stake Now
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StakePools;
