import { useState,useEffect } from "react"
import { getAllQuestions } from "../src/lib/apiwrapper"
import QuestionList from "../src/types/questionsobj"


type Props = {}

export default function Questionview({}: Props) {
    const [questions,setQuestions] = useState<QuestionList["questions"]>([])
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await getAllQuestions()
          if(resp.data){
            setQuestions(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[])
  return (
    <>
    <ul>
      {questions.map((q)=><li key={q.id}>{q.question}</li>)}
    </ul>
    </>
  )
}