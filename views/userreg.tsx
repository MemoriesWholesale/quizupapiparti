import { useState,useEffect } from "react"
import Button from "react-bootstrap/Button"
import User from "../src/types/user"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import { register } from "../src/lib/apiwrapper"

type Props = {}


export default function Userreg({}: Props) {
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
        console.log(resp.data?.first_name+' '+resp.data?.last_name+' now has a quizup account!')
        // loginUser(resp.data!)
        navigate('/')
      }
    }


    // useEffect(()=>{
    //     console.log('userreg')
    // },[])
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