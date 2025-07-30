"use client"
import React from "react";
import selectedUserContext from "./selectedUserContext";
const SelectedUserContextProvider = ({children})=>{
    const [selectedUser , setSelectedUser] = React.useState(null)
    return(
        <selectedUserContext.Provider value={{selectedUser , setSelectedUser}}>
            {children}
        </selectedUserContext.Provider>
    )
}

export default SelectedUserContextProvider