import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" bg-amber-50 border border-amber-200 mt-10 rounded-2xl mx-2 mb-1.5">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* ✅ Logo / App Name */}
        <Link to="/" className="text-2xl font-extrabold text-amber-600 hover:text-amber-700">
          MealsRecipe 🍽️
        </Link>

        {/* ✅ Navigation */}
        <nav className="flex gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/allmeals" className="hover:text-amber-600 transition-colors">Meals</Link>
          <Link to="/about" className="hover:text-amber-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
        </nav>

        {/* ✅ Social Links */}
        <div className="flex gap-4 text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" 
             className="hover:text-blue-600 transition-colors">🌐</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" 
             className="hover:text-sky-500 transition-colors">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" 
             className="hover:text-pink-500 transition-colors">📸</a>
        </div>
      </div>

      {/* ✅ Bottom Note */}
      <div className="text-center py-4 text-sm text-gray-500 border-t border-amber-200">
        © {new Date().getFullYear()} MealsRecipe. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
