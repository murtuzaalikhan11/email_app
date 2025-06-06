"use client"

import { useEffect } from "react"
import { useEmail } from "../context/EmailContext"
import EmailList from "../components/EmailList"
import LoadingSpinner from "../components/LoadingSpinner"

function Inbox() {
  const { emails, loading, error, loadEmails, selectedEmails, deleteEmail, clearSelection } = useEmail()

  useEffect(() => {
    loadEmails()
  }, [])

  const handleBulkDelete = async () => {
    if (selectedEmails.length === 0) return

    if (window.confirm(`Delete ${selectedEmails.length} selected emails?`)) {
      for (const emailId of selectedEmails) {
        await deleteEmail(emailId)
      }
      clearSelection()
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-message">Error: {error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Inbox</h2>
        {selectedEmails.length > 0 && (
          <div className="bulk-actions">
            <button onClick={handleBulkDelete} className="bulk-delete-button">
              Delete Selected ({selectedEmails.length})
            </button>
            <button onClick={clearSelection} className="clear-selection-button">
              Clear Selection
            </button>
          </div>
        )}
      </div>

      <EmailList emails={emails} showActions={true} actionType="delete" />
    </div>
  )
}

export default Inbox
