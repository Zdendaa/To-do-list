import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import {CircularProgress} from "@material-ui/core"

const Login = ({inputNumber}) => {
    const [waiting, setWaiting] = useState(false);
    const textUser = useRef();
    const [error, seterror] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const history = useHistory();
    

    const setUserMethod = async() => {
            if (textUser.current.value !== "") {
                setEmptyError(false);
                setWaiting(true);
                try {
                    
                    const dataUser = await axios(`https://gorest.co.in/public/v1/users/${textUser.current.value}`);
                    console.log(dataUser.data.data);
                    inputNumber(dataUser.data.data);
                    history.push("/");
                } catch (err) {
                    seterror(true);
                    setWaiting(false);
                }
            } else {
                seterror(false);
                setEmptyError(true);
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
            <span style={{color: "red"}}>{error && "chyba nenašel jsem uživatele s tímto číslem"}</span>
            <span style={{color: "red"}}>{emptyError && "zadejte prosím číslo"}</span>
        </div>
    )
}

export default Login
