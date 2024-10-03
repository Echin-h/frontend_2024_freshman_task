import axios from 'axios'

const request = axios.create({
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export {request}