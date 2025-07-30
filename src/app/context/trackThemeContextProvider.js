"use client"
import React from "react";
import trackThemeContext from "./trackThemeContext";
const TrackThemeContextProvider = ({children})=>{
    const [selectedTheme , setSelectedTheme] = React.useState("light")
    return(
        <trackThemeContext.Provider value={{selectedTheme , setSelectedTheme}}>
            {children}
        </trackThemeContext.Provider>
    )
}

export default TrackThemeContextProvider