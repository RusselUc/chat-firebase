import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Chat</span>
        <span className='title'>Login</span>
        <form>
            <input type="email" placeholder='correo'/>
            <input type="password" placeholder='contraseña'/>
            <button>Sign in</button>
        </form>
        <p>¿Aún no tienes una cuenta? Registrate</p>
    </div>
</div>
  )
}

export default Login