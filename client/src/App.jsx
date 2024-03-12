import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup";
import Deposit from "./Pages/Deposit.jsx";
import NFTMint from "./Pages/nftMint.jsx";
import ClaimNft from "./Pages/claimNft.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home.jsx";
import Invest from "./Pages/Invest.jsx";
import Scan from "./Pages/Scan.jsx";
import DepositByINR from "./Pages/DepositByINR.jsx";
<<<<<<< HEAD
import Borrow from "./Pages/Borrow.jsx";
=======
import Profile from "./Pages/Profile.jsx";



>>>>>>> 640f5c32c052022148adb79451f5190096e99bc1

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/depositByINR" element={<DepositByINR />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/nftMint" element={<NFTMint />} />
        <Route path="/claimNft" element={<ClaimNft />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/borrow" element={<Borrow />} />
=======
        <Route path ='/deposit' element={<Deposit />} />
        <Route path= "/depositByINR" element={<DepositByINR/>}/>
        <Route path ='/scan' element={<Scan />} />
        <Route path="/nftMint" element={<NFTMint/>} />
        <Route path="/claimNft" element={<ClaimNft/>} />
        <Route path='/invest'element={<Invest/>}/>
        <Route path='/profile' element={<Profile/>}/>
>>>>>>> 640f5c32c052022148adb79451f5190096e99bc1
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
