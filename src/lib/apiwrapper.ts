import axios, { AxiosError, AxiosResponse } from 'axios';
import QuestionList from '../types/questionsobj';
import User from '../types/user';
import Question from '../types/question';


const base:string = 'https://cae-bookstore.herokuapp.com/'
const userregendpoint:string = '/user'
const loginendpoint:string = '/login'
const allquestionsendpoint:string = '/question/all'
const yourquestionsendpoint:string = '/question'


const apiClientNoAuth = () => axios.create({
    baseURL: base
});

const apiClientBasic = (email:string,password:string)=>axios.create({
    baseURL: base,
    headers: {
        Authorization: "Basic " + btoa(email + ":" + password)

    }
})

const apiClientToken = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: "Bearer " + token
    }
})

type APIResponse<T> = {
    error: string | AxiosError | undefined;
    data: T | undefined
}

type Token = {
    token: string;
    expiration: string
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

async function getYourQuestions(token:string):Promise <APIResponse<QuestionList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<QuestionList> = await apiClientToken(token).get(yourquestionsendpoint)
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

async function createQuestion(question:Question,token:string):Promise<APIResponse<Question>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Question> = await apiClientToken(token).post(yourquestionsendpoint,question)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function editQuestion(currentquestion:Question,newquestion:Question,token:string):Promise<APIResponse<Question>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Question> = await apiClientToken(token).put(yourquestionsendpoint+'/'+currentquestion.id!.toString(),newquestion)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function deleteQuestion(question:Question,token:string):Promise<APIResponse<Question>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Question> = await apiClientToken(token).delete(yourquestionsendpoint+'/'+question.id!.toString())
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
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

async function login(email:string, password:string):Promise<APIResponse<Token>>{
    let error;
    let data;
    try{
        const resp: AxiosResponse<Token> = await apiClientBasic(email,password).get(loginendpoint)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function editUser(token:string,newUser:User):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).put(userregendpoint,newUser)
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

async function deleteUser(token:string):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).delete(userregendpoint)
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
    getYourQuestions,
    getAllQuestions,
    register,
    login,
    createQuestion,
    editQuestion,
    deleteQuestion,
    editUser,
    deleteUser
}