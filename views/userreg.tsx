import { useState } from "react"
import Button from "react-bootstrap/Button"
import User from "../src/types/user"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import { register } from "../src/lib/apiwrapper"
import { login } from "../src/lib/apiwrapper"

type Props = {loginUser:(user:User)=>void}


export default function Userreg({loginUser}: Props) {
    const [newUser,setNewUser] = useState<User>({email:'',first_name:'',last_name:'',password:''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await register(newUser)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`${newUser.first_name} ${newUser.last_name} now has a quizup account!`)
        console.log(resp.data!)
        const response = await login(newUser.email, newUser.password)
        if (response.error){
            console.log('error')
        } else {
            localStorage.setItem('token', response.data?.token as string)
            const token = localStorage.getItem('token')
            newUser.token=token       
            loginUser(newUser)
            navigate('/');
        }


        // loginUser(resp.data!)
        // navigate('/')
      }
    }



  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>First Name</Form.Label>
      <Form.Control value={newUser.first_name} name='first_name' onChange={handleInputChange}></Form.Control>
      <Form.Label>Last Name</Form.Label>
      <Form.Control value={newUser.last_name} name='last_name' onChange={handleInputChange}></Form.Control>
      <Form.Label>Email</Form.Label>
      <Form.Control value={newUser.email} name='email' type='email' onChange={handleInputChange}></Form.Control>
      <Form.Label>Password</Form.Label>
      <Form.Control value={newUser.password} name='password' type='password' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Register</Button>
    </Form>
    </>
  )
}