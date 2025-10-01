

import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./Routes/routes.jsx";
import MainLayout from "./MainLayout";
import { ThemeTriggerProvider } from "./ThemeTrigger"; 
import { AuthProvider } from "./AuthContext";
import { SocketProvider } from "./SocketContext.jsx";
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div>Loading...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ThemeTriggerProvider>
        <SocketProvider>
          <Router>
            <MainLayout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {ROUTES.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                  ))}
                </Routes>
              </Suspense>
            </MainLayout>
          </Router>
        </SocketProvider>
        
      </ThemeTriggerProvider>
    </AuthProvider>
  );
}

export default App;
