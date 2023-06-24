import axios, { AxiosError, AxiosResponse } from 'axios';
import QuestionList from '../types/questionsobj';
import User from '../types/user';


const base:string = 'https://cae-bookstore.herokuapp.com/'
const userregendpoint:string = '/user'
const allquestionsendpoint:string = '/question/all'

const apiClientNoAuth = () => axios.create({
    baseURL: base
});

type APIResponse<T> = {
    error: string | AxiosError | undefined;
    data: T | undefined;
}

async function getAllQuestions():Promise <APIResponse<QuestionList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<QuestionList> = await apiClientNoAuth().get(allquestionsendpoint)
        data = resp.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
        
    }
    return {
        error,
        data
    }
}


async function register(newUser:User):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientNoAuth().post(userregendpoint,newUser)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}


export {
    getAllQuestions,
    register
}