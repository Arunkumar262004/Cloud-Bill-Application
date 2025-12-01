import React from "react";

const Register_page = () =>{

var user_name  =  JSON.parse(localStorage.getItem('user'))
    return(
        <div className="container p-5">
            <p className="text-primary">Welcome To dashboard page  {user_name?.value?.name}</p>
            
        </div>
    )
}

export default Register_page;