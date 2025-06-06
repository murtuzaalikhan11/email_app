import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const emailService = {
  // Send new email (matches your createemail endpoint)
  async sendEmail(emailData) {
    const response = await api.post("/api/email/createemail", {
      to: emailData.to,
      subject: emailData.subject,
      message: emailData.body, // Frontend uses 'body', backend expects 'message'
    })
    return response.data.email
  },

  // Get all user emails (matches your getemails endpoint)
  async getEmails() {
    const response = await api.post("/api/email/getemails")
    return response.data.emails || []
  },

  // Delete email by ID (matches your delete endpoint)
  async deleteEmail(id) {
    const response = await api.delete(`/api/email/${id}`)
    return response.data
  },

  // Get single email by ID
  async getEmailById(id) {
    // Since you don't have this endpoint, we'll get all emails and filter
    const emails = await this.getEmails()
    return emails.find((email) => email._id === id)
  },
}
