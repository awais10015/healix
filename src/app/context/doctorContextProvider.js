"use client"
import React from "react";
import doctorContext from "./doctorContext";
const DoctorContextProvider = ({children})=>{
    const [doctor , setDoctor] = React.useState(null)
    return(
        <doctorContext.Provider value={{doctor , setDoctor}}>
            {children}
        </doctorContext.Provider>
    )
}

export default DoctorContextProvider