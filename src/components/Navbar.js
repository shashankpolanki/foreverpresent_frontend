import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-semibold text-navy-900">
              Forever<span className="text-champagne-500">Present</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/testimonials" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Testimonials
            </Link>
            <Link to="/demo" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Demo
            </Link>
            <a href="https://api.foreverpresent.ai/widget/bookings/forever-present" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <a
              href="https://api.foreverpresent.ai/widget/bookings/forever-present" target="_blank" rel="noopener noreferrer"
              className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              Call Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/testimonials"
                className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                to="/demo"
                className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
              <a
                href="https://api.foreverpresent.ai/widget/bookings/forever-present"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  to="/sign-in"
                  className="text-navy-600 hover:text-navy-900 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <a
                  href="https://api.foreverpresent.ai/widget/bookings/forever-present" target="_blank" rel="noopener noreferrer"
                  className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium text-center hover:bg-primary-700 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
