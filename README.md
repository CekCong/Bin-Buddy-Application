# SC2006 - Software Engineering
# Bin Buddy - An E-waste Recycling App

## Live Website

🌐 **Application:** https://your-project-name.vercel.app

# Demo Video
[![Watch on YouTube](https://img.shields.io/badge/▶%20Watch%20Demo%20Video-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=LX0xQ9jAtFc)

# Our App and Target Users
Our system’s target users are E-waste disposers. With climate change being prevalent in today’s world, E-waste being frequently discarded and people wanting to engage in more environmentally friendly practices, the government has set up E-waste disposal bins all around the country. E-waste is electronic equipment of any kind that has been discarded. In 2023, Singapore produced about 60,000 tonnes of E-waste, but only 16,0000 tonnes were recycled (Strait Times, 2024). The low E-waste recycling rate is due to the lack of awareness, as many people do not know E-waste bins exist, or find it inconvenient to recycle. Our team aims to make the recycling process more convenient by making it easier for electronic users to locate recycling bins near where they work or stay.

With our web application (app), users of our app will be able to quickly locate the E-waste disposal bins near them, and be directed to the nearest ones with the highest occupancy, along with gaining access to educational guidelines, among others. We will use NEA’s dataset on E-waste disposal bins around Singapore from data.gov.sg for the development of our app. 


A full-stack Node.js + Express.js application with secure authentication, password recovery, and admin access control.
Users can register, log in, ask queries, set reminders, locate nearest E-waste bins, save their locations, update their profiles, change passwords, and reset forgotten ones. Admins have separate login access.

Features
- User Authentication (Register, Login, Logout)
- Role-Based Access Control (User & Admin)
- Password Recovery via Email (SendGrid SMTP)
- Session Management using express-session
- MongoDB for data storage
- Flash Messages using a custom alertMessage() helper
- Security: Bcrypt password hashing, session validation, flagged/suspended user check

🛠️ Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Templating Engine: Handlebars (hbs)
- Maps: Google Maps API
- Mail Service: SendGrid SMTP
- Session Management: express-session + connect-mongo



# Local Setup Instructions


1) Clone the repository

git clone https://github.com/CekCong/Bin-Buddy-Application.git

cd Project_Code

2) Install dependencies

npm install

3️) Configure Environment Variables

```env
PORT=3000
NODE_ENV=development
SESSION_SECRET= random_session_secret
SENDGRID_API_KEY = your_sendgrid_api_key 
EMAIL_USER= your_verified_sender_email 
ADMIN_CODE="BINBUDDY2025" 
GOOGLE_MAPS_API_KEY = your_google_maps_api_key 
MONGO_URI = your_mongodb_connection_uri
```

4️) Run the server


npm run dev

or

node app.js


The app should now be running at:
http://localhost:3000

5️) Test Email Functionality
The system uses SendGrid to send password reset links.
To test it:
- Register a user with your own email.
- Go to /forgotpassword.
- Check your inbox for the reset link.

6) To create an admin account:
- During registration, enter the same ADMIN_CODE you configured in .env.
- Admins can access the admin dashboard at: /admin/dashboard


