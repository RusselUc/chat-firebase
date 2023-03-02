import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../firebase";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="text-white flex flex-col">
      <span className="text-3xl text-center">Chats</span>
      <div className="flex items-center justify-around">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <button className="text-3xl" onClick={() => signOut(auth)}>
          <ion-icon name="log-out-sharp"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
