
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, User, LogIn, LogOut, KeyRound, UserPlus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart();

  const handleAuth = (type) => {
    if (type === 'login') {
      setIsLoggedIn(true);
      navigate('/login');
    } else if (type === 'signup') {
      navigate('/signup');
    } else if (type === 'forgot') {
      navigate('/forgot-password');
    } else {
      setIsLoggedIn(false);
      alert("Logged out successfully!");
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3616/3616786.png"
                alt="logo"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                F1 Streetwear
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Premium Collection</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/category')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/category' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Products
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-semibold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <button
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleAuth('login')}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </button>
                  <button
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleAuth('signup')}
                  >
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </button>
                  <button
                    className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleAuth('forgot')}
                  >
                    <KeyRound className="w-4 h-4" /> Forgot?
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <button
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleAuth('logout')}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
