import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="bg-transparent py-6 mt-10">
      <div className="max-w-3xl mx-auto px-4 text-center text-sm text-slate-600">
        <div className="mb-3">
          <Link to="/about" className="underline">About</Link> &nbsp;|&nbsp;
          <Link to="/privacy" className="underline">Privacy Policy</Link> &nbsp;|&nbsp;
          <Link to="/contact" className="underline">Contact</Link>
        </div>
        <div>© {new Date().getFullYear()} MessageToGod — a calm space to share your heart.</div>
      </div>
    </footer>
  );
}
