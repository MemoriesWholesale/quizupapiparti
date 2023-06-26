import { login } from "../src/lib/apiwrapper"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import User from "../src/types/user"
import React from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    LoginUser: (user:User)=>void
}

export default function Login({LoginUser}: Props) {

    const navigate = useNavigate();
    const [user,setUser] = useState<User>({email:'',first_name:'',last_name:'',password:''})
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const resp = await login(user.email, user.password)
        if (resp.error){
            console.log('error')
        } else {
            localStorage.setItem('token', resp.data?.token as string)
            localStorage.setItem('tokenExp', resp.data?.expiration as string)
            const token = localStorage.getItem('token')
            user.token=token       
            LoginUser(user)
            navigate('/');
        }
    }

  return (
    <>
        <Form onSubmit={handleFormSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control name='email' type = 'email' value={user.email} onChange={handleInputChange} />
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' value={user.password} onChange={handleInputChange} />
            <Button variant='outline-primary' type='submit' className='w-100 mt-3'>Log In</Button>
        </Form>
    </>
  )
}