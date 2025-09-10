import dotenv from "dotenv";
dotenv.config({ });

import express from "express";
import ConnectDB from "./config/database.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

const startServer = async () => {
  try {
    await ConnectDB(); // waits for DB connection
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);

    // Optional: still start server so API doesn't refuse connection
    app.listen(PORT, () => {
      console.warn(`⚠️ Server running WITHOUT database on http://localhost:${PORT}`);
    });
  }
};

startServer();
