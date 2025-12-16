import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function PasswordModal({ onAuthenticated, onCancel }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/demo/authenticate`, {
        password: password
      });

      if (response.data.access_token) {
        // Store token in localStorage
        localStorage.setItem('demo_token', response.data.access_token);
        localStorage.setItem('demo_credits', response.data.credits_left);

        // Call the callback to update parent state
        onAuthenticated({
          token: response.data.access_token,
          credits: response.data.credits_left,
          finished_first_call: response.data.finished_first_call
        });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response?.status === 403) {
        setError('No credits remaining. Please contact hello@foreverpresent.ai');
      } else if (err.response?.status === 401) {
        setError('Invalid password. Please try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
      setIsLoading(false); // Only reset loading on error
    }
    // Don't reset isLoading on success to prevent re-submission
  };

  return (
    <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
        <h2 className="text-2xl font-serif font-semibold mb-2 text-navy-900">
          Demo Access Required
        </h2>
        <p className="text-navy-500 mb-6 text-sm">
          Enter your access password to start the demo
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter demo password"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            autoFocus
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading || !password}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isLoading || !password
                  ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Access Demo'
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl font-semibold border border-gray-200 text-navy-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-navy-400 text-center">
          Need access? Contact hello@foreverpresent.ai
        </p>
      </div>
    </div>
  );
}

export default PasswordModal;
