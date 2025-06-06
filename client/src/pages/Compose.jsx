"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEmail } from "../context/EmailContext"

function Compose() {
  const navigate = useNavigate()
  const { sendEmail, loading } = useEmail()

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.to.trim() || !formData.subject.trim() || !formData.body.trim()) {
      alert("Please fill in all fields")
      return
    }

    try {
      await sendEmail(formData)
      alert("Email sent successfully!")
      navigate("/sent")
    } catch (error) {
      alert("Failed to send email: " + (error.response?.data?.msg || error.message))
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Compose Email</h2>
      </div>

      <form onSubmit={handleSubmit} className="compose-form">
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="recipient@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Email subject"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Message:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="15"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="send-button" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>

          <button type="button" onClick={() => navigate(-1)} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Compose
