import Questionview from "../views/questionview"
import Userreg from "../views/userreg"
import { Route, Routes } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navigation from "../components/navigation"
import { useState } from "react"
import User from "./types/user"

type Props = {}

export default function App({}: Props) {
  const [newUser,setNewUser] = useState<(User|null)>(null)



  return (
    <>
    <Navigation/>
    <Container>
      <Routes>
        <Route path = '/allquestions' element={<Questionview/>}/>
        <Route path = '/userreg' element={<Userreg/>}/>
      </Routes>
    </Container>
    </>
  )
}