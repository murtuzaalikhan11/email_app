import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { EmailProvider } from "./context/EmailContext"
import Layout from "./components/Layout"
import Inbox from "./pages/Inbox"
import Sent from "./pages/Sent"
import Trash from "./pages/Trash"
import Compose from "./pages/Compose"
import EmailDetail from "./pages/EmailDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <EmailProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/inbox" replace />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
              <Route path="trash" element={<Trash />} />
              <Route path="compose" element={<Compose />} />
              <Route path="email/:id" element={<EmailDetail />} />
            </Route>
          </Routes>
        </Router>
      </EmailProvider>
    </AuthProvider>
  )
}

export default App
