import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerApi,loginApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'


function Auth() {

    const [user,setUser]=useState({
        email:"",username:"",password:""
    })

    const [state, setState] = useState(false)

    const nav=useNavigate()

    const changeState=()=>{
        setState(!state)
    }

    const handleRegister=async()=>{
        console.log(user)
        const {username,email,password}=user
        if(!username || !email || !password){
            toast.warning("Enter Valid Inputs!!")
        }
        else{
            const res=await registerApi(user)
            console.log(res)
            if(res.status==200){
                toast.success("Registration Successfull!!")
                changeState()
                setUser({
                    email:"",username:"",password:""  
                })
            }
            else{
                toast.error("Registration Failed!!")
            }
        }
    }

    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.warning("Enter Valid Inputs!!")
        }
        else{
            const res=await loginApi({email,password})
            if(res.status==200){
                console.log(res)
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("uname",res.data.username)
                toast.success("Login Successfull!!")
                setUser({
                    email:"",username:"",password:""  
                })
                nav('/dash')

            }
            else{
                toast.error("Login Failed!!")
                console.log(res)

            }
        }
    }

    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='w-75 border shadow bg-light p-2'>
                    <Row>
                        <Col>
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--select-an-account-join-the-forum-password-digital-marketing-pack-business-illustrations-8333958.png?f=webp"
                                className='img-fluid' alt="" />
                        </Col>
                        <Col className='d-flex flex-column justify-content-center'>
                            {
                                state ?
                                    <h3>Registration</h3>
                                    :
                                    <h3>Login</h3>
                            }
                            <input type="email" placeholder='Email ID' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} name='email' className="form-control mb-3" />
                            {
                                state &&
                                <input type="text" placeholder='Username' value={user.user} onChange={(e)=>setUser({...user,username:e.target.value})} name='uname' className="form-control mb-3" />

                            }
                            <input type="password" placeholder='Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} name='pswd' className="form-control mb-3" />
                            <div className='d-flex justify-content-between'>
                                {
                                    state ?
                                        <button className='btn btn-info' onClick={handleRegister}>Register</button>
                                        :
                                        <button className='btn btn-success' onClick={handleLogin}>Login</button>

                                }
                                <button className='btn btn-link' onClick={changeState}>
                                    {
                                        state ?
                                            <span>Already a user?</span>
                                            :
                                            <span>New User?</span>
                                }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth