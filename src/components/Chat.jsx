import React, { useContext } from "react";
import cam from '../assets/img/cam.png'
import add from '../assets/img/add.png'
import more from '../assets/img/more.png'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatProvider";

const Chat = () => {
  const { data, setOpen } = useContext(ChatContext)

  return (
    <div className="flex flex-col md:w-[25%] lg:[w-45%] xl:w-[55%] 2xl:w-[62%]">
      <div className="flex justify-around py-5 bg-[#1e2a47]">
        <>
          <span className="text-white cursor-pointer text-2xl md:hidden" onClick={() => setOpen(true)}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </span>
          <span className="text-white text-xl">{data.user?.displayName}</span>
        </>
      </div>
        <Messages/>
        <Input/>
    </div>
  );
};

export default Chat;
