import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import {io} from "socket.io-client";
import React,{useState} from 'react'

const GlobalChat = () => {

    const [newUser,setNewUser]=useState("");
    function handleChange({currentTarget: input}){
        setNewUser(input.value);
    }



  return (
    <div>
      <main className="content">
        <div className="container mt-3">
            <div className="card w-100 text-center border-white">
                <div className="row">

                    <div className="col-12">
                        <h5> Enter Username</h5>
                    </div>

                    <div className="col-4">
                    <div className="d-flex justify-content-center py-1">
                        <input 
                        type="text" 
                        name="username" 
                        value={newUser}
                        className="form-control"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={()=>this.handleChange(e)}
                        />
                    </div>
                    </div>

                    

                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default GlobalChat
