# FriendPay - Money Management App

A full-stack MERN application to manage money transactions between friends with due date tracking and visual analytics.

## Features

- Track money lent to and borrowed from friends
- Automatic due date calculation based on friend's repayment period
- Weekly financial outlook with transaction summaries
- Visual analytics with charts and statistics
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Shadcn UI, TailwindCSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/s-satyajit/mern-friendpay.git
cd mern-friendpay
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# In backend/.env
DB_URI=your_mongodb_connection_string
PORT=8080
```

4. Run the application:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm run dev
```

## Project Structure

```
mern-friendpay/
├── backend/         # Backend server code
├── frontend/        # Frontend React application
└── README.md        # Main documentation
```

## Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE.md)
- [Changelog](CHANGELOG.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request