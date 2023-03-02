import React, { useState } from "react";
import add from "../assets/img/addAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="bg-[#141D2F] flex h-screen justify-center items-center">
      <div className="flex flex-col justify-center mx-10 items-center bg-white rounded-2xl p-12 md:p-20">
        <span className="text-2xl font-bold">Chat</span>
        <span className="text-lg">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center items-center gap-4 mt-4">
          <input className="border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg" type="text" placeholder="Nombre usuario" />
          <input className="border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg" type="email" placeholder="correo" />
          <input className="border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg" type="password" placeholder="contraseña" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label className="flex items-center border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg" htmlFor="file">
            <img src={add} alt="" />
            <span>Añadir un avatar</span>
          </label>
          <button className="mt-4 p-3 bg-[#658cd7] rounded-xl text-white">Sign up</button>
        </form>
        <p>¿Ya tienes una cuenta? <Link className="text-[#2e5fa5]" to="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
