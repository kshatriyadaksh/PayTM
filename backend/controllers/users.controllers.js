import { User, Account } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let registerUser = async (req, res) => {
    try {
        let { fname, lname, email, password } = req.body;

        let isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        let user = new User({
            fname,
            lname,
            email,
            password,
        });

        await user.save();

        // 👇 Create an Account linked to this user
        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000 // you can set initial balance here
        });

        res.status(200).json({ message: "New user created successfully" });

    } catch (error) {
        console.log("Error in registering the user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

let loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
       
       
        const isPasswordValid = password === user.password; // For simplicity, using plain text comparison. In production, use bcrypt.
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1h" }
        );
        
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error in logging in the user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
let bulkUserSearch = async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { fname: { $regex: filter, $options: "i" } },
                { lname: { $regex: filter, $options: "i" } }
            ]
        });

        res.status(200).json({
            users: users.map(user => ({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            }))
        });
    } catch (error) {
        console.log("Error in bulk user search: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export { registerUser, loginUser, bulkUserSearch };