import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="bg-[#141D2F] flex h-screen justify-center items-center">
      <div className="flex flex-col justify-center mx-10 items-center bg-white rounded-2xl p-12 md:p-20">
        <span className="text-2xl font-bold">Chat</span>
        <span className="text-lg">Login</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-4 mt-4"
        >
          <input
            type="email"
            placeholder="correo"
            className="border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg"
          />
          <input
            type="password"
            placeholder="contraseña"
            className="border-none bg-[#F6F8FF] p-3 w-[250px] rounded-lg"
          />
          <button className="mt-4 p-3 bg-[#658cd7] rounded-xl text-white">
            Sign in
          </button>
        </form>
        <p className="mt-4 flex justify-between gap-3">
          ¿Aún no tienes una cuenta? <Link to="/register" className="text-[#2e5fa5]">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
