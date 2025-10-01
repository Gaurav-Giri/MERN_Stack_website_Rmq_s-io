



// import React, { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext();

// // const getBackendUrl = () => {
// //   const { hostname } = window.location;
  
// //   // Local development
// //   if (hostname === "localhost" || hostname === "127.0.0.1") {
// //     return "http://localhost:5000";
// //   }
  
// //   // DevTunnels - simple replacement
// //   if (hostname.includes('devtunnels.ms')) {
// //     return `https://${hostname.replace('-3000', '-5000')}`;
// //   }
  
// //   // Default for network IPs and production
// //   return `http://${hostname}:5000`;
// // };

// // export const useSocket = () => {
// //   return useContext(SocketContext);
// // };

// const getSocketUrl = () => {
//   const { hostname } = window.location;
  
//   // Use relative path for devtunnels and local development
//   // Let Vite proxy handle the routing
//   if (hostname.includes('devtunnels.ms') || hostname === 'localhost' || hostname === '127.0.0.1') {
//     return ''; // Relative path - will use same origin
//   }
  
//   // Only use direct URL for production or non-proxy environments
//   return `http://${hostname}:5000`;
// };

// export const useSocket = () => {
//   return useContext(SocketContext);
// };



// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [connectionStatus, setConnectionStatus] = useState('disconnected');
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       const backendUrl = getSocketUrl();
//       console.log('🔌 Socket connecting to:', backendUrl);
      
//       const newSocket = io(backendUrl, {
//         transports: ["websocket", "polling"],
//         auth: {
//           token: localStorage.getItem('token')
//         },
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000
//       });

//       // Connection event handlers
//       newSocket.on('connect', () => {
//         console.log('✅ Socket.io connected successfully');
//         setConnectionStatus('connected');
        
//         newSocket.emit('join-admin-room', {
//           name: user.name,
//           email: user.email
//         });
//       });

//       newSocket.on('connect_error', (error) => {
//         console.error('❌ Socket.io connection failed:', error);
//         setConnectionStatus('error');
//       });

//       newSocket.on('disconnect', (reason) => {
//         console.log('🔌 Socket.io disconnected:', reason);
//         setConnectionStatus('disconnected');
//       });

//       newSocket.on('reconnect', (attemptNumber) => {
//         console.log('🔄 Socket.io reconnected after', attemptNumber, 'attempts');
//         setConnectionStatus('connected');
//       });

//       setSocket(newSocket);

//       return () => {
//         console.log('🧹 Cleaning up Socket.io connection');
//         newSocket.close();
//       };
//     } else {
//       // Clean up socket if user logs out
//       if (socket) {
//         socket.close();
//         setSocket(null);
//         setConnectionStatus('disconnected');
//       }
//     }
//   }, [user]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };








//---------------------------------------complete using proxy-------------------------------------------------------


import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('🔌 Socket connecting using relative path...');
      
      // Use relative path - Vite proxy will handle the WebSocket connection
      const newSocket = io({
        path: '/socket.io', // Important: specify the path
        transports: ["websocket", "polling"],
        auth: {
          token: localStorage.getItem('token')
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('✅ Socket.io connected successfully');
        setConnectionStatus('connected');
        
        newSocket.emit('join-admin-room', {
          name: user.name,
          email: user.email
        });
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Socket.io connection failed:', error);
        setConnectionStatus('error');
      });

      newSocket.on('disconnect', (reason) => {
        console.log('🔌 Socket.io disconnected:', reason);
        setConnectionStatus('disconnected');
      });

      newSocket.on('reconnect', (attemptNumber) => {
        console.log('🔄 Socket.io reconnected after', attemptNumber, 'attempts');
        setConnectionStatus('connected');
      });

      setSocket(newSocket);

      return () => {
        console.log('🧹 Cleaning up Socket.io connection');
        newSocket.close();
      };
    } else {
      // Clean up socket if user logs out
      if (socket) {
        socket.close();
        setSocket(null);
        setConnectionStatus('disconnected');
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

