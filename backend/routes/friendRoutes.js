import express from 'express';
import Friend from '../models/friend.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const friends = await Friend.find();
        console.log("Fetched friends:", friends)

        if(!friends)
            return res.status(404).json({message: "No friends found"});
        res.status(200).json(friends);
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({ message: 'Error fetching friends'})
    }
})

export default router;