// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Classic, minimal navbar.
 * Background: #383B39 (dark) with white text and subtle white hover.
 * Very simple font stack for a classic, neutral look.
 */
export default function Navbar() {
  const BG = "#383B39";
  const textColor = "#ffffff";

  return (
    <nav
      className="w-full py-4"
      style={{
        backgroundColor: BG,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight" style={{ color: textColor }}>
          Manifest-It
        </Link>

        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? "bg-white/10 font-medium" : "hover:bg-white/10"}`
            }
            style={{ color: textColor }}
          >
            Home
          </NavLink>

          <NavLink
            to="/message"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? "bg-white/10 font-medium" : "hover:bg-white/10"}`
            }
            style={{ color: textColor }}
          >
            Send Message
          </NavLink>

          <NavLink
            to="/confess"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? "bg-white/10 font-medium" : "hover:bg-white/10"}`
            }
            style={{ color: textColor }}
          >
            Confess Your Feeling
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
