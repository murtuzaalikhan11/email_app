"use client"

import { useEffect } from "react"
import { useEmail } from "../context/EmailContext"
import EmailList from "../components/EmailList"
import LoadingSpinner from "../components/LoadingSpinner"

function Trash() {
  const { trashedEmails, loading, error, loadEmails } = useEmail()

  useEffect(() => {
    loadEmails()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-message">Error: {error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Trash</h2>
      </div>

      <EmailList emails={trashedEmails} showActions={false} />
    </div>
  )
}

export default Trash
