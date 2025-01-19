import axios from "axios";
import { describe, expect, it } from "vitest";

const BACKEND_URL = "http://localhost:8080"


describe('admin event endpoints',() => {
    it('create an event', async () => {
        const respones = await axios.post(`${BACKEND_URL}/api/v1/admin/event`,{
            name: 'event name',
            description: "event description",
            date: new Date(),
            time: new Date().getTime(),
            address: 'some address',
            host: 'samay raina',
            ticketPrice: '1000'
        },{
           headers: {
                Authorization: "auth token"
           } 
        })
        expect(respones.status).toBe(200)
    })

    it('update event', async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/admin/event`,{
            name: 'new title of event',
            time: "10AM",
            ticketPrice: "1250"
        },{
            headers: {
                Authorization: "auth token"
            }
        })

        expect(response.status).toBe(200)
    })

    it('delete event', async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/admin/event?eventId=123`,{
            headers: {
                Authorization: 'auth token'
            }
        })
        expect(response.status).toBe(200)
    })
})