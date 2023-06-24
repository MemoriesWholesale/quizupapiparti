import { Nav,NavLink,Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

type Props = {}

export default function Navigation({}: Props) {
  return (
    <>
    <Navbar bg='info' data-bs-theme='info'>
        <Container>
            <Navbar.Brand to = '/' as = {Link}>QuizUp</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink to = '/allquestions' as={Link}>All Questions</NavLink>
                <NavLink to = '/userreg' as={Link}>Register</NavLink>
            </Nav>
        </Container>
    </Navbar>
    </>
  )
}