# RSK Messenger Web Application

RSK Messenger Web Application is a real-time messaging platform built with React, Node.js, Socket.IO, and other modern web technologies. It provides a seamless and secure communication experience for users to chat with each other in real-time.

## Features

- **User Authentication**: Users can sign up, log in, and reset their passwords securely.
- **Real-Time Messaging**: Instant messaging functionality allows users to exchange messages in real-time.
- **User Profile**: Users can set up their profile with a name, email, and profile picture.
- **Chat Rooms**: Multiple chat rooms are available for users to join and communicate with each other.
- **Online Status**: Users can see the online status of other users in their contact list.
- **Forgot Password**: Password reset functionality is available for users who forget their passwords.
- **Responsive Design**: The application is responsive and works well on desktop and mobile devices.
- **Demo Users**: Demo users are available for testing purposes.

## Technologies Used

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - React Router: Declarative routing for React applications.
  - Material-UI: React components for faster and easier web development.
  - Socket.IO Client: Real-time bi-directional communication library.
  - Formik: Form library for React forms.
  - React Toastify: Notification library for React applications.
- **Backend**:
  - Node.js: JavaScript runtime environment for server-side development.
  - Express.js: Web application framework for Node.js.
  - Socket.IO: Real-time bidirectional event-based communication library.
- **Database**:
  - MongoDB: NoSQL database for storing user data and messages.
- **Deployment**:
  - Netlify: Platform for continuous deployment and hosting.

## Security

- **Authentication**: User authentication is implemented securely using bcrypt for password hashing and JWT for session management.
- **Authorization**: Access to certain features and resources is restricted based on user roles and permissions.
- **Data Protection**: User data is stored securely in the database, and sensitive information is encrypted using industry-standard encryption algorithms.
- **HTTPS**: The application is served over HTTPS to ensure data integrity and confidentiality.

## Use Cases

- **Personal Messaging**: Users can use the application for personal messaging with friends and family.
- **Team Collaboration**: Teams can utilize the platform for real-time communication and collaboration on projects.
- **Customer Support**: Businesses can offer customer support through the application by providing live chat functionality.
- **Community Engagement**: Communities and interest groups can use the platform to connect and engage with each other in real-time discussions.

## Deployment

The application is deployed on Netlify and can be accessed [here](https://rsk-messenger-web-application.netlify.app/).

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd rsk-messenger-web-application`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and navigate to `http://localhost:3000`
