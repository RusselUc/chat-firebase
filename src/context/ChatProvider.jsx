import React, { createContext, useContext, useReducer, useState } from 'react'
import { AuthContext } from './AuthProvider'

export const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }

    const [open, setOpen] = useState(true)

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{data:state, dispatch, open, setOpen}}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider