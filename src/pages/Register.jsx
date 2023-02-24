import React from 'react'
import add from '../assets/img/addAvatar.png'

const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='Nombre usuario'/>
                <input type="email" placeholder='correo'/>
                <input type="password" placeholder='contraseña'/>
                <input style={{display:"none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={add} alt="" />
                    <span>Añadir un avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>¿Ya tienes una cuenta? Iniciar sesión</p>
        </div>
    </div>
  )
}

export default Register