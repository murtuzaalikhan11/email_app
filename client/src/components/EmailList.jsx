"use client"

import { useNavigate } from "react-router-dom"
import { useEmail } from "../context/EmailContext"

function EmailList({ emails, showActions = true, actionType = "delete" }) {
  const navigate = useNavigate()
  const { selectedEmails, selectEmail, deleteEmail } = useEmail()

  const handleEmailClick = async (email) => {
    navigate(`/email/${email._id}`)
  }

  const handleAction = async (e, email) => {
    e.stopPropagation()

    switch (actionType) {
      case "delete":
        await deleteEmail(email._id)
        break
      default:
        break
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays <= 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const getActionButton = (email) => {
    switch (actionType) {
      case "delete":
        return (
          <button onClick={(e) => handleAction(e, email)} className="action-button delete" title="Move to trash">
            🗑️
          </button>
        )
      default:
        return null
    }
  }

  if (emails.length === 0) {
    return (
      <div className="empty-state">
        <p>No emails found</p>
      </div>
    )
  }

  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email._id}
          className={`email-item ${selectedEmails.includes(email._id) ? "selected" : ""}`}
          onClick={() => handleEmailClick(email)}
        >
          <div className="email-checkbox">
            <input
              type="checkbox"
              checked={selectedEmails.includes(email._id)}
              onChange={() => selectEmail(email._id)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="email-content">
            <div className="email-header">
              <span className="email-sender">{email.to}</span>
              <span className="email-date">{formatDate(email.createdAt)}</span>
            </div>

            <div className="email-subject">{email.subject}</div>

            <div className="email-preview">{email.message?.substring(0, 100) + "..."}</div>
          </div>

          {showActions && <div className="email-actions">{getActionButton(email)}</div>}
        </div>
      ))}
    </div>
  )
}

export default EmailList
