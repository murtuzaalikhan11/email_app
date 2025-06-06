"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEmail } from "../context/EmailContext"

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { clearSelection } = useEmail()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery)
    }
  }

  const handleCompose = () => {
    clearSelection()
    navigate("/compose")
  }

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">📧 Email App</h1>
      </div>

      <div className="header-center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>
      </div>

      <div className="header-right">
        <button onClick={handleCompose} className="compose-button">
          ✏️ Compose
        </button>

        <div className="user-menu">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
