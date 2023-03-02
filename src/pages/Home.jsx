import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='h-screen flex justify-center bg-[#141D2F] w-full'>
      <div className="flex md:w-1/2 p-2 overflow-hidden md:rounded-3xl md:border">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home