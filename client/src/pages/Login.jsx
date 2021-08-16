import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import {CircularProgress} from "@material-ui/core"

const Login = ({inputNumber}) => {
    const [waiting, setWaiting] = useState(false);
    const textUser = useRef();
    const [user, setUser] = useState();
    const [error, seterror] = useState(false);
    const history = useHistory();
    

    const setUserMethod = async() => {
            setWaiting(true);
            try {
                const dataUser = await axios(`https://gorest.co.in/public/v1/users/${textUser.current.value}`);
                console.log(dataUser.data.data);
                setUser(dataUser.data.data);
                inputNumber(dataUser.data.data);
                history.push("/");
            } catch (err) {
                seterror(true);
                setWaiting(false);
            }
           
    }
    return (
        <div className="loginConainer">
            {waiting ? <CircularProgress /> : (
            <div className="loginColor">
                <input type="text" placeholder="zadej číslo" ref={textUser} className="inputNumber"/>
                <button onClick={setUserMethod} className="mainBtn">login</button>
            </div>
            )}
            <span style={{color: "red"}}>{error && "chyba nenasel jsem uzivatele s timto cislem"}</span>
        </div>
    )
}

export default Login
