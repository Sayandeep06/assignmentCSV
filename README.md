# CSV Sales Data Uploader & Dynamic Summary Dashboard

A full-stack web application that allows users to upload CSV files containing sales data, processes the uploaded data to compute summary statistics, and displays all processed summaries in a dashboard interface.

## 📋 Features

- **CSV File Upload**: Upload sales data in CSV format
- **Dynamic Processing**: Automatic computation of summary statistics
- **Real-time Dashboard**: View all processed summaries in an interactive interface
- **In-memory Storage**: Summaries are stored temporarily for the current server session
- **Full-stack Architecture**: Separate backend API and frontend application

## 🏗️ Project Structure

```
├── backend/          # Express.js + TypeScript API server
├── frontend/         # React + TypeScript frontend app
└── README.md         # Project overview and instructions
```

## 🚀 Quick Start

### Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm run start
```

### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm run start
```

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

### Frontend
- **React** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Modern build tools** - For development and production builds

## 💡 Usage

1. **Start the Backend**: Run the backend server using the setup instructions above
2. **Start the Frontend**: Run the frontend application using the setup instructions above
3. **Upload CSV**: Use the web interface to upload your sales data CSV files
4. **View Dashboard**: Monitor processed summaries and statistics in real-time

## ⚠️ Important Notes

- **Session-based Storage**: All processed data and summaries are stored in-memory and will be lost when the server restarts
- **CSV Format**: Ensure your CSV files contain valid sales data with appropriate headers
- **Development vs Production**: Use development mode for testing and production mode for deployment


