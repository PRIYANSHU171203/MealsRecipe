import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100 flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4">
          About MealsRecipe 🍲
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          Welcome to <span className="font-semibold text-orange-700">MealsRecipe</span>, 
          your go-to platform for discovering, sharing, and enjoying delicious recipes 
          from around the world. Whether you’re a seasoned chef or just starting out in 
          the kitchen, we’ve got something for everyone.
        </p>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-12">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
          alt="Cooking"
          className="rounded-2xl shadow-lg w-full md:w-1/2 object-cover"
        />
        <div className="flex flex-col gap-4 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe food brings people together. MealsRecipe was created to 
            make cooking fun, simple, and accessible to everyone. Our mission 
            is to inspire you with easy-to-follow recipes, healthy alternatives, 
            and creative meal ideas to brighten your dining table.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose MealsRecipe?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-orange-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">🍴 Endless Recipes</h3>
            <p className="text-gray-600">
              Explore a wide range of recipes, from traditional comfort foods 
              to modern, health-conscious dishes.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">👩‍🍳 Easy to Follow</h3>
            <p className="text-gray-600">
              Step-by-step instructions, helpful tips & video make cooking stress-free 
              for beginners and pros alike.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">🌍 Community</h3>
            <p className="text-gray-600">
              Share your favorite meals, connect with fellow food lovers, 
              and be part of our growing foodie family.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-r from-orange-200 to-yellow-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Start Your Cooking Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl text-center">
          Whether you want to cook for fun, health, or family, 
          MealsRecipe is here to guide you with recipes made with love.  
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow hover:bg-orange-700 transition"
        >
          Explore Recipes
        </button>
      </div>
    </div>
  );
}
