"use client"
import React from 'react';
import { Code2, Github, Terminal } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function LoginUser() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 size={40} className="text-indigo-500" />
            <h1 className="text-3xl font-bold text-white">KIIT-LAB</h1>
          </div>
          <p className="text-gray-400">Your journey to coding excellence begins here</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 backdrop-blur-sm border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome back</h2>

          {/* Google Sign In Button */}
          <button 
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors mb-4"
            onClick={() =>signIn('google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

      

          {/* Footer Stats */}
          {/* <div className="mt-8 grid grid-cols-3 gap-4 py-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-500">500K+</p>
              <p className="text-sm text-gray-400">Developers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-500">10K+</p>
              <p className="text-sm text-gray-400">Problems</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-500">50+</p>
              <p className="text-sm text-gray-400">Languages</p>
            </div>
          </div> */}

          {/* Terms */}
          {/* <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
          </p> */}
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <Terminal className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">Interactive Terminal</h3>
            <p className="text-sm text-gray-400">Code in your browser</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <Code2 className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">2000+ Challenges</h3>
            <p className="text-sm text-gray-400">Practice & Learn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;