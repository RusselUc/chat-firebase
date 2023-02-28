import React, { useContext } from "react";
import cam from '../assets/img/cam.png'
import add from '../assets/img/add.png'
import more from '../assets/img/more.png'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatProvider";

const Chat = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
        <Messages/>
        <Input/>
    </div>
  );
};

export default Chat;
