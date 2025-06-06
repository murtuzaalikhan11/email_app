"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { emailService } from "../services/emailService"
import { useAuth } from "./AuthContext"

const EmailContext = createContext()

const initialState = {
  emails: [],
  sentEmails: [],
  trashedEmails: [],
  loading: false,
  error: null,
  selectedEmails: [],
}

function emailReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_EMAILS":
      return { ...state, emails: action.payload, loading: false }
    case "ADD_EMAIL":
      return {
        ...state,
        sentEmails: [action.payload, ...state.sentEmails],
      }
    case "DELETE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((email) => email._id !== action.payload),
        sentEmails: state.sentEmails.filter((email) => email._id !== action.payload),
        trashedEmails: [
          ...state.trashedEmails,
          state.emails.find((email) => email._id === action.payload) ||
            state.sentEmails.find((email) => email._id === action.payload),
        ].filter(Boolean),
      }
    case "SELECT_EMAIL":
      return {
        ...state,
        selectedEmails: state.selectedEmails.includes(action.payload)
          ? state.selectedEmails.filter((id) => id !== action.payload)
          : [...state.selectedEmails, action.payload],
      }
    case "CLEAR_SELECTION":
      return { ...state, selectedEmails: [] }
    default:
      return state
  }
}

export function EmailProvider({ children }) {
  const [state, dispatch] = useReducer(emailReducer, initialState)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      loadEmails()
    }
  }, [isAuthenticated])

  const loadEmails = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const emails = await emailService.getEmails()

      // Process emails into inbox and sent
      const receivedEmails = emails.filter((email) => email.to !== "me@example.com")
      const sentEmails = emails.filter((email) => email.to === "me@example.com")

      dispatch({ type: "SET_EMAILS", payload: receivedEmails })
      dispatch({ type: "SET_SENT_EMAILS", payload: sentEmails })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
    }
  }

  const sendEmail = async (emailData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const sentEmail = await emailService.sendEmail(emailData)
      dispatch({ type: "ADD_EMAIL", payload: sentEmail })
      dispatch({ type: "SET_LOADING", payload: false })
      return sentEmail
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const deleteEmail = async (emailId) => {
    try {
      await emailService.deleteEmail(emailId)
      dispatch({ type: "DELETE_EMAIL", payload: emailId })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
    }
  }

  const value = {
    ...state,
    loadEmails,
    sendEmail,
    deleteEmail,
    selectEmail: (id) => dispatch({ type: "SELECT_EMAIL", payload: id }),
    clearSelection: () => dispatch({ type: "CLEAR_SELECTION" }),
  }

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
}

export function useEmail() {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider")
  }
  return context
}
