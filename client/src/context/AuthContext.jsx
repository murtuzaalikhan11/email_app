"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (err) {
        console.error("Auth check failed:", err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.register(userData)
      return response
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.login(credentials)

      // Since we're using httpOnly cookies for auth, we just need to store user info
      const userInfo = {
        name: credentials.email.split("@")[0], // Temporary name from email
        email: credentials.email,
        isLoggedIn: true,
      }

      setUser(userInfo)
      localStorage.setItem("user", JSON.stringify(userInfo))
      return response
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await authService.logout()
      setUser(null)
      localStorage.removeItem("user")
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
