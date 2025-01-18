import axios from 'axios'
import { describe, expect, it, test } from 'vitest' 

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
