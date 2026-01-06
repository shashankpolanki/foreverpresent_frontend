import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SmsConsent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber && smsConsent) {
      setSubmitted(true);
    }
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-4 text-center">
            SMS Notifications
          </h1>
          <p className="text-navy-500 mb-12 text-center">
            Stay connected with appointment reminders and updates
          </p>

          {!submitted ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(555) 555-5555"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-navy-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* SMS Consent Checkbox */}
                <div className="bg-navy-50 rounded-xl p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                      required
                    />
                    <span className="text-navy-700 text-sm leading-relaxed">
                      I agree to receive appointment-related SMS messages from ForeverPresent. Message and data rates may apply. Reply STOP to unsubscribe.
                    </span>
                  </label>
                </div>

                {/* Disclosure Text */}
                <div className="text-xs text-navy-500 space-y-2">
                  <p>
                    By providing your phone number and checking the box above, you consent to receive text messages from ForeverPresent (operated by Automated Ventures LLC) regarding your appointments and account.
                  </p>
                  <p>
                    Message frequency varies. Standard message and data rates may apply. You can opt-out at any time by replying STOP to any message. For help, reply HELP or contact us at team@foreverpresent.ai.
                  </p>
                  <p>
                    View our <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!phoneNumber || !smsConsent}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Subscribe to SMS Updates
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">
                You're All Set!
              </h2>
              <p className="text-navy-600 mb-6">
                Thank you for subscribing to SMS notifications. You'll receive appointment reminders and important updates at {phoneNumber}.
              </p>
              <Link
                to="/"
                className="inline-block bg-primary-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Return Home
              </Link>
            </div>
          )}

          {/* Business Information Section */}
          <div className="mt-12 bg-navy-50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-navy-800 mb-3">Business Information</h3>
            <div className="text-sm text-navy-600 space-y-1">
              <p><strong>Automated Ventures LLC</strong> DBA ForeverPresent</p>
              <p>111 Town Square Pl, Jersey City, NJ 07310, USA</p>
              <p>Phone: <a href="tel:+15707347881" className="text-primary-600 hover:underline">+1 (570) 734-7881</a></p>
              <p>Email: <a href="mailto:team@foreverpresent.ai" className="text-primary-600 hover:underline">team@foreverpresent.ai</a></p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-serif font-semibold text-white">
                Forever<span className="text-champagne-400">Present</span>
              </div>
              <p className="text-navy-400 mt-2">Preserving memories, forever.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-navy-300 text-center md:text-right">
              <div className="flex gap-8 justify-center">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <a href="mailto:team@foreverpresent.ai" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-8 pt-8 text-center text-navy-400 text-sm space-y-2">
            <p className="text-navy-500">Automated Ventures LLC DBA ForeverPresent</p>
            <p className="text-navy-500">111 Town Square Pl, Jersey City, NJ 07310, USA | <a href="tel:+15707347881" className="hover:text-white">+1 (570) 734-7881</a> | <a href="mailto:team@foreverpresent.ai" className="hover:text-white">team@foreverpresent.ai</a></p>
            <p className="text-navy-500">&copy; {new Date().getFullYear()} ForeverPresent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SmsConsent;
