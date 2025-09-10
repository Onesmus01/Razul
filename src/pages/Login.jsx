import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
        {/* Toggle Tabs */}
        <div className="flex justify-between mb-8">
          <button
            className={`w-1/2 py-2 font-semibold text-lg transition-all duration-300 ${
              isLogin ? 'border-b-4 border-white text-white' : 'text-gray-400'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold text-lg transition-all duration-300 ${
              !isLogin ? 'border-b-4 border-white text-white' : 'text-gray-400'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3.5 left-4 text-white/60" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-3 pl-12 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-4 text-white/60" />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-white/60" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <FaLock className="absolute top-3.5 left-4 text-white/60" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 pl-12 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {isLogin && (
            <div className="text-center text-sm mt-4 text-white/70">
              Don’t have an account?{' '}
              <span
                onClick={() => setIsLogin(false)}
                className="text-white font-semibold cursor-pointer underline"
              >
                Sign Up
              </span>
            </div>
          )}

          {!isLogin && (
            <div className="text-center text-sm mt-4 text-white/70">
              Already have an account?{' '}
              <span
                onClick={() => setIsLogin(true)}
                className="text-white font-semibold cursor-pointer underline"
              >
                Login
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
