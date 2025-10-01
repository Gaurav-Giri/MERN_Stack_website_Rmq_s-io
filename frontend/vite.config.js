// // vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 3000,
//     proxy: {
//       // API proxy
//       '/api': {
//         target: 'https://ppjqq76x-5000.inc1.devtunnels.ms',
//         changeOrigin: true,
//         secure: false,
//       },
//       // WebSocket proxy for Socket.io
//       '/socket.io': {
//         target: 'https://ppjqq76x-5000.inc1.devtunnels.ms',
//         changeOrigin: true,
//         secure: false,
//         // ws: true, // Enable WebSocket proxy
//       }
//     }
//   }
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      // API proxy - use relative path
      '/api': {
        target: 'http://localhost:5000', // Always proxy to local backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      // WebSocket proxy for Socket.io
      '/socket.io': {
        target: 'ws://localhost:5000', // Use ws:// for WebSocket
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxy
      }
    }
  }
});