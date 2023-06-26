import { useState } from "react"
import User from '../src/types/user'
import { editQuestion } from '../src/lib/apiwrapper'
import Question from "../src/types/question"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

type Props = {currentUser:User|null,
                currentQuestion:Question|null}

export default function Editquestion({currentUser,currentQuestion}: Props) {
    const [newQuestion,setNewQuestion] = useState<Question>({answer:currentQuestion?.answer||'',question:currentQuestion?.question||''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNewQuestion({...newQuestion,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await editQuestion(currentQuestion!,newQuestion,currentUser?.token!)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`Your question has been edited!`)
        navigate('/yourquestions')
      }
    }

  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Question {currentQuestion?.question}</Form.Label>
      <Form.Control value={newQuestion.question} name='question' onChange={handleInputChange}></Form.Control>
      <Form.Label>Answer {currentQuestion?.answer}</Form.Label>
      <Form.Control value={newQuestion.answer} name='answer' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Edit Question</Button>
    </Form>

    </>
  )
}