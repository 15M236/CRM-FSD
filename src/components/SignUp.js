import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import env from './environment'
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignIn = async(e) => {
     e.preventDefault()

    let res = await axios.post(`${env.apiUrl}/users/signup`,{
      firstName,
      lastName,
      email,
      password,
    })
    console.log(res)
    if(res.data.statusCode===200)
    {
      sessionStorage.setItem('isSignedIn',true)
      navigate('/login')
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
                <h5 className='mb-4'>Enter details to create account</h5>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <Form.Control type="text" placeholder="Enter First Name" 
                    value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <Form.Control type="text" placeholder="Enter Last Name" 
                      value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                  </div>
                </div>

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

                <Button type="submit" className="btn btn-primary mb-4" variant="outlined"
                onClick={(e)=>handleSignIn(e)}>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
