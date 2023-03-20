import React from 'react'
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import env from './environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const [toggle,setToggle]=useState(false)
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
  setToggle(true)
  let res = await axios.post(`${env.apiUrl}/users/login-user`,{
    email ,
    password ,
  })
  setToggle(false)
  if(res.data.statusCode === 200){
    setToggle(false)
    sessionStorage.setItem('token',res.data.token)
    sessionStorage.setItem('role',res.data.user.role)
    sessionStorage.setItem('email',res.data.user.email)
    sessionStorage.setItem('isvalid',res.data.user.isvalid)
    sessionStorage.setItem('isLoggedIn',"true")
    sessionStorage.setItem('isSignedIn',true)
    navigate('/list-queries')
  }
}

  return (

<section className="login-wrapper">
  <div className="px-4 py-5 px-md-5 text-center text-lg-start" >
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            The best platform <br />
            <span className="text-primary">for your queries</span>
          </h1>
        
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form>
                <h5 className='mb-4'>Enter details to login</h5>
                <div className="form-outline mb-4">
                  <Form.Control type="email" placeholder="Enter email" value={email} 
                   onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="form-outline mb-4">
                  <Form.Control type="password" placeholder="Password" 
                  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                  </div>

                <button type="submit" className="btn btn-primary mb-4" onClick={(e)=>handleLogin(e)}>
                  Submit
                </button>

                <div className="text-center">
                  <p>Dont have account ? </p>
                  <button type="submit" className="btn btn-primary mb-4" onClick={() => navigate('/')}>
                  Sign up
                </button>
                </div>
              </form>
              { toggle ? <Spinner animation="border" variant="primary" />:<></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
