import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Ravesona p.png";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#070311] text-white">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src={logo}
          alt="Ravesona Logo"
          className="w-12 h-12 rounded-full border border-white/20"
        />

        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Ravesona
        </span>
      </Link>

      {/* Center: Main Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-semibold transition no-underline"
        >
          Build my Card
        </Link>

        <Link
          to="/"
          className="px-5 py-3 rounded-lg border border-white/15 hover:bg-white/10 text-white font-semibold transition no-underline"
        >
          Dashboard
        </Link>

        <button className="px-5 py-3 rounded-lg border border-red-400/60 text-red-300 hover:bg-red-500/10 font-semibold transition">
          Log Out
        </button>
      </div>

      {/* Right: Wishlist and Cart */}
      <div className="flex items-center gap-4">
        <Link
          to="/wishlist"
          className="px-5 py-3 rounded-lg border border-purple-400/40 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 font-semibold transition no-underline"
        >
          Wishlist
        </Link>

        <Link
          to="/mycart"
          className="px-5 py-3 rounded-lg border border-white/15 hover:bg-white/10 text-white font-semibold transition no-underline"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;