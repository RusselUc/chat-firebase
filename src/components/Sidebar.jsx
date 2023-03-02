import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  const { data, open } = useContext(ChatContext)
  return (
    <div className={`${!open && 'hidden md:flex'} relative flex-1 md:flex-col md:w-[40%] lg:w-[30%] border-r-2`}>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar