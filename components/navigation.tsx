import { Nav,NavLink,Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

type Props = {isLoggedin:boolean,
            logoutUser:()=>void}

export default function Navigation({isLoggedin,logoutUser}: Props) {
  return (
    <>
    <Navbar bg='info' data-bs-theme='info'>
        <Container>
            <Navbar.Brand to = '/' as = {Link}>QuizUp</Navbar.Brand>
            <Nav className="me-auto">
                {isLoggedin?
                <>
                <NavLink to = '/allquestions' as={Link}>All Questions</NavLink>
                <NavLink to = '/yourquestions' as={Link}>Your Questions</NavLink>
                <NavLink to = '/createquestion' as={Link}>Create a Question</NavLink>
                <NavLink to = '/youraccount' as={Link}>Your Account</NavLink>
                <Button onClick={(e)=>{e.preventDefault();logoutUser()}}>Log Out</Button>
                </>:
                <>
                <NavLink to = '/userreg' as={Link}>Register</NavLink>
                <NavLink to = '/login' as={Link}>Log In</NavLink>
                </>}
            </Nav>
        </Container>
    </Navbar>
    </>
  )
}