import React from 'react'
import Sidebar from '../Components/Sidebar'
import axios from 'axios';

export default function Portfolio() {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("hello",user);  
  
   
  return (
    <div>
      <div>
      <Sidebar />
        <h1 className="text-center text-white text-4xl mb-10">Portolio</h1>
      <div className="flex justify-center">
        <div className="bg-white rounded-xl w-96  p-3">
          <div className="flex ">
            <div>
            <img src="profile.gif" className="h-16 w-16 rounded-xl "></img>
            </div>
            <div className="">
                <div className="flex justify-between">
              <h1 className="mr-56 ml-4">id</h1>
            <h1 className='mr-2 '>~Upi</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="mr-20 ml-4 font-bold text-lg">${user?.wallet}<h1 className='text-xs'>Balance</h1></h1>
                <h1 className='font-bold text-sm mt-3'>{user.userName}@ybl</h1>
                </div>
            </div>
            
            
          </div>
          
        </div>
      </div>



      <div className="flex justify-center mt-4">
<div className="bg-white p-4 w-96 rounded-xl ">
      <h1 className="text-black text-left border-b font-bold">Tokens</h1>
      <div className="flex ">
        <div className="bg-white rounded-xl p-1">
          <div className="flex mt-4 ">
            <div>
            <img src="icon.jpeg" className="h-12 w-12 rounded-2xl "></img>
            </div>
            <div className="">
                <div className="flex justify-between">
              <h1 className="mr-40 ml-4 font-bold">USDC</h1>
            <h1 className='font-bold'>$120</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="mr-20 ml-4 text-xs">USDC token</h1>
                <h1 className="text-xs">$120</h1>
                </div>
            </div>
            
            
          </div>
          <div className="flex mt-4 ">
            <div>
            <img src="icon.jpeg" className="h-12 w-12 rounded-2xl "></img>
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
    </div>
  )
}
