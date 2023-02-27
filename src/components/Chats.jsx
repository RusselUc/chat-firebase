import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

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

  let a = Object.entries(chats)
  console.log(a)

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => {
        <div className="userChat" key={chat[0]}>
          <img
            src={chat[1].userInfo.photoURL}
            alt=""
          />
          <div className="userChatInfo">
            <span>{chat[1].displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Chats;
