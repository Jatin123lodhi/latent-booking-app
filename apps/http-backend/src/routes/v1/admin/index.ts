import express, { Router } from "express"
const router: Router = express.Router()

// write an endpoint for admin to signin
router.post(`/signin`, async (req, res) => {
    // what the admin will send to signin, is it same phoneNumber ?

})

// write an endpoint to create an event
// think about do we need to create adminAuthMiddleware seprately?
router.post('/event', async (req, res) => {
    const { title, description, date, time ,host, address, ticketPrice } = req.body || {}
    try{
        // db call - await prismaClient.event.create({data:req.body})
        const response  = {} // newly created record
        res.status(200).json({message: "Event created successfully!"})
    }catch(e){
        res.status(500).json({message: "Something went wrong"})
    }
})

// write an endpoint to update an event
router.put('/event', async (req, res) => {
    const { title, description, date, time ,performer, address, ticketPrice } = req.body || {}
    try{
        // db call - await prismaClient.event.update({data:req.body})
        const response  = {} 
        res.status(200).json({message: "Event updated successfully!"})
    }catch(e){
        res.status(500).json({message: "Something went wrong"})
    }
})

// write an endpoint to delete the event
router.delete('/event', async (req, res) => {
    const eventId = req.query.eventId || ''
    try{
        if(!eventId){
            res.status(400).json({message: "Invalid event id"})
            return
        }
        // db call - await prismaClient.event.delete({where:{id: 123}})
        const response  = {} 
        res.status(200).json({message: "Event deleted successfully!"})
    }catch(e){
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router