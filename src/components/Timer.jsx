import {useEffect, useState, useRef} from "react";

import "./timer.css"


export const Timer = () => {

    const Ref = useRef(null);
    const [timer, setTimer] = useState(`00:00:00:00`);


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const mili = Math.floor((total) % 1000);
        const seconds = Math.floor((total/ 1000) % 60);
        const minutes = Math.floor((total/1000/60) % 60);
        const hours = Math.floor((total/1000 * 60 * 60) % 24);
        return {
            total, mili, hours, minutes, seconds
        }

    }


    const startTimer = (e) => {
        let {total, mili, hours, minutes, seconds} = getTimeRemaining(e);
        if(total >= 0) {
            setTimer((hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds))
        }
    }

    const clearTimer = (e) => {

        setTimer()

        if(Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);

        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 10);

        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div>
            <h2>{timer}</h2>
            <button onClick = {onClickReset} className="rst">Reset</button>
        </div>
    )
}