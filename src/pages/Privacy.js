import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-navy-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none text-navy-700">
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">1. Introduction</h2>
              <p>
                ForeverPresent ("we," "our," or "us") is committed to protecting your privacy and the privacy of your loved ones. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI memorial and legacy preservation services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Personal Information</h3>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Account credentials</li>
                <li>Payment and billing information</li>
                <li>Communications with us</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">Memorial Content</h3>
              <p>With your explicit consent, we collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Photos and videos of your loved one</li>
                <li>Audio recordings and voice samples</li>
                <li>Written stories, memories, and biographical information</li>
                <li>Personality traits, mannerisms, and speech patterns you provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information and identifiers</li>
                <li>Browser type and settings</li>
                <li>Usage data and interaction logs</li>
                <li>IP address and location data</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and maintain your AI memorial experience</li>
                <li>Process transactions and send related information</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve and personalize our services</li>
                <li>Send administrative information and service updates</li>
                <li>Protect against fraudulent or illegal activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure cloud infrastructure with access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">5. Data Retention</h2>
              <p>
                We retain your personal information and memorial content for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by contacting us. Upon account termination, we will delete or anonymize your information within 90 days, unless retention is required by law.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">6. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third parties who assist in operating our services (cloud hosting, payment processing, customer support)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@foreverpresent.ai.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">9. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Disabling cookies may limit functionality of our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">11. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-navy-50 rounded-xl">
                <p className="font-semibold text-navy-900">ForeverPresent</p>
                <p>Email: privacy@foreverpresent.ai</p>
                <p>General Inquiries: team@foreverpresent.ai</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
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
            <div className="flex gap-8 text-navy-300">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="mailto:team@foreverpresent.ai" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-8 pt-8 text-center text-navy-500 text-sm">
            &copy; {new Date().getFullYear()} ForeverPresent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Privacy;
