import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Buscar un usuario'/>
        <div className="userChat">
          <img src="https://images.pexels.com/photos/9833110/pexels-photo-9833110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="userChatInfo">
            <span>Sandra</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search