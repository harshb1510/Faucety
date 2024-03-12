    import React from 'react'
    import Sidebar from '../Components/Sidebar'

    export default function Profile() {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("hello",user);
        return (
        <div>
            <Sidebar/>
            <div className='flex justify-center' >
                <div className=' text-black bg-gray-900 opacity-90' style={{backgroundImage: `url('data:image/jpeg;base64,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')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <h1 className='text-center text-yellow-500 mt-4 text-4xl font-bold'>Profile</h1>
                <div className="flex flex-col items-center p-8 ">
        <img src="profile.jpg" alt="Profile" className="rounded-xl h-24 w-24 mb-4" />
        <div className="text-center">
            <p className="text-xl text-yellow-500 ml-10    flex  font-semibold">
                <h1 className='text-yellow-500 mr-4'>Username :</h1> {user.userName}</p>
            <p className="text-yellow-500 flex mt-4 ml-10 font-semibold">
                <h1 className='text-yellow-500 mr-4'> 
                Email:</h1>{user.email}</p>
            <div className='flex justify-between'>
            <p className="mt-4 mr-8 flex text-yellow-500"><h1 className='mr-2 text-yellow-500'>Wallet Amount:</h1>$ {user.wallet}</p>
            <p className="mt-4 text-yellow-500 flex"><h1 className='text-yellow-500 mr-2'>Staked Amount:</h1> ${user.staked}</p>

            </div>
        </div>
        </div>
                </div>
            </div>
        
        </div>
    )
    }
