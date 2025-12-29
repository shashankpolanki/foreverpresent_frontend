import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ConversationWrapper } from '../components/ConversationWrapper';
import { HairCheck } from '../components/cvi/components/hair-check';
import PreCallInstructionsModal from '../components/PreCallInstructionsModal';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Hide chat widget on demo page (GoHighLevel/Lead Connector widget)
const hideChatWidget = () => {
  // Try multiple selectors for the chat widget
  const selectors = [
    'chat-widget',
    '[data-widget-id]',
    '.lc_text-widget',
    'iframe[src*="leadconnectorhq"]',
    'iframe[src*="widgets"]',
    '#chat-widget',
    '.chat-widget'
  ];

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
    });
  });

  // Also hide any fixed position elements at bottom right that might be the widget
  document.querySelectorAll('iframe').forEach(iframe => {
    if (iframe.src && iframe.src.includes('leadconnector')) {
      iframe.style.display = 'none';
    }
  });
};

const showChatWidget = () => {
  const selectors = [
    'chat-widget',
    '[data-widget-id]',
    '.lc_text-widget',
    'iframe[src*="leadconnectorhq"]',
    'iframe[src*="widgets"]',
    '#chat-widget',
    '.chat-widget'
  ];

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.display = '';
      el.style.visibility = '';
    });
  });

  document.querySelectorAll('iframe').forEach(iframe => {
    if (iframe.src && iframe.src.includes('leadconnector')) {
      iframe.style.display = '';
    }
  });
};

// Demo configuration
const DEMO_USERNAME = 'angelina';
const DEMO_TITLE = 'Connect with Mom Demo';
const DEMO_DURATION_SECONDS = 180; // 3 minutes

function Demo() {
  // Lead capture modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadData, setLeadData] = useState({
    email: '',
    familyMember: ''
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Call state
  const [isLoading, setIsLoading] = useState(false);
  const [conversationUrl, setConversationUrl] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [showHairCheck, setShowHairCheck] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showPreCallInstructions, setShowPreCallInstructions] = useState(false);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(DEMO_DURATION_SECONDS);
  const timerRef = useRef(null);
  const callStartTimeRef = useRef(null);

  // Thank you modal state
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const familyMemberOptions = [
    { id: 'mother', label: 'Mother' },
    { id: 'father', label: 'Father' },
    { id: 'spouse', label: 'Spouse/Partner' },
    { id: 'grandparent', label: 'Grandparent' },
    { id: 'child', label: 'Child' },
    { id: 'sibling', label: 'Sibling' },
    { id: 'other', label: 'Other family member' },
    { id: 'demo', label: 'Just trying out the demo' },
  ];

  // Hide chat widget on demo page (runs repeatedly to catch async-loaded widget)
  useEffect(() => {
    hideChatWidget();

    // Keep trying to hide it in case it loads after initial render
    const hideInterval = setInterval(hideChatWidget, 500);

    // Stop checking after 5 seconds
    const timeout = setTimeout(() => clearInterval(hideInterval), 5000);

    return () => {
      clearInterval(hideInterval);
      clearTimeout(timeout);
      showChatWidget();
    };
  }, []);

  // Timer effect - counts down when in call
  useEffect(() => {
    if (isInCall && !timerRef.current) {
      callStartTimeRef.current = Date.now();

      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
        const remaining = Math.max(0, DEMO_DURATION_SECONDS - elapsed);
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          endVideoCall(true);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isInCall]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartClick = () => {
    setShowLeadModal(true);
  };

  const handleLeadInputChange = (e) => {
    const { name, value } = e.target;
    setLeadData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      // Send to GoHighLevel webhook
      const GHL_WEBHOOK_URL = process.env.REACT_APP_GHL_WEBHOOK_URL;

      if (GHL_WEBHOOK_URL) {
        await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: leadData.email,
            family_member_lost: leadData.familyMember,
            source: 'demo_page',
            timestamp: new Date().toISOString()
          }),
        });
      }

      localStorage.setItem('demo_lead', JSON.stringify(leadData));
      setShowLeadModal(false);
      setShowPreCallInstructions(true);
    } catch (err) {
      console.error('Error submitting lead:', err);
      setShowLeadModal(false);
      setShowPreCallInstructions(true);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handlePreCallContinue = async () => {
    setShowPreCallInstructions(false);
    startVideoCall();
  };

  const startVideoCall = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/demo/start-public-call`,
        {
          creator_username: DEMO_USERNAME,
          lead_email: leadData.email
        }
      );

      if (response.data.conversation_url) {
        setConversationUrl(response.data.conversation_url);
        setConversationId(response.data.conversation_id);
        setShowHairCheck(true);
      }
    } catch (err) {
      console.error('Error starting video call:', err);
      setError((err.response?.data?.detail || 'Failed to start video call') + '. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const endVideoCall = async (timerExpired = false) => {
    setIsCancelling(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (conversationId) {
      try {
        await axios.post(`${API_URL}/api/demo/end-public-call/${conversationId}`);
      } catch (err) {
        console.error('Error ending video call:', err);
      }
    }

    setConversationUrl(null);
    setConversationId(null);
    setIsInCall(false);
    setShowHairCheck(false);
    setIsJoining(false);
    setIsCancelling(false);
    setTimeRemaining(DEMO_DURATION_SECONDS);

    if (timerExpired || (callStartTimeRef.current && Date.now() - callStartTimeRef.current > 10000)) {
      setShowThankYouModal(true);
    }
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.foreverpresent.ai/widget/bookings/forever-present', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {!isInCall && !showHairCheck ? (
        <>
          <Navbar />

          {/* Demo Landing */}
          <div className="relative min-h-screen flex items-center justify-center pt-16">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-champagne-100 rounded-full blur-3xl opacity-40"></div>
            </div>

            {/* Demo content */}
            <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
              {/* Mom image */}
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-champagne-400 shadow-xl">
                <img
                  src="/mom_img.png"
                  alt="Mom"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 text-navy-900">
                {DEMO_TITLE}
              </h1>
              <p className="text-xl md:text-2xl text-navy-500 mb-12 max-w-xl mx-auto">
                See how ForeverPresent can help preserve your loved one's memory
              </p>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                <button
                  onClick={handleStartClick}
                  disabled={isLoading}
                  className={`
                    w-full group relative px-8 py-4 rounded-2xl text-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]
                    ${isLoading
                      ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Start Video Call
                      </>
                    )}
                  </span>
                </button>
              </div>

              <p className="mt-8 text-sm text-navy-400">
                3-minute demo experience
              </p>
            </div>
          </div>
        </>
      ) : showHairCheck && !isInCall ? (
        <div className="fixed inset-0 bg-navy-900 overflow-hidden">
          <div className="relative w-full h-full">
            <HairCheck
              conversationUrl={conversationUrl}
              isJoinBtnLoading={isJoining}
              onJoin={() => {
                setIsJoining(true);
                setTimeout(() => {
                  setIsInCall(true);
                  setShowHairCheck(false);
                  setIsJoining(false);
                }, 3000);
              }}
              onCancel={endVideoCall}
            />

            <button
              onClick={() => endVideoCall(false)}
              disabled={isCancelling}
              className="fixed top-4 right-4 z-50 px-5 py-2 bg-red-500/80 hover:bg-red-500 backdrop-blur border border-red-500/50 rounded-full text-white transition-all text-sm md:text-base md:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCancelling ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Cancelling...
                </span>
              ) : (
                'Cancel'
              )}
            </button>
          </div>
        </div>
      ) : isInCall ? (
        <div className="relative w-full h-screen">
          <ConversationWrapper
            conversationUrl={conversationUrl}
            conversationId={conversationId}
            creatorUsername={DEMO_USERNAME}
            creatorName="Mom"
            onLeave={() => endVideoCall(false)}
            isDemo={true}
            maxDurationMinutes={DEMO_DURATION_SECONDS / 60}
          />
        </div>
      ) : null}

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-navy-900">
                Before we begin...
              </h2>
              <button
                onClick={() => setShowLeadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-navy-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-navy-600 mb-6">
              Tell us a bit about yourself so we can personalize your experience.
            </p>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={leadData.email}
                  onChange={handleLeadInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-navy-900"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="familyMember" className="block text-sm font-medium text-navy-700 mb-1">
                  Who have you lost?
                </label>
                <select
                  id="familyMember"
                  name="familyMember"
                  value={leadData.familyMember}
                  onChange={handleLeadInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-navy-900 bg-white"
                >
                  <option value="">Select an option</option>
                  {familyMemberOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-navy-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingLead ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-xs text-navy-400">
              By continuing, you agree to our{' '}
              <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      )}

      {/* Pre-Call Instructions Modal */}
      {showPreCallInstructions && (
        <PreCallInstructionsModal
          onContinue={handlePreCallContinue}
        />
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-navy-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl text-center">
            {/* Success icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl font-serif font-semibold text-navy-900 mb-4">
              Thank You for Trying ForeverPresent
            </h2>

            <p className="text-navy-600 mb-6 leading-relaxed">
              You just experienced a glimpse of what's possible. Imagine having meaningful conversations with your loved one anytime you need them - hearing their voice, seeing their face, feeling their presence.
            </p>

            <div className="bg-champagne-50 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-navy-900 mb-2">What We Can Create For You:</h3>
              <ul className="text-navy-600 text-left space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited video calls with your loved one's AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Their actual voice, mannerisms, and personality</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Daily good morning/good night messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Preserved memories for future generations</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleScheduleCall}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Consultation
            </button>

            <button
              onClick={() => setShowThankYouModal(false)}
              className="text-navy-500 hover:text-navy-700 text-sm transition-colors"
            >
              Try the demo again
            </button>

            <p className="mt-6 text-sm text-navy-400">
              No commitment required
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Demo;
