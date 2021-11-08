import {useRef, useEffect, useState} from "react";

import "./stopwatch.css"
export const StopWatch = () => {

        const [hours, setHours] = useState(0);
        const [min, setMin] = useState(0);
        const [sec, setSec] = useState(0);
        const [miliSec, setMiliSec] = useState(0);
            const militimeRef = useRef(0);
            const sectimeRef = useRef(0);
            const mintimeRef = useRef(0);
            const htimeRef = useRef(0)

        useEffect( () => {
           
            handleStart();


        }, [])
        const handleStart = () => {
            militimeRef.current = setInterval(() => {
                setMiliSec((p) => (p !== 1000? p + 1: 0) );
                // setSec((sec) => (sec !== 60? sec + 1 : 0));
                // setMin((min) => (min !== 60? min + 1 : 0));
                // setHours((h) => (h !== 24? h + 1: 0))
            }, 1)

            sectimeRef.current = setInterval(() => {
                
                setSec((sec) => (sec !== 60? sec + 1 : 0));
                
            }, 1000)
            mintimeRef.current = setInterval(() => {
                
                setMin((min) => (min !== 60? min + 1 : 0));
                
            }, (1000 * 60))
            htimeRef.current = setInterval(() => {
                
                setHours((h) => (h !== 24? h + 1: 0))
            }, 1000 * 60 * 60)
        }
        const handlePause = () => {
            clearInterval(militimeRef.current);
            clearInterval(sectimeRef.current);
            clearInterval(mintimeRef.current);
            clearInterval(htimeRef.current);
            militimeRef.current = null;
            sectimeRef.current = null;
            mintimeRef.current = null;
            htimeRef.current = null;

        }

        const handlePlay = () => {
            if(militimeRef.current && sectimeRef.current && mintimeRef.current && htimeRef.current) {
                return;
            }
            handleStart();
        }

        const handleReset = () => {
            setMiliSec(0);
            setHours(0);
            setMin(0);
            setSec(0);
            clearInterval(militimeRef.current);
            clearInterval(sectimeRef.current);
            clearInterval(mintimeRef.current);
            clearInterval(htimeRef.current);

        }

    return (
        <div className="main">
            <div>StopWatch : {hours} : {min} : {sec} : {miliSec}</div>
            <button onClick = {handlePause} className="pause">Pause</button>
            <button onClick = {handlePlay}className="play">Play</button>
            <button onClick = {handleReset}className="reset">Reset</button>
        </div>
    )
}