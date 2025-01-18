import express, { Router } from "express"
import { generateToken, verifyToken } from "authenticator"

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
            message: "Invalid token"
        })
        return
    }
    // set user to verified in db
    res.json({
        
    })

});

export default router;