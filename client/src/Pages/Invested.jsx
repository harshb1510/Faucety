import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

const Invested = () => {
  const [option, setOption] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    getInvest(userId);
  }, [option]);

  const getInvest = async (userId) => {
    try {
      const response = await axios.get(
        "https://faucety.onrender.com/users/getInvest",
        {
          headers: {
            "x-auth-token": userId,
          },
        }
      );
      console.log(response.data.invest);
      setOption(response.data.invest);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <h1 className="text-center text-white font-bold text-3xl mb-20">
        Invested History
      </h1>
      <div class=" ml-72 bg-black mr-[19rem]">
        <table class="table-auto border-collapse border border-gray-400  ">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 border w-20 border-gray-400">
                SR NO.
              </th>

              <th class="px-4 py-2 bg-gray-200 border w-40 border-gray-400">
                Coin Name
              </th>
              <th class="px-4 py-2 bg-gray-200 border w-40 border-gray-400">
                Total Amount
              </th>
              <th class="px-4 py-2 bg-gray-200 border w-40 border-gray-400">
                Invested
              </th>
              <th class="px-4 py-2 bg-gray-200 border w-40 border-gray-400">
                Investing After Every % of Dip
              </th>
              <th class="px-4 py-2 bg-gray-200 border w-40 border-gray-400">
                Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            {option.map((item, index) => (
              <tr key={item.coinName} class="py-4">
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {index + 1}
                </td>
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {item.coinName}
                </td>
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {item.totalAmount}
                </td>
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {item.invested}
                </td>
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {item.dip}
                </td>
                <td class="px-4 py-2 border-b text-center text-white border-gray-400">
                  {item.remainInvest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invested;
