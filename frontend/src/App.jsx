import react from "react"
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){ // clear local storage so you don't send access tokens in the register route (errors)
  localStorage.clear()
  return <Register/>
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
          />
          <Route
          path="/login"
          element={<Login/>}/>
          <Route
          path="/login"
          element={<Logout/>}/>
        
          <Route
          path="/register"
          element={<RegisterAndLogout/>}/>          
          
          <Route
          path="*" element={<NotFound/>}/>

        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
