
// import dotenv from "dotenv";
// dotenv.config();

// // Core imports
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import schoolRoutes from "./routes/SchoolRoutes.js";
// import userRoutes from "./routes/UserRoutes.js";

// // Socket handler
// import SocketHandler from "./SocketHandler.js";

// const app = express();
// const server = http.createServer(app);

// // CORS configuration with devtunnels support
// const corsOptions = {
//   origin: [
//     "http://localhost:3000",
//     "http://127.0.0.1:3000",
//     "http://10.146.105.153:3000",
//     /\.devtunnels\.ms$/  // DevTunnels support
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));
// app.use(express.json());

// // Routes
// app.use("/api", authRoutes);
// app.use("/api/schools", schoolRoutes);
// app.use("/api/users", userRoutes);

// // Socket.IO setup with devtunnels support
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "http://127.0.0.1:3000",
//       "http://10.146.105.153:3000",
//       /\.devtunnels\.ms$/
//     ],
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// SocketHandler.setupSocketHandlers(io);
// app.set("io", io);

// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error("🔥 Error:", err.message);
//   res.status(500).json({ success: false, message: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌐 Accessible via:
//   - Local: http://localhost:${PORT}
//   - Network: http://[YOUR_IP]:${PORT}
//   - DevTunnels: Check your tunnel URL`);
// });





// -----------------------------complete implementation using proxy----------------------------------------


// import dotenv from "dotenv";
// dotenv.config();

// // Core imports
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import schoolRoutes from "./routes/SchoolRoutes.js";
// import userRoutes from "./routes/UserRoutes.js";
// import VendorRoutes from "./routes/VendorRoutes.js";
// import MealRoutes from "./routes/MealRoutes.js";
// import AdminRoutes from "./routes/AdminRoutes.js"
// // import NotificationRoutes from './routes/NotificationRoutes.js';

// // Socket handler

// import MessageConsumer from "././rabbitmq/messageConsumer.js";
// import SocketHandler from "./SocketHandler.js";

// const app = express();
// const server = http.createServer(app);

// // Enhanced CORS configuration
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     const allowedOrigins = [
//       "http://localhost:3000",
//       "http://127.0.0.1:3000",
//       "http://10.213.228.153:3000",
//     ];
    
//     // Allow all devtunnel origins
//     if (origin.includes('devtunnels.ms')) {
//       return callback(null, true);
//     }
    
//     // Check if origin is in allowed list
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log('CORS blocked for origin:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));
// app.use(express.json());

// // Routes
// app.use("/api", authRoutes);
// app.use("/api/schools", schoolRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/meals", MealRoutes);
// app.use("/api/vendor", VendorRoutes);
// app.use("/api/admin", AdminRoutes);
// // app.use("/api/notifications",NotificationRoutes);
// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Socket.IO setup with enhanced configuration
// const io = new Server(server, {
//   cors: {
//     origin: function (origin, callback) {
//       // Allow all devtunnel origins and localhost
//       if (!origin || origin.includes('devtunnels.ms') || 
//           origin.includes('localhost') || origin.includes('127.0.0.1')) {
//         return callback(null, true);
//       }
//       callback(new Error('Not allowed by CORS'));
//     },
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   path: '/socket.io' // Match the client-side path
// });

// SocketHandler.setupSocketHandlers(io);
// app.set("io", io);


// // Initialize and start RabbitMQ Consumer
// const messageConsumer = new MessageConsumer(io);
// messageConsumer.initialize().then(() => {
//   messageConsumer.startConsuming();
// }).catch(error => {
//   console.error('❌ Failed to start Message Consumer:', error);
// });


// // Database connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error("🔥 Error:", err.message);
//   res.status(500).json({ success: false, message: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌐 Accessible via:
//   - Local: http://localhost:${PORT}
//   - Network: http://[YOUR_IP]:${PORT}
//   - DevTunnels: Check your tunnel URL`);
// });












// ------------------------------updated with splitted Consumers-----------------------------------



import dotenv from "dotenv";
dotenv.config();

// Core imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./routes/authRoutes.js";
import schoolRoutes from "./routes/SchoolRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import VendorRoutes from "./routes/VendorRoutes.js";
import MealRoutes from "./routes/MealRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js"
import HeaderRoutes from "./routes/ContentRoutes/HeaderRoutes.js";
import FooterRoutes from "./routes/ContentRoutes/FooterRoutes.js";
import NotificationRoutes from './routes/NotificationRoutes.js';

// Socket handler
import SocketHandler from "./SocketHandler.js";

// RabbitMQ Consumers
import MessageConsumer from "./rabbitmq/messageConsumer.js";
import UserConsumer from "./rabbitmq/consumer/UserConsumer.js";
import SchoolConsumer from "./rabbitmq/consumer/SchoolConsumer.js";
import MealConsumer from "./rabbitmq/consumer/MealConsumer.js";
import HeaderConsumer from "./rabbitmq/consumer/ContentConsumer/HeaderConsumer.js";
import FooterConsumer from "./rabbitmq/consumer/ContentConsumer/Footerconsumer.js";
import NotificationConsumer from "./rabbitmq/consumer/NotificationConsumer.js";
const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://10.213.228.153:3000",
    ];
    
    // Allow all devtunnel origins
    if (origin.includes('devtunnels.ms')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meals", MealRoutes);
app.use("/api/vendor", VendorRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/headerApi", HeaderRoutes);
app.use("/api/footerApi", FooterRoutes);
app.use("/api/notifications",NotificationRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO setup with enhanced configuration
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow all devtunnel origins and localhost
      if (!origin || origin.includes('devtunnels.ms') || 
          origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  path: '/socket.io' // Match the client-side path
});

SocketHandler.setupSocketHandlers(io);
app.set("io", io);

// Initialize and start all RabbitMQ Consumers
const initializeConsumers = async () => {
  try {
    // Create consumer instances
    const messageConsumer = new MessageConsumer(io);
    const userConsumer = new UserConsumer(io);
    const schoolConsumer = new SchoolConsumer(io);
    const mealConsumer = new MealConsumer(io);
    const headerConsumer = new HeaderConsumer(io);
    const footerConsumer = new FooterConsumer(io);
    const notificationConsumer = new NotificationConsumer(io);

    // Initialize all consumers
    console.log('🔄 Initializing RabbitMQ consumers...');
    
    await Promise.all([
      messageConsumer.initialize(),
      userConsumer.initialize(),
      schoolConsumer.initialize(),
      mealConsumer.initialize(),
      headerConsumer.initialize(),
      footerConsumer.initialize(),
      notificationConsumer.initialize()
    ]);

    console.log('✅ All RabbitMQ consumers initialized');

    // Start consuming messages
    console.log('🔄 Starting message consumption...');
    
    await Promise.all([
      messageConsumer.startConsuming(),
      userConsumer.startConsuming(),
      schoolConsumer.startConsuming(),
      mealConsumer.startConsuming(),
      headerConsumer.startConsuming(),
      footerConsumer.startConsuming(),
      notificationConsumer.startConsuming()

    ]);

    console.log('🎯 All message consumers are running');
    
  } catch (error) {
    console.error('❌ Failed to start RabbitMQ Consumers:', error);
    process.exit(1); // Exit if RabbitMQ consumers fail to start
  }
};

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    
    // Start RabbitMQ consumers after successful DB connection
    initializeConsumers();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Accessible via:
  - Local: http://localhost:${PORT}
  - Network: http://[YOUR_IP]:${PORT}
  - DevTunnels: Check your tunnel URL`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
  });
});