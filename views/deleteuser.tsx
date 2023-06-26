import User from '../src/types/user'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../src/lib/apiwrapper'

type Props = {currentUser:User|null,
            logoutUser:()=>void}

export default function Deleteuser({currentUser,logoutUser}: Props) {
    const navigate = useNavigate()
  return (
    <div>Are you sure you want to delete your account? This action cannot be undone!
        <p></p>
        <Button onClick ={(e)=>{e.preventDefault();deleteUser(currentUser!.token!);logoutUser();navigate('/')}}>Yes, Delete</Button>
        &nbsp;
        <Button onClick={(e)=>{e.preventDefault();navigate('/youraccount')}}>No, Go Back</Button>
    </div>
  )
}