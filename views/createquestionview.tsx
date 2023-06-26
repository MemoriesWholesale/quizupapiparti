import { useState } from "react"
import { createQuestion } from "../src/lib/apiwrapper"
import Question from "../src/types/question"
import User from "../src/types/user"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import React from "react"

type Props = {currentUser:User|null}

export default function Createquestionview({currentUser}: Props) {
    const [newQuestion,setNewQuestion] = useState<Question>({answer:'',question:''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNewQuestion({...newQuestion,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await createQuestion(newQuestion,currentUser?.token!)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`Your question has been created!`)
        navigate('/yourquestions')
      }
    }

  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Question</Form.Label>
      <Form.Control value={newQuestion.question} name='question' onChange={handleInputChange}></Form.Control>
      <Form.Label>Answer</Form.Label>
      <Form.Control value={newQuestion.answer} name='answer' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Create Question</Button>
    </Form>

    </>
  )
}