// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For hamburger icons

export default function Navbar() {
  const BG = "#ffffff";
  const textColor = "#383B39";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="w-full py-1.5 sm:py-2.5 shadow-sm fixed top-0 left-0 z-50"
      style={{
        backgroundColor: BG,
        fontFamily:
          'Manifold, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand with Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/fevicon.png" // 🔗 Replace this with your logo image link (e.g., "/assets/logo.png" or online link)
            alt="BeyondWhole Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
          />
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{
              color: textColor,
              fontFamily: "Aquilone, serif",
            }}
          >
            BeyondWhole
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 relative transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={{ color: textColor }}
          >
            Home
            <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>

          <NavLink
            to="/message"
            className={({ isActive }) =>
              `text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 relative transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={{ color: textColor }}
          >
            Write Message to God
            <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>

          <NavLink
            to="/confess"
            className={({ isActive }) =>
              `text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 relative transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={{ color: textColor }}
          >
            Write Confession
            <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>

          <NavLink
            to="/secret"
            className={({ isActive }) =>
              `text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 relative transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={{ color: textColor }}
          >
            Share Secret
            <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-[#383B39] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden flex flex-col items-start p-5 space-y-6`}
        style={{ color: textColor }}
      >
        <button
          className="absolute top-4 right-4 text-[#383B39]"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Brand inside Mobile Menu */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-xl font-bold"
          style={{ fontFamily: "Aquilone, serif" }}
        >
          <img
            src="/logo.png" // 🔗 Replace this too (same link as above)
            alt="BeyondWhole Logo"
            className="w-7 h-7 object-contain"
          />
          BeyondWhole
        </Link>

        <NavLink
          to="/message"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `text-base relative transition-all duration-200 ${
              isActive ? "font-semibold" : ""
            }`
          }
        >
          Write Message to God
          <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
        </NavLink>

        <NavLink
          to="/confess"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `text-base relative transition-all duration-200 ${
              isActive ? "font-semibold" : ""
            }`
          }
        >
          Write Confession
          <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
        </NavLink>

        <NavLink
          to="/secret"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `text-base relative transition-all duration-200 ${
              isActive ? "font-semibold" : ""
            }`
          }
        >
          Share Secret
          <span className="block h-[1px] bg-[#383B39] scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
        </NavLink>
      </div>
    </nav>
  );
}
