import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../firebase";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
