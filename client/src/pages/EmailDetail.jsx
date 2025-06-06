"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { emailService } from "../services/emailService"
import { useEmail } from "../context/EmailContext"
import LoadingSpinner from "../components/LoadingSpinner"

function EmailDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deleteEmail } = useEmail()

  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadEmail()
  }, [id])

  const loadEmail = async () => {
    try {
      setLoading(true)
      const emailData = await emailService.getEmailById(id)
      setEmail(emailData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Delete this email?")) {
      await deleteEmail(id)
      navigate(-1)
    }
  }

  const handleReply = () => {
    navigate("/compose", {
      state: {
        to: email.to,
        subject: `Re: ${email.subject}`,
        body: `\n\n--- Original Message ---\nFrom: ${email.to}\nSubject: ${email.subject}\n\n${email.message}`,
      },
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-message">Error: {error}</div>
  if (!email) return <div className="error-message">Email not found</div>

  return (
    <div className="page">
      <div className="email-detail">
        <div className="email-detail-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>

          <div className="email-actions">
            <button onClick={handleReply} className="action-button">
              ↩️ Reply
            </button>
            <button onClick={handleDelete} className="action-button delete">
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="email-detail-content">
          <div className="email-meta">
            <h1 className="email-subject">{email.subject}</h1>

            <div className="email-info">
              <div className="sender-info">
                <strong>To:</strong> {email.to}
              </div>
              <div className="date-info">
                <strong>Date:</strong> {formatDate(email.createdAt)}
              </div>
            </div>
          </div>

          <div className="email-body">
            <pre>{email.message}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailDetail
