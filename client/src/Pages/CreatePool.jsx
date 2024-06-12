import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';

const CreatePool = () => {
  const [formData, setFormData] = useState({
    creator: '',
    totalStakedAmount: '',
    endTime: '',
    cid: '',
    transaction: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://faucety.onrender.com/stake/createStake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      // Reset the form data after successful submission
      setFormData({
        creator: '',
        totalStakedAmount: '',
        endTime: '',
        cid: '',
        transaction: '',
      });
    } catch (error) {
      console.error('Error creating stake pool:', error);
    }
  };

  return (
    <div>
      <Sidebar/>
      <section className="bg-3f757e">
        <div className="flex flex-col items-center justify-center px-6 py-Z mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white border rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-yellow-500 md:text-2xl">
                Create your Pool
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="creator"
                    className="block mb-2 text-sm font-medium text-yellow-500"
                  >
                    Creator:
                  </label>
                  <input
                    type="text"
                    id="creator"
                    name="creator"
                    value={formData.creator}
                    onChange={handleChange}
                    className="bg-white border border-gray-800 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalStakedAmount"
                    className="block mb-2 text-sm font-medium text-yellow-500"
                  >
                    Total Staked Amount:
                  </label>
                  <input
                    type="number"
                    id="totalStakedAmount"
                    name="totalStakedAmount"
                    value={formData.totalStakedAmount}
                    onChange={handleChange}
                    className="bg-white border border-gray-800 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="block mb-2 text-sm font-medium text-yellow-500"
                  >
                    End Time:
                  </label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="bg-white border border-gray-800 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cid"
                    className="block mb-2 text-sm font-medium text-yellow-500"
                  >
                    CID:
                  </label>
                  <input
                    type="text"
                    id="cid"
                    name="cid"
                    value={formData.cid}
                    onChange={handleChange}
                    className="bg-white border border-gray-800 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="transaction"
                    className="block mb-2 text-sm font-medium text-yellow-500"
                  >
                    Transaction:
                  </label>
                  <input
                    type="text"
                    id="transaction"
                    name="transaction"
                    value={formData.transaction}
                    onChange={handleChange}
                    className="bg-white border border-gray-800 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                 Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatePool;
