import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import { io } from "socket.io-client";
import React, { useState } from 'react'
import NewChatUser from "../components/NewChatUser";

const GlobalChat = () => {

    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState("");
    function handleChange({ currentTarget: input }) {
        setNewUser(input.value);
    }

    function logNewUser() {
        setUser(newUser);
    }



    return (
        <div>
            <main className="content">
                <div className="container mt-3">
                    {user && (
                        <div className="card w-100">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-xl-12">
                                <div className="py-2 px-4 w-100 border-bottom d-lg-block sticky-top bg-white">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="position-relative">
                                            <img 
                                            src="" 
                                            className="rounded-circle mx-2"
                                            alt={user}
                                            width="40"
                                            height="40"
                                            />
                                        </div>

                                        <div className="flex-grow-1">
                                            <strong>Logged in as {user}</strong>
                                        </div>

                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    {!user &&(
                    <NewChatUser newUser={newUser} handleChange={handleChange} logNewUser={logNewUser} />)
                    }

                </div>
            </main>
        </div>
    )
}

export default GlobalChat
