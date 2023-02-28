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
    <div className="input">
      <input
        type="text"
        placeholder="Mensaje"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={image} alt="" />
        </label>
        <button onClick={() => handleSend()}>Enviar</button>
      </div>
    </div>
  );
};

export default Input;
