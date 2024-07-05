# WhatsApp Clone
This repository contains the code for a full-stack real-time chat application built using MERN stack. Additionally, technologies such as JWT and Socket.io were also used.

## Features

- Register and log in to start chatting with other users.
- Send and receive real-time messages.
- View chat history for all conversations.
- Search functionality to find users and chat with them.
- View your profile picture as well as those of other users within the chat interface.
- Monitor timestamps for when messages are sent and receive.
- Experience a user interface with exceptional clarity and enhanced text readability, achieved through the utilization of Tailwind CSS.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web application framework for Node.js (MVC architecture).
- **MongoDB**: NoSQL database used for storing application data.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Socket.io**: Real-time bidirectional event-based communication.

- **React**: Frontend JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
  
Additional dependencies required for this project are listed in the `package.json` files, including all libraries, frameworks, and tools necessary for the application to function correctly. This is necessary to ensure compatibility and stability.

## Implementation

- Implemented **real-time messaging** functionality using Socket.io, allowing instant communication updates between users without relying solely on database refreshes, thereby enhancing responsiveness and user experience.

- Implemented JWT (JSON Web Token) for **secure authentication** and **session management**, utilizing cookies to store and transmit tokens securely between client and server.

- Implemented **middleware** to protect user routes for messaging and interactions, ensuring authenticated access and data security.

- Used Express.js for server-side routing, adhering to **MVC architecture** for maintainable, scalable applications.

- Implemented a responsive UI with Tailwind CSS and its **inline utility** classes which reduced the need for separate CSS files .

- MongoDB utilized for its flexible document-based database structure and **schema-free design**, supporting scalability and high availability.
  
- **Environment variables** used to securely manage sensitive data like API keys and database credentials across various application environments, enhancing security and deployment flexibility.

## API Routes

- **POST `/api/auth/signup`**: Register a new user.
- **POST `/api/auth/login`**: Log in with existing credentials.
- **GET `/api/auth/logout`**: Log out current user.
- **GET `/api/messages/:id`**: Get messages between logged-in user and other users.
- **POST `/api/messages/send/:id`**: Send a message to another user.
