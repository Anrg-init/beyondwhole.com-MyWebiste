// src/components/Navbar.jsx
import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For hamburger icons

export default function Navbar() {
  const BG = "#ffffff";
  const textColor = "#383B39";
  const [isOpen, setIsOpen] = useState(false);

  // dropdown control: null | "confession" | "quizzes" | "tools"
  const [openDropdown, setOpenDropdown] = useState(null);
  const leaveTimer = useRef(null);

  const open = (name) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setOpenDropdown(name);
  };

  const closeSoon = (delay = 150) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      leaveTimer.current = null;
    }, delay);
  };

  const toggleMobile = () => setIsOpen((s) => !s);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
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
            src="/fevicon.png"
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

        {/* Desktop Nav Links (grouped) */}
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

          {/* Confession dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open("confession")}
            onMouseLeave={() => closeSoon()}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openDropdown === "confession"}
              aria-controls="menu-confession"
              className="text-sm sm:text-base px-3 py-2"
              style={{ color: textColor }}
              onFocus={() => open("confession")}
              onBlur={() => closeSoon()}
            >
              Confession
            </button>

            <div
              id="menu-confession"
              role="menu"
              className={`absolute right-0 mt-2 w-56 bg-white border shadow-md rounded-md transform transition-all duration-150 z-50
                ${openDropdown === "confession" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
              style={{ transformOrigin: "top" }}
            >
              <div className="py-2">
                <NavLink
                  to="/message"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Write Message to God
                </NavLink>

                <NavLink
                  to="/confess"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Write Confession
                </NavLink>

                <NavLink
                  to="/secret"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Share Secret
                </NavLink>
              </div>
            </div>
          </div>

          {/* Quizzes dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open("quizzes")}
            onMouseLeave={() => closeSoon()}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openDropdown === "quizzes"}
              aria-controls="menu-quizzes"
              className="text-sm sm:text-base px-3 py-2"
              style={{ color: textColor }}
              onFocus={() => open("quizzes")}
              onBlur={() => closeSoon()}
            >
              Quizzes
            </button>

            <div
              id="menu-quizzes"
              role="menu"
              className={`absolute right-0 mt-2 w-56 bg-white border shadow-md rounded-md transform transition-all duration-150 z-50
                ${openDropdown === "quizzes" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
              style={{ transformOrigin: "top" }}
            >
              <div className="py-2">
                <NavLink
                  to="/quizzes/hellorheaven"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Hell or Heaven
                </NavLink>

                <NavLink
                  to="/quizzes/findanimalspirit"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Find Your Animal Spirit
                </NavLink>
              </div>
            </div>
          </div>

          {/* Tools dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open("tools")}
            onMouseLeave={() => closeSoon()}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openDropdown === "tools"}
              aria-controls="menu-tools"
              className="text-sm sm:text-base px-3 py-2"
              style={{ color: textColor }}
              onFocus={() => open("tools")}
              onBlur={() => closeSoon()}
            >
              Tools
            </button>

            <div
              id="menu-tools"
              role="menu"
              className={`absolute right-0 mt-2 w-56 bg-white border shadow-md rounded-md transform transition-all duration-150 z-50
                ${openDropdown === "tools" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
              style={{ transformOrigin: "top" }}
            >
              <div className="py-2">
                <NavLink
                  to="/tools/deathcalulator"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  style={{ color: textColor }}
                >
                  Death Calculator
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-[#383B39] focus:outline-none"
          onClick={toggleMobile}
          aria-label={isOpen ? "Close menu" : "Open menu"}
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
            src="/fevicon.png"
            alt="BeyondWhole Logo"
            className="w-7 h-7 object-contain"
          />
          BeyondWhole
        </Link>

        {/* Confession block */}
        <div className="w-full">
          <div className="text-sm font-semibold mb-2">Confession</div>
          <NavLink
            to="/message"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Write Message to God
          </NavLink>
          <NavLink
            to="/confess"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Write Confession
          </NavLink>
          <NavLink
            to="/secret"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Share Secret
          </NavLink>
        </div>

        {/* Quizzes block */}
        <div className="w-full">
          <div className="text-sm font-semibold mb-2">Quizzes</div>
          <NavLink
            to="/quizzes/hellorheaven"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Hell or Heaven
          </NavLink>
          <NavLink
            to="/quizzes/findanimalspirit"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Find Your Animal Spirit
          </NavLink>
        </div>

        {/* Tools block */}
        <div className="w-full">
          <div className="text-sm font-semibold mb-2">Tools</div>
          <NavLink
            to="/tools/deathcalulator"
            onClick={() => setIsOpen(false)}
            className="block text-base py-1"
          >
            Death Calculator
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
