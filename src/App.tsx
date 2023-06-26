import Allquestionview from "../views/allquestionview"
import Yourquestionview from "../views/yourquestionview"
import Createquestion from "../views/createquestionview"
import Editquestion from "../views/editquestion"
import Deletequestion from "../views/deletequestion"
import Userreg from "../views/userreg"
import Login from "../views/login"
import Youraccount from "../views/youraccount"
import Edituser from "../views/edituser"
import Deleteuser from "../views/deleteuser"
import { Route, Routes } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navigation from "../components/navigation"
import Homepage from "../views/homepage"
import User from "./types/user"
import Question from "./types/question"
import { useState,useEffect } from "react"


type Props = {}

export default function App({}: Props) {


  const [isLoggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false)
  const [currentUser,setCurrentUser] = useState<User|null>(null)
  const loginUser = (user:User): void => {
    setLoggedIn(true);
    setCurrentUser(user);
}
  const logoutUser = (): void=>{
    setLoggedIn(false);
    setCurrentUser(null)
  }
  const [currentQuestion,setCurrentQuestion] = useState<Question|null>(null)
  const selectQuestion = (question:Question): void => {
    setCurrentQuestion(question)
  }
// useEffect(() => {
//   const getCurrentUser = async() => {
//       const token = currentUser?.token
//   }
//   if (isLoggedIn){
//       getCurrentUser()
//   }
// }, [])

  return (
    <>
    <Navigation isLoggedin={isLoggedIn} logoutUser ={logoutUser}/>
    <Container>
      <Routes>
        <Route path = '/' element = {<Homepage/>}></Route>
        <Route path = '/youraccount' element = {<Youraccount currentUser={currentUser}/>}></Route>
        <Route path = '/edituser' element = {<Edituser currentUser={currentUser}/>}></Route>
        <Route path = '/deleteuser' element = {<Deleteuser currentUser={currentUser} logoutUser ={logoutUser}/>}></Route>
        <Route path = '/allquestions' element={<Allquestionview/>}/>
        <Route path = '/yourquestions' element={<Yourquestionview currentUser={currentUser} selectQuestion={selectQuestion}/>}/>
        <Route path = '/userreg' element={<Userreg loginUser={loginUser}/>}/>
        <Route path = '/login' element={<Login LoginUser={loginUser}/>}/>
        <Route path = '/createquestion' element={<Createquestion currentUser={currentUser}/>}/>
        <Route path = '/editquestion' element={<Editquestion currentUser={currentUser} currentQuestion={currentQuestion}/>}/>
        <Route path = '/deletequestion' element={<Deletequestion currentUser={currentUser} currentQuestion={currentQuestion}/>}/>
      </Routes>
    </Container>
    </>
  )
}