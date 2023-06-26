import User from '../src/types/user'
import Question from '../src/types/question'
import { useNavigate } from 'react-router-dom'
import { deleteQuestion } from '../src/lib/apiwrapper'
import Button from 'react-bootstrap/Button'

type Props = {currentUser:User|null,
            currentQuestion:Question|null}

export default function Deletequestion({currentUser,currentQuestion}: Props) {
    const navigate = useNavigate()
  return (<>
  <h3>Are you sure you want to delete this question?</h3>
  {currentQuestion?.question} &nbsp;
  {currentQuestion?.answer}
  <Button onClick={(e)=>{e.preventDefault();deleteQuestion(currentQuestion!,currentUser!.token!);navigate('/yourquestions')}}>Yes</Button>
  <Button onClick={(e)=>{e.preventDefault();navigate('/yourquestions')}}>No</Button>
  </>
  )
}