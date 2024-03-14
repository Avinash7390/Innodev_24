import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import { io } from "socket.io-client";
import React, { useState } from 'react'
import NewChatUser from "../components/NewChatUser";
import Chat from "../components/chat";



const GlobalChat = () => {

    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState("");
    const [Message,setMessage] = useState("");


    function handleChange({ currentTarget: input }) {
        setNewUser(input.value);
    }

    function logNewUser() {
        setUser(newUser);
    }

    function handleChange2({ currentTarget: input }){
        setMessage(input.value)
    }



    return (
        <div>
            <main className="content">
                <div className="container mt-3">
                    {user && (<Chat user={user} Message={Message} handleChange2={handleChange2}/>)}
                    {!user &&(
                    <NewChatUser newUser={newUser} handleChange={handleChange} logNewUser={logNewUser} />)
                    }

                </div>
            </main>
        </div>
    )
}

export default GlobalChat
