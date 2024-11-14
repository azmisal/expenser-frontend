import React, { useState } from 'react'
import "./Styles/Signup.css"
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";


const Signup = () => {

    const [show , setShow] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        limit:'',
        password: ''
    });
    const [confrm, setConfirm] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === "limit" ? Number(value) : value  
        }));
    }
    

    const handleCnfrmChange = () => {
        setConfirm(user.password);
    }

    const handleSubmit = () => {
        alert("hii");
    }

    return (
        <div className='Signup'>
            <div className="signupBox">
                <h1 className='SignHead'>Signup</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name='username' value={user.username} onChange={handleChange} placeholder='Username' />
                    <input type="email" name='email' value={user.email} onChange={handleChange} placeholder='Email' />
                    <input type="number" placeholder='Expense Limit' name='limit' value={user.limit} onChange={handleChange}/>
                    <div className="showpass">
                        <input type={show? "text" : "password"} name='password' value={user.password} onChange={handleChange} placeholder='Password' className='password' />
                        <div className="eyeIcon" onClick={()=>setShow(!show)}>
                            {show? <IoEyeSharp className='showicon' />  : <BsEyeSlashFill className='showicon' />}

                        </div>
                    </div>
                    <input type="text" placeholder='Confirm Password' value={confrm} onChange={handleCnfrmChange} />
                    <div className="SignupBut">
                        <button type='submit'>Signup</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup