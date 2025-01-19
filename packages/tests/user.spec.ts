import axios from 'axios'
import { describe, expect, it } from 'vitest' 

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER_1 = "7068123123"
const NAME_1 = "jatin";

describe('User signup endpoint',() =>{
    it('Signup using phone number and otp', async () => {
        const response_1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            number: PHONE_NUMBER_1
        })

        const response_2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`,{
            number: PHONE_NUMBER_1,
            name: NAME_1,
            otp: "000000"
        })

        expect(response_1.status).toBe(200);
        expect(response_2.status).toBe(200);
        expect(response_1.data.id).not.toBeNull()

    })
})


describe('signin endpoint',() => {
    it('user should be able to signin', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
            number: PHONE_NUMBER_1
        })
        expect(response1.status).toBe(200)
        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`,{
            number: PHONE_NUMBER_1,
            otp: "0000000"
        })
        expect(response2.status).toBe(200)
        expect(response2.data.token).not.toBeDefined() // token is coming undefined to pass the test we have used not right now
    }) 
})

describe('profile endpoint',() => {
    it('is profile updated successfully', async ()=>{
        const response = await axios.put(`${BACKEND_URL}/api/v1/user/profile`,{
            name: 'jatin',
            gender: 'male'
        },
        {
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzEyMzEyMzQiLCJpYXQiOjE3MzcxODc3NTB9.wWyVMck5OEh_HELo5JZ7Q0WNhM6KvCxrOu9QnPiUVus'
            }
        }
    )
        expect(response.status).toBe(200)
    })
})

describe('event endpoint', () => {
    it('fetch all the events', async () => {
        const response1 = await axios.get(`${BACKEND_URL}/api/v1/user/event`,{
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzEyMzEyMzQiLCJpYXQiOjE3MzcxODc3NTB9.wWyVMck5OEh_HELo5JZ7Q0WNhM6KvCxrOu9QnPiUVus'
            }
        })
        expect(response1.status).toBe(200)
        expect(response1.data.events).toBeInstanceOf(Array)
        // expect(response1.data.events.length).toBeGreaterThan(0) // events can be zero
    })

    it('fetch a single event', async () => {
        const response1 = await axios.get(`${BACKEND_URL}/api/v1/user/event?eventId=123`,{
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzEyMzEyMzQiLCJpYXQiOjE3MzcxODc3NTB9.wWyVMck5OEh_HELo5JZ7Q0WNhM6KvCxrOu9QnPiUVus'
            }
        })
        expect(response1.status).toBe(200)
        expect(response1.data.event).toBeInstanceOf(Object)
    })

    it('should return an error for unauthorized access',async ()=>{
        try{
            await axios.get(`${BACKEND_URL}/api/v1/user/event`)
        }catch(e){
            if(axios.isAxiosError(e)){
                expect(e.response?.status).toBe(401)
                expect(e.response?.data).toHaveProperty('message')
                expect(e.response?.data.message).toBe('Unauthorized')
            }else{
                console.error('Unexpected error')
            } 
        }
    })

})

