import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectDB/conn.js';
// import transactionRouter from './routes/transactionRoutes.js';
import friendRouter from './routes/friendRoutes.js'
import seedFriends from './seed/seedFriends.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const initialize = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully")

        try {
            await seedFriends();
            console.log("Friends data seeded successfully")

        } catch (error) {
            console.error("Error seeding friends data:", error)
        }
        // app.use('/api/transactions', transactionRouter);
        app.use('/friends', friendRouter)
        
        const port = process.env.PORT || 3000;
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.error("Server intialialization failed:", error)
    }
}

initialize();

