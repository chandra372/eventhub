# EventHub — College Event Management System 🎯

A centralized event management platform designed specifically for engineering colleges to streamline event registration, participation tracking, and certificate generation.

## ✨ Features

- **🎓 Student Portal**: Browse events, register for participation, and download certificates
- **👨‍💼 Admin Dashboard**: Create events, manage registrations, view analytics, and generate reports
- **📄 Smart Certificates**: Automatic PDF certificate generation with participation/achievement recognition
- **🏆 Winner Tracking**: Track and recognize 1st, 2nd, and 3rd place winners with medals
- **📊 Analytics & Reports**: Comprehensive event statistics and participant insights
- **🔐 Secure Authentication**: Role-based access control (Student/Admin)
- **📧 Email Notifications**: Simulated confirmation emails and reminders
- **🎨 Modern UI**: Responsive, animated dashboard with gradient aesthetic

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn
- SQLite3 (included with better-sqlite3)

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at **http://localhost:3000**

## 📋 Default Credentials

| Role   | Email                    | Password |
|--------|--------------------------|----------|
| Admin  | `admin@college.edu`      | `admin123` |
| Student 1 | `student1@college.edu` | `pass123` |
| Student 2 | `student2@college.edu` | `pass123` |

## 📁 Project Structure

```
├── server.js                 # Express server entry point
├── package.json              # Dependencies
├── db/
│   └── database.js           # SQLite database setup & schema
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── routes/
│   ├── auth.js               # Authentication endpoints
│   ├── events.js             # Event management routes
│   ├── registrations.js      # Registration routes
│   └── reports.js            # Reports & certificate generation
├── public/
│   ├── index.html            # Login page
│   ├── admin.html            # Admin dashboard
│   ├── student.html          # Student portal
│   ├── js/
│   │   ├── api.js            # HTTP client
│   │   ├── admin.js          # Admin UI logic
│   │   ├── student.js        # Student UI logic
│   │   ├── auth.js           # Auth helpers
│   │   └── bg-animation.js   # Background animations
│   └── css/
│       └── style.css         # Global styles
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` — User login
- `POST /api/auth/logout` — User logout

### Events (All users)
- `GET /api/events` — Get all events
- `GET /api/events/:id` — Get event details
- `POST /api/events` — Create event (Admin only)
- `PUT /api/events/:id` — Update event (Admin only)
- `DELETE /api/events/:id` — Delete event (Admin only)

### Registrations (Students)
- `POST /api/events/:id/register` — Register for event
- `DELETE /api/events/:id/register` — Unregister from event
- `GET /api/my-events` — Get student's registered events

### Reports & Certificates
- `GET /api/reports/summary` — System statistics (Admin only)
- `GET /api/reports/event/:id` — Event report (Admin only)
- `GET /api/certificate/:eventId` — Download participation certificate (PDF)
- `POST /api/reports/remind/:eventId` — Send reminders (Admin only)

## 🎯 Key Features Explained

### Certificate Generation
Students can download personalized PDF certificates after registering for events. The certificate includes:
- Student name and roll number
- Event details (date, venue)
- Unique certificate ID
- Special recognition for winners (1st/2nd/3rd place with medals)

To generate a certificate: Register for an event → Go to "My Registrations" → Click "📄 Certificate"

### Admin Controls
- Create and manage events
- View participant lists
- Track and award winners
- Generate comprehensive reports
- Send reminder notifications

### Student Experience
- Browse all available events
- One-click registration with college details
- Track registered events
- Download certificates immediately
- View event details and participant counts

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, CSS3 (with gradients & animations)
- **Backend**: Express.js
- **Database**: SQLite3 (better-sqlite3)
- **Authentication**: JWT (JSON Web Tokens)
- **PDF Generation**: PDFKit
- **Security**: bcryptjs for password hashing

## 📦 Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "better-sqlite3": "^11.7.0",
  "cors": "^2.8.5",
  "express": "^4.21.0",
  "jsonwebtoken": "^9.0.2",
  "pdfkit": "^0.15.0"
}
```

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT-based authentication with token expiry
- Role-based access control
- SQL injection prevention (parameterized queries)
- CORS enabled for controlled access

## 📊 Database Schema

### Users Table
- `id` (PK), `name`, `email`, `password_hash`, `role` (admin/student), `created_at`

### Events Table
- `id` (PK), `title`, `description`, `venue`, `event_date`, `status`, `creator_id` (FK), `created_at`

### Registrations Table
- `id` (PK), `event_id` (FK), `user_id` (FK), `student_name`, `college_name`, `roll_number`, `registered_at`

### Winners Table
- `id` (PK), `event_id` (FK), `user_id` (FK), `position` (1st/2nd/3rd)

## 🚀 Deployment

### Local Deployment
```bash
npm install
npm start
```

### Production Deployment
1. Set environment variables (JWT secret, database path)
2. Use a process manager (PM2)
3. Configure reverse proxy (Nginx)
4. Enable HTTPS/SSL

Example with PM2:
```bash
pm2 start server.js --name "eventhub"
pm2 save
```

## 📝 License

This project is created for educational purposes in engineering colleges.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📧 Support

For issues or questions, please contact the development team.

---

**Made with ❤️ for College Events** — EventHub v1.0.0
