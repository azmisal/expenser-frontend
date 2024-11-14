import React, { useState } from 'react'
import "./Styles/Login.css"
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";


const Login = () => {

  const [show , setShow] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = () => {
      alert("hii");
  }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className='Login'>
      <div className="LoginBox">
        <h1 className='LogHead'>Login</h1>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <input type="text" name='username' value={user.username} onChange={handleChange} placeholder='Username' />
          <div className="showpass">
            <input type={show ? "text" : "password"} name='password' value={user.password} onChange={handleChange} placeholder='Password' className='password' />
            <div className="eyeIcon" onClick={() => setShow(!show)}>
              {show ? <IoEyeSharp className='showicon' /> : <BsEyeSlashFill className='showicon' />}

            </div>
          </div>
          <div className="SignupBut">
            <button type='submit'>SignIn</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login