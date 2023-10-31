import { useState } from "react"
import LogIn from "../LogIn"
import Panel from "../Panel";

export default function Home(){
    const [isLogIn,setIsLogIn] = useState(false);

    function handleLogIn(status){
        setIsLogIn(status);
    }
    return(
        <>
        {!isLogIn && <LogIn handleLogIn={handleLogIn} />}
        {isLogIn && <Panel />}
        </>
    )
}