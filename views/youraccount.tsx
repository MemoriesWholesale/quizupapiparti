import User from '../src/types/user'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

type Props = {currentUser:User|null}

export default function Youraccount({currentUser}: Props) {
    const navigate = useNavigate()
  return (
    <>
        <ul>
        <li>Email:&nbsp;{currentUser?.email}</li>
        <li>First Name:&nbsp;{currentUser?.first_name}</li>
        <li>Last Name:&nbsp;{currentUser?.last_name}</li>
        <li>Password:&nbsp;{currentUser?.password}</li>
        </ul>
        <Button onClick={(e)=>{e.preventDefault();navigate('/edituser')}}>Edit</Button>
        &nbsp;
        <Button onClick={(e)=>{e.preventDefault();navigate('/deleteuser')}}>Delete</Button>
    </>
  )
}