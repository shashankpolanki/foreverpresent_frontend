import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ThankYouBuyVideo() {
  useEffect(() => {
    document.title = 'ForeverPresent.ai - Thank You';
    // Facebook Pixel Purchase event
    if (window.fbq) {
      window.fbq('track', 'Purchase', { value: 49.00, currency: 'USD' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Logo Top Left */}
      <header className="py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="flex items-center w-fit">
            <img
              src="/logo_infinity.png"
              alt="ForeverPresent"
              className="h-12 md:h-14 w-auto -mr-5"
            />
            <span className="text-xl md:text-2xl font-serif font-semibold text-navy-900">
              Forever<span className="text-champagne-500">Present</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Thank You Content */}
      <section className="px-6 py-20 bg-gradient-hero min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-navy-900 mb-6">
            Thank You for Your Purchase
          </h1>

          <p className="text-lg md:text-xl text-navy-700 mb-8 max-w-xl mx-auto">
            A team member will be in touch with you over email today with next steps.
          </p>

          <div className="bg-champagne-50 rounded-2xl p-6 mb-8 border border-champagne-200">
            <p className="text-navy-700">
              Have questions? Email us directly at{' '}
              <a
                href="mailto:team@foreverpresent.ai"
                className="text-primary-600 font-semibold hover:underline"
              >
                team@foreverpresent.ai
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xl font-serif font-semibold text-white mb-3">
              Forever<span className="text-champagne-400">Present</span>
            </div>
            <div className="flex justify-center gap-6 text-navy-300 text-sm mb-3">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="mailto:team@foreverpresent.ai" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-navy-500 text-xs">
              © {new Date().getFullYear()} ForeverPresent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ThankYouBuyVideo;
