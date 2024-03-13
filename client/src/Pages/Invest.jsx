import React from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

export default function Invest() {
  const [totalAmount, setTotalAmount] = React.useState("");
  const [dip, setDip] = React.useState("");

 const userId = JSON.parse(localStorage.getItem("user"))?._id||{};

  const handleInvest = async() => {
    const data = await axios.post("http://localhost:8000/users/addInvest", {
      userId,
      totalAmount,
      dip,
    });
    window.location.href='/invested';
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center shadow:bg-white border rounded-xl  bg-black bg-opacity-30 w-1/2  mt-20 ml-40 ">
        <div className="text-white text-center">
          <h3 className=" mt-4 font-bold text-white text-2xl">
            Invest Your Money by DCA Strategy
          </h3>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <h1 className="text-black font-bold text-3xl"></h1>
                  <p className="text-white font-semibold text-lg mt-1">
                    0xC33......8eC0
                  </p>
                </div>
              </div>
            </div>

            <h1 className="text-white font-bold mb-4">DCA in Ethereum</h1>

            <div className=" border rounded-lg bg-gray-400 p-3 mb-4">
              <h1 className="text-black font-bold text-left">
                {" "}
                I want to buy Ethereum of :
              </h1>
              <div className="flex mt-3 mb-4 ">
                <input
                  className="border p-3 rounded-xl mr-2 text-black"
                  placeholder="Total Amount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
                <input
                  className="border p-3 rounded-xl text-black"
                  placeholder="in every _% of dip"
                  value={dip}
                  onChange={(e) => setDip(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-yellow-500 p-3 rounded-xl mb-4 w-56 text-black font-bold hover:bg-yellow-600"
              onClick={handleInvest}
            >
              Invest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
