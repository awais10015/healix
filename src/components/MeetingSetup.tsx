"use client"
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk"
import React , {useEffect, useState} from "react"
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void})=>{
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
    const call = useCall()

    if(!call){
        throw new Error("use call must be used in stream call component")
    }
    useEffect(()=>{
        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])

    return(
        <div className="h-screen w-full">
            <h1>Setup</h1>
            <VideoPreview/>

            <div>
                <label >
                    <input type="checkbox" checked={isMicCamToggledOn}
                    onChange={(e)=>setIsMicCamToggledOn(e.target.checked)} />
                    Join With Mic Cam Off
                </label>
                <DeviceSettings/>
            </div>
            <Button onClick={()=>{
                call.join();
                setIsSetupComplete(true)
            }}>Join Meeting</Button>
        </div>
    )
}
export default MeetingSetup