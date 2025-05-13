import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Custom Google Icon Component
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="mr-3 h-5 w-5"
  >
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle the OAuth callback when the component mounts
  useEffect(() => {
    const { token, error: queryError } = router.query;

    if (token) {
      try {
        // Store token in localStorage
        localStorage.setItem('token', token as string);
        console.log('Token stored successfully:', token);
        router.push('https://xeno-mini-crm-ten.vercel.app/dashboard'); // Redirect to the dashboard after successful login
      } catch (storageError) {
        setError('Unable to store authentication token');
      }
    }

    if (queryError) {
      console.error('Login error:', queryError);
      setError(queryError as string);
    }
  }, [router]);

  const handleGoogleLogin = () => {
    setLoading(true);
    setError(null);

    // This will redirect the user to the backend OAuth endpoint
    window.location.href = 'https://xeno-mini-crm-server.onrender.com/auth/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6 border border-gray-200 transform transition duration-500 ease-out opacity-100 scale-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to Xeno CRM
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to access your customer engagement platform
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center text-sm opacity-100 transition duration-300 ease-out">
            {error}
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-700 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <GoogleIcon />
              Login with Google
            </>
          )}
        </button>

        <div className="text-center text-gray-500 text-xs mt-6">
          Secure login powered by OAuth 2.0
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
