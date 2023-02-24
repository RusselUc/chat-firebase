import React from 'react'
import img from '../assets/img/img.png'
import attach from '../assets/img/attach.png'

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Mensaje'/>
      <div className="send">
        <img src={attach} alt="" />
        <input style={{display:'none'}} type="file" id='file'/>
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button>Enviar</button>
      </div>
    </div>
  )
}

export default Input