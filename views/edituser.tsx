import React from 'react'
import User from '../src/types/user'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { editUser } from '../src/lib/apiwrapper'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Props = {currentUser:User|null}

export default function Edituser({currentUser}: Props) {
    const [user,setUser] = useState<User>({email:currentUser?.email||'',first_name:currentUser?.first_name||'',last_name:currentUser?.last_name||'',password:currentUser?.password||''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setUser({...user,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await editUser(currentUser!.token!,user)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`Your account has been edited!`)
        navigate('/youraccount')
      }
    }

  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Email {currentUser?.email}</Form.Label>
      <Form.Control value={user.email} name='email' type='email' onChange={handleInputChange}></Form.Control>
      <Form.Label>First Name {currentUser?.first_name}</Form.Label>
      <Form.Control value={user.first_name} name='first_name' onChange={handleInputChange}></Form.Control>
      <Form.Label>Last Name {currentUser?.last_name}</Form.Label>
      <Form.Control value={user.last_name} name='last_name' onChange={handleInputChange}></Form.Control>
      <Form.Label>Password {currentUser?.password}</Form.Label>
      <Form.Control value={user.password} name='password' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Edit Account</Button>
    </Form>

    </>
  )
}