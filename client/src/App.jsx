import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup";
import NFTMint from "./Pages/nftMint.jsx";
import ClaimNft from "./Pages/claimNft.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home.jsx";
import Invest from "./Pages/Invest.jsx";
import DepositByINR from "./Pages/DepositByINR.jsx";
import StakePools from "./Pages/StakePools.jsx";
import CreatePool from "./Pages/CreatePool.jsx";
import JoinPool from "./Pages/JoinPool.jsx";
import Borrow from "./Pages/Borrow.jsx";
import Profile from "./Pages/Profile.jsx";
import NftSHM from "./Pages/NftSHM.jsx";
import Portfolio from "./Pages/Portfolio.jsx";
import Invested from "./Pages/Invested.jsx";




const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/depositByINR" element={<DepositByINR/>}/>
        <Route path="/nftMint" element={<NFTMint/>} />
        <Route path="/claimNft" element={<ClaimNft/>} />
        <Route path="/stakePools" element={<StakePools/>}/>
        <Route path="/createPool" element={<CreatePool/>}/>
        <Route path="/joinPool/:id" element={<JoinPool/>}/>
        <Route path='/invest' element={<Invest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/nftSHM" element={<NftSHM/>}></Route>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path="/invested" element={<Invested />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
