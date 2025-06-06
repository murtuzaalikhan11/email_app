import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
})

export const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post("/user/register", userData)
    return response.data
  },

  // Login user
  async login(credentials) {
    const response = await api.post("/user/login", credentials)
    return response.data
  },

  // Logout user
  async logout() {
    const response = await api.post("/user/logout")
    return response.data
  },
}
