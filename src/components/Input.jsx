import React, { useContext, useState } from "react";
import image from "../assets/img/img.png";
import attach from "../assets/img/attach.png";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      // const uploadTask = uploadBytesResumable(storageRef, img);

      const upload = uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(function (url) {
          updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: url,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="flex items-center px-2 gap-5 ">
      <input
        className="text-xl w-[65%] md:w-[80%] py-3 outline-none flex flex-wrap"
        type="text"
        placeholder="Escribe un mensaje..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex w-[28%] md:w-[20%] gap-5 md:gap-10">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <span className="text-white text-4xl flex">
          <ion-icon name="image-sharp"></ion-icon>
          </span>
        </label>
        <button
          className="bg-[#0079ff] rounded-lg text-white py-1 px-4 text-2xl items-center flex"
          onClick={() => handleSend()}
        >
          <ion-icon name="send-sharp"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Input;
