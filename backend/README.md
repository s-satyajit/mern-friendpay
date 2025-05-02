# FriendPay Backend

Express.js backend server for the FriendPay application.

## Features

- RESTful API endpoints
- MongoDB integration with Mongoose
- Friend and Transaction models
- Automatic data seeding
- CORS enabled

## API Endpoints

### Friends
- `GET /friends` - Get all friends

### Transactions
- `GET /transactions` - Get all transactions
- `POST /transactions` - Create new transaction

## Environment Variables

Create a `.env` file:
```bash
DB_URI=your_mongodb_connection_string
PORT=8080
```

## Project Structure

```
backend/
├── connectDB/    # Database connection setup
├── data/         # Seed data
├── models/       # Mongoose models
├── routes/       # API routes
└── seed/         # Database seeding scripts
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server