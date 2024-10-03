import {request} from "../utils/request.js";

export function getQuestions() {
    return request.get('/questions')
}

export function addQuestion(data) {
    return request.post('/questions', data)
}

export function deleteQuestion(id) {
    return request.delete(`/questions/${id}`)
}

export function updateQuestion(id, data) {
    return request.put(`/questions/${id}`, data)
}