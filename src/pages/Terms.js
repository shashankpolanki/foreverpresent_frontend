import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Terms() {
  useEffect(() => {
    document.title = 'ForeverPresent.ai - Terms of Service';
    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://foreverpresent.ai/terms';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-navy-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none text-navy-700">
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using ForeverPresent's services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services. These Terms constitute a legally binding agreement between you and ForeverPresent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">2. Eligibility</h2>
              <div className="bg-champagne-50 border border-champagne-200 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">User Age Requirement</h3>
                <p className="text-navy-700 mb-0">
                  <strong>You must be at least 18 years of age to use our Services.</strong> By using ForeverPresent, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms. We do not knowingly provide services to individuals under 18.
                </p>
              </div>
              <div className="bg-champagne-50 border border-champagne-200 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Deceased Individual Age Requirement</h3>
                <p className="text-navy-700 mb-0">
                  <strong>ForeverPresent only provides AI memorial services for deceased individuals who were 18 years of age or older at the time of their passing.</strong> We do not create AI likenesses, digital representations, or memorial content for deceased minors under any circumstances.
                </p>
              </div>
              <p>
                By creating an account, you confirm that all information you provide is accurate, current, and complete.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">3. Authorization and Consent</h2>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">Estate Authority Representation</h3>
                <p className="text-navy-700 mb-4">
                  By using our Services to create an AI memorial or digital likeness of a deceased individual, <strong>you represent and warrant that:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-navy-700">
                  <li>You are the legal estate representative, executor, administrator, or have been duly authorized by the estate to create such digital content</li>
                  <li>You have obtained all necessary consents and permissions from relevant family members and/or estate beneficiaries</li>
                  <li>You have the legal right and authority to use the deceased individual's likeness, voice, and personal information for the purposes of our Services</li>
                  <li>Your use of our Services does not violate any existing agreements, court orders, or legal obligations</li>
                </ul>
              </div>
              <p>
                ForeverPresent relies on your representation of authority in good faith. You agree to indemnify and hold harmless ForeverPresent from any claims arising from misrepresentation of your authority or unauthorized use of a deceased individual's likeness.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">4. Geographic Restrictions</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Service Limitations</h3>
                <p className="text-navy-700 mb-4">
                  Due to state-specific post-mortem right of publicity laws, <strong>ForeverPresent does not provide Services for deceased individuals who were domiciled in the following states at the time of death:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-navy-700">
                  <li><strong>California</strong></li>
                  <li><strong>Tennessee</strong></li>
                  <li><strong>Indiana</strong></li>
                </ul>
                <p className="text-navy-700 mt-4 mb-0">
                  By using our Services, you confirm that the deceased individual whose likeness you wish to memorialize was not domiciled in any of the above states at the time of their passing.
                </p>
              </div>
              <p>
                "Domiciled" refers to the state where the deceased individual had their permanent legal residence at the time of death, regardless of where they may have passed away.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">5. Description of Services</h2>
              <p>
                ForeverPresent provides AI-powered memorial services that allow users to create and interact with digital representations of deceased loved ones. Our Services may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI video call experiences</li>
                <li>Personalized video messages</li>
                <li>Memory preservation and storytelling</li>
                <li>Related products and features</li>
              </ul>
              <p className="mt-4">
                Our AI-generated content is intended for personal, non-commercial memorial purposes only. The digital representations are simulations and do not represent actual communications from deceased individuals.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">6. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our Services only for lawful purposes</li>
                <li>Not misrepresent your authority or relationship to the deceased</li>
                <li>Not use our Services to create content that is defamatory, harmful, or offensive</li>
                <li>Not attempt to reverse engineer, copy, or redistribute our technology</li>
                <li>Not use our Services for any commercial purpose without our written consent</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">7. Intellectual Property</h2>
              <p>
                <strong>Your Content:</strong> You retain ownership of any photos, videos, recordings, and information you provide to us ("Your Content"). By uploading Your Content, you grant ForeverPresent a limited, non-exclusive license to use, process, and display Your Content solely to provide the Services.
              </p>
              <p className="mt-4">
                <strong>Our Technology:</strong> ForeverPresent and its licensors own all rights to our platform, AI models, software, and technology. Nothing in these Terms grants you any rights to our intellectual property except the limited right to use the Services as described herein.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">8. Payment and Billing</h2>
              <p>
                Certain features of our Services may require payment. By purchasing Services, you agree to pay all applicable fees. All payments are processed through secure third-party payment processors. Fees are non-refundable except as required by law or as specified in our refund policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">9. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. AI-GENERATED CONTENT MAY NOT PERFECTLY REPLICATE THE LIKENESS, VOICE, OR PERSONALITY OF THE DECEASED INDIVIDUAL.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FOREVERPRESENT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless ForeverPresent and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your violation of these Terms</li>
                <li>Your misrepresentation of authority over the deceased's estate or likeness</li>
                <li>Any third-party claims related to Your Content</li>
                <li>Your violation of any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">12. Termination</h2>
              <p>
                We may suspend or terminate your access to the Services at any time for any reason, including violation of these Terms. Upon termination, your right to use the Services will immediately cease. Sections of these Terms that by their nature should survive termination shall survive.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">13. Dispute Resolution</h2>
              <p>
                Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to waive your right to a jury trial and to participate in class action lawsuits.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">15. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms and changing the "Last updated" date. Your continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-semibold text-navy-900 mb-4">16. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-navy-50 rounded-xl">
                <p className="font-semibold text-navy-900">ForeverPresent</p>
                <p>Email: legal@foreverpresent.ai</p>
                <p>General Inquiries: team@foreverpresent.ai</p>
              </div>
            </section>

            <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-navy-600 italic mb-0">
                By using ForeverPresent's Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
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

export default Terms;
