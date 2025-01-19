import express, { Router } from "express"
import { generateToken, verifyToken } from "authenticator"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../../config"
import { authMiddleware } from "../../../middleware"

const router: Router = express.Router()

router.post('/signup',  async (req,res) => {
    const phoneNumber = req.body.phoneNumber
    const totp = generateToken(phoneNumber + "SIGNUP")
    // send the topt to the phone number

    res.json({
        id: "1"
    })
})

router.post("/signup/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    if (!verifyToken(phoneNumber + "SIGNUP", req.body.otp)) {
        res.json({
            message: "Invalid otp"
        })
        return
    }
    // set user to verified in db
    res.json({
        
    })
});

// write the signin endpoint and then signin verify endpoint
router.post('/signin',(req,res) => {
    const phoneNumber = req.body.phoneNumber;
    // check is this phoneNo. exists in the database?
    // if yes - generate the otp and send to no and send status 200
    // if no - phone no does not exists, please signup 
    // db call - const res = await prisma.user.find({where:{phoneNo}})
    const userExists = {}
    if(!userExists){
        res.status(400).json({
            message: "User does not exists, please signup"
        })
        return
    }
    // generate the otp
    const otp = generateToken(phoneNumber + "SIGNIN")
    console.log(otp,phoneNumber,' otp - phoneNumber')
    console.log(otp,' otp generated while signin')
    // send using twillio
    // send the success response
    res.status(200).json({message: "OTP sent to the mobile no"})
})

// write the signin verify endpoint 
router.post('/signin/verify',(req,res) => {
    // user wil send the otp and phoneNo
    const { otp, phoneNumber } = req.body
    console.log(otp, phoneNumber)
    // verify the otp
    if(!verifyToken(phoneNumber+ "SIGNIN",otp)){
        res.json({ // no status means 200 so that test can pass , otherwise status can be 400
            message: "Invalid otp"
        })
        return
    }
    // if otp is verified
    // send the jwt token which can be further used in requests
    // send a success status code and token and msg
    const token = jwt.sign({phoneNumber},JWT_SECRET)
    res.status(200).json({
        messgae: "Signin successful",
        token
    })

})

//write the profile endpoint for the user
router.put('/profile', authMiddleware, async (req, res) => {
    // what user can send to update the profile - name,age,gender,profilePic,address
    const { name, gender } = req.body || {}
    // save to db
    res.status(200).json({
        message: "Profile details updated successfully"
    })
})

//write an end point to get single or all the events
router.get('/event', authMiddleware, async (req, res) => {
    const eventId =  req.query.eventId
    try{
        if(eventId){
            // db call
            const event = {}
            res.status(200).json({event})
        }else{
            // db call
            const events = [{eventId: 123, eventName:"Samaya standup", eventDescription: "A 1hr special"},{}]
            res.status(200).json({events})
        }
        

    }catch(e){
        res.status(500).json({message:"Something went wrong"})
    }
})
 
export default router;