# 💬 ChatifyNest – Real-time Chat Application

**ChatifyNest** is a **real-time messaging platform** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
It enables **instant communication with Socket.io**, secure **JWT-based authentication**, and **media uploads with Cloudinary**.  

---

## 🚀 Features
- ⚡ Real-time messaging with **Socket.io (WebSockets)**
- 🔒 User authentication & authorization using **JWT**
- 👥 One-on-one and group chat support
- 🗄️ Persistent chat history stored in **MongoDB**
- 🖼️ Media and avatar upload with **Cloudinary**
- 🎨 Responsive **React.js frontend** styled with Tailwind CSS
- 🌐 RESTful APIs with **Node.js & Express.js**
- 🚀 Deployment-ready with **CI/CD integration**

---

## 🛠️ Tech Stack
**Frontend:** React.js, Context API, Tailwind CSS  
**Backend:** Node.js, Express.js, REST APIs  
**Database:** MongoDB (NoSQL)  
**Real-time Communication:** Socket.io (WebSockets)  
**Authentication:** JWT (JSON Web Tokens), bcrypt.js  
**Cloud Storage:** Cloudinary  
**Deployment:** [Heroku/Render/Vercel], GitHub Actions  

---

## 📂 Project Structure
/client → React.js frontend
/server → Node.js + Express.js backend
/models → MongoDB models (User, Chat, Message)
/routes → API routes
/config → DB & Cloudinary configuration


---

## ⚙️ Installation & Setup

Follow these steps to run **ChatifyNest** locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/chatifynest.git
cd chatifynest

2️⃣ Install dependencies

For backend:

cd server
npm install


For frontend:

cd ../client
npm install

3️⃣ Configure environment variables

Create a .env file in the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4️⃣ Run the application

Start the backend:

cd server
npm run dev


Start the frontend:

cd client
npm start

5️⃣ Open in browser

Visit http://localhost:3000
 to access ChatifyNest.

📸 Screenshots

(Add screenshots of your UI here — e.g., Login Page, Chat Window, Group Chat, etc.)

🚀 Deployment

Deployed on:
🔗 Frontend: [Vercel/Netlify link]
🔗 Backend API: [Heroku/Render link]

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a feature branch (feature-branch)

Commit changes and push

Open a Pull Request

📜 License

This project is licensed under the MIT License.
