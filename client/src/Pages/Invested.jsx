import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Invested = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    getInvest(userId);
  }, []);

  const getInvest = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/users/getInvest",
        {
          headers: {
            "x-auth-token": userId,
          },
        }
      );
      console.log(response.data.invest);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>Invested</div>;
};

export default Invested;
