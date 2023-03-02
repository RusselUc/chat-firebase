import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, setOpen } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setOpen(false);
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="flex p-2 items-center gap-2 text-white cursor-pointer hover:bg-[#8da4f1]"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            {/* {chat[1].userInfo.photoURL} */}
            {/* <img className="h-[50px] w-[50px] object-cover" src={chat[1].userInfo.photoURL} alt="" /> */}
            <div className="userChatInfo">
              <span className="font-bold text-xl">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-md">{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
