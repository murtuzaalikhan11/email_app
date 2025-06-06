import { NavLink } from "react-router-dom"
import { useEmail } from "../context/EmailContext"

function Sidebar() {
  const { emails, sentEmails, trashedEmails } = useEmail()

  const navItems = [
    {
      path: "/inbox",
      label: "Inbox",
      icon: "📥",
      count: emails.length,
    },
    {
      path: "/sent",
      label: "Sent",
      icon: "📤",
      count: sentEmails.length,
    },
    {
      path: "/trash",
      label: "Trash",
      icon: "🗑️",
      count: trashedEmails.length,
    },
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.count > 0 && <span className="nav-count">{item.count}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
