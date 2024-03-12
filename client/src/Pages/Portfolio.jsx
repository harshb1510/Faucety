import React from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { Button, Modal, TextField } from "@mui/material";

export default function Portfolio() {
  const history = useNavigate();
  const [userId, setUserId] = useState("");
  const [payableAmount, setPayableAmount] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const qrData = async (text) => {
    const deposit = JSON.parse(text);
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
    setPayableAmount(deposit.payableAmount);
    setShowModal(true);
  };

  const handlePayment = async () => {
    console.log(usdtAmount);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      senderId: user._id,
      receiverId: userId,
      amount: usdtAmount,
    };
    const response = await axios.post(
      "http://localhost:8000/users/sendCrypto",
      data
    );
    console.log(response);
    if (response.status === 200) {
      setShowModal(false);
      history("/");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("hello", user);
  const [bookingData, setBookingData] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setBookingData({
        userId: user._id,
        username: user.username,
        email: user.email,
      });
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center  gap-[90px] pt-10">
        <Sidebar />
        <div>
          <div className="flex justify-between ">
          <h1 className="text-center mr-20  text-white text-4xl mb-10">Portolio</h1>
          <button className="ml-10 mb-8 bg-yellow-500 border rounded-xl font-bold p-2">Wallet:${user.wallet}</button>

          <button className="ml-2 mb-8 bg-yellow-500 border font-bold rounded-xl p-2">Staked:${user.staked}</button>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-xl w-96  p-3">
              <div className="flex ">
                <div>
                  <img
                    src="profile.gif"
                    className="h-16 w-16 rounded-xl "
                  ></img>
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="mr-56 ml-4">id</h1>
                    <h1 className="mr-2 ">~Upi</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="mr-20 ml-4 font-bold text-lg">
                      {user?.wallet ? `$${user.wallet}` : "Loading..."}
                      <span className="text-xs">Balance</span>
                    </h1>
                    <h1 className="font-bold text-sm mt-3">
                      {user?.userName}@ybl
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly items-center mt-4">
            <div className="bg-white p-4 w-96 rounded-xl  ">
              <h1 className="text-black text-left border-b font-bold">
                Tokens
              </h1>
              <div className="flex ">
                <div className="bg-white rounded-xl p-1">
                  <div className="flex mt-4 ">
                    <div>
                      <img
                        src="icon.jpeg"
                        className="h-12 w-12 rounded-2xl "
                      ></img>
                    </div>
                    <div className="">
                      <div className="flex justify-between">
                        <h1 className="mr-40 ml-4 font-bold">USDC</h1>
                        <h1 className="font-bold">$120</h1>
                      </div>
                      <div className="flex justify-between">
                        <h1 className="mr-20 ml-4 text-xs">USDC token</h1>
                        <h1 className="text-xs">$120</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 ">
                    <div>
                      <img
                        src="icon.jpeg"
                        className="h-12 w-12 rounded-2xl "
                      ></img>
                    </div>
                    <div className="">
                      <div className="flex justify-between">
                        <h1 className="mr-40 ml-4">USDC</h1>
                        <h1>$120</h1>
                      </div>
                      <div className="flex justify-between">
                        <h1 className="mr-20 ml-4 text-xs">USDC token</h1>
                        <h1 className="text-xs">$120</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookingData && (
          <div className="flex flex-col items-center mt-[80px]">
            <QRCode
              value={JSON.stringify(bookingData)}
              style={{ width: "200px", height: "200px" }}
            />
            <p
              className="mt-4  px-4 py-2 font-bold text-white bg-b-900 rounded-md"
            >
              Receive Money through this QR
            </p>
          </div>
        )}
      </div>
      <div >
        {!isScanning&&(
        <button
          onClick={() => setIsScanning(true)}
          className="bg-white rounded p-3 ml-[690px] mt-[60px] font-bold"
        >
          Send Money
        </button>
        )}
        {isScanning && (
          <div className="h-[370px] w-[370px] m-auto pt-4 pl-8">
            <Scanner
              components={{
                audio: false,
              }}
              options={{
                delayBetweenScanSuccess: 10000,
              }}
              onResult={(text) => qrData(text)}
              onError={(error) => console.log(error?.message)}
            />
            <Modal open={showModal} onClose={() => setShowModal(false)}>
              <div className="modal-container bg-white fixed z-[1300]  flex items-center justify-center">
                <div className="modal-content flex flex-col justify-center items-center gap-5 p-6 ">
                  <TextField
                    label="Enter Amount in USDT"
                    variant="outlined"
                    value={usdtAmount}
                    onChange={(e) => setUsdtAmount(e.target.value)}
                  />
                  <Button
                    onClick={handlePayment}
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}
