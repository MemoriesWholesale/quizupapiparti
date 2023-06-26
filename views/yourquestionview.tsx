import { useState,useEffect } from "react"
import { getYourQuestions } from "../src/lib/apiwrapper"
import QuestionList from "../src/types/questionsobj"
import User from "../src/types/user"
import Question from "../src/types/question"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"


type Props = {currentUser:User|null,
            selectQuestion:(question:Question)=>void}

export default function Yourquestionview({ currentUser,selectQuestion }: Props) {
    const [questions,setQuestions] = useState<QuestionList["questions"]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await getYourQuestions(currentUser?.token!)
          if(resp.data){
            setQuestions(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[])
  return (
    <>
    <ul>
      {questions.map((q)=><li key={q.id}>{q.question}&nbsp;{q.answer} &nbsp;
      <Button onClick={(e)=>{e.preventDefault();selectQuestion(q);navigate('/editquestion')}}>Edit</Button>
      <Button onClick={(e)=>{e.preventDefault();selectQuestion(q);navigate('/deletequestion')}}>Delete</Button>
      </li>)}
    </ul>
    </>
  )
}


