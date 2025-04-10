import { Account } from "../model/user.js";
import mongoose from "mongoose";
import { verifyToken } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/balance", verifyToken, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.status(200).json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/transfer", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;
        
        console.log(req.userId)
        if (!amount || !to) {
            return res.status(400).json({ message: "Amount and recipient ID are required" });
        }

        const sender = await Account.findOne({ userId: req.userId })
        console.log("this is sender",sender)
        if (!sender || sender.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const receiver = await Account.findOne({ userId: to })
        console.log("this is receiver",receiver)

        if (!receiver) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } })

        
        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        console.error("Error in transfer:");
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});

export default router;