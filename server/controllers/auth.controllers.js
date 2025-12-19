import User from "../models/user.model.js";
import genToken from '../utils/token.js';
import bcrypt from 'bcryptjs'
import { sendOtpMail } from "../utils/mail.js";


// Signup controller
export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already exist." })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters." })
        }
        if (mobile.length < 10) {
            return res.status(400).json({ message: "mobile no must be at least 10 digits." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json(`sign up error ${error}`)
    }
}

//Signin controller
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect Password" })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(`sign In error ${error}`)
    }
}


//signOut controller
export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "log out successfully" })
    } catch (error) {
        return res.status(500).json(`sign out error ${error}`)
    }
}


// send otp controller
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        //generate otp
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        //save user
        await user.save()
        //send mail to user
        await sendOtpMail(email, otp)

        //respone
        return res.status(200).json({ message: "otp sent successfully" })
    } catch (error) {
        return res.status(500).json(`send otp error ${error}`)
    }
}