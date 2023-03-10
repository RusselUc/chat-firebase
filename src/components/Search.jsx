import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        await updateDoc(doc(db,"userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db,"userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null)
    setUsername("")
  };

  return (
    <div className="search w-full">
      <div className="searchForm w-full">
        <div className="flex items-center w-full justify-between">
          <input
            className=" h-10 outline-none text-xl rounded-lg p-2"
            type="text"
            placeholder="Buscar un usuario"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        <span className="text-5xl text-white cursor-pointer hover:text-[#8da4f1]" onClick={() => handleSearch()}>
          <ion-icon name="search-circle-sharp"></ion-icon>
        </span>
        </div>
        {err && <span>Usuario no encontrado</span>}
        {user && (
          <div className="flex justify-around items-center cursor-pointer hover:bg[#8da4f1]" onClick={handleSelect}>
            <img className="h-[50px] w-[50px]" src={user.photoURL} alt="" />
            <div className="text-white text-xl">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
