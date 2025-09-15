// import React from "react";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className=" bg-amber-50 border border-amber-200 mt-10 rounded-2xl mx-2 mb-1.5">
//       <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
//         {/* ✅ Logo / App Name */}
//         <Link to="/" className="text-2xl font-extrabold text-amber-600 hover:text-amber-700">
//           MealsRecipe 🍽️
//         </Link>

//         {/* ✅ Navigation */}
//         <nav className="flex gap-6 text-gray-600 font-medium">
//           <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
//           <Link to="/allmeals" className="hover:text-amber-600 transition-colors">Meals</Link>
//           <Link to="/about" className="hover:text-amber-600 transition-colors">About</Link>
//           <Link to="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
//         </nav>

//         {/* ✅ Social Links */}
//         <div className="flex gap-4 text-gray-600">
//           <a href="https://facebook.com" target="_blank" rel="noreferrer" 
//              className="hover:text-blue-600 transition-colors">🌐</a>
//           <a href="https://twitter.com" target="_blank" rel="noreferrer" 
//              className="hover:text-sky-500 transition-colors">🐦</a>
//           <a href="https://instagram.com" target="_blank" rel="noreferrer" 
//              className="hover:text-pink-500 transition-colors">📸</a>
//         </div>
//       </div>

//       {/* ✅ Bottom Note */}
//       <div className="text-center py-4 text-sm text-gray-500 border-t border-amber-200">
//         © {new Date().getFullYear()} MealsRecipe. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200 mt-10 rounded-t-2xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ✅ Logo / About */}
        <div>
          <Link 
            to="/" 
            className="text-2xl font-extrabold text-amber-700 hover:text-amber-800 transition-colors"
          >
            MealsRecipe 🍽️
          </Link>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Discover delicious recipes, explore meal ideas, and enjoy cooking with 
            simple, step-by-step guides tailored for everyone.
          </p>
        </div>

        {/* ✅ Navigation */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-lg font-semibold text-amber-700 mb-3">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-gray-600 font-medium">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-amber-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
          </nav>
        </div>

        {/* ✅ Social / GitHub */}
        <div className="flex flex-col md:items-end">
          <div className="flex gap-5 text-2xl text-gray-600">
            <Link 
              to ="https://github.com/PRIYANSHU171203/MealsRecipe" 
              target="_blank" 
              className="hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} />
              
            </Link>
            
          </div>
        </div>
      </div>

      {/* ✅ Bottom Note */}
      <div className="text-center py-5 text-sm text-gray-500 border-t border-amber-200">
        © {new Date().getFullYear()} <span className="font-semibold text-amber-700">MealsRecipe</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
