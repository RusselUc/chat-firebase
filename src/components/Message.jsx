import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`px-4 message flex gap-5 mb-3 ${
        message.senderId === currentUser.uid ? "flex-row-reverse" : ""
      }`}
    >
      {/* <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div> */}
      <div
        className={`max-w-[80%] flex flex-col gap-1
        ${message.senderId === currentUser.uid && "items-end"}`}
      >
        <p
          className={`max-w-max rounded-b-xl px-2 py-3 ${
            message.senderId === currentUser.uid
              ? "bg-[#8da4f1] rounded-tl-xl"
              : "bg-white  rounded-tr-xl"
          }`}
        >
          {message.text}
        </p>
        {message.img && <img className="w-1/2" src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
