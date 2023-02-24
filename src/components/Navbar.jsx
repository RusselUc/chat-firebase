import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">
        Chat
      </span>
      <div className="user">
        <img src="https://images.pexels.com/photos/9833110/pexels-photo-9833110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <span>Russel</span>
        <button>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Navbar