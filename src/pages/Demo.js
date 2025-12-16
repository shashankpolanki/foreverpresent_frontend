import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ConversationWrapper } from '../components/ConversationWrapper';
import { HairCheck } from '../components/cvi/components/hair-check';
import PasswordModal from '../components/PasswordModal';
import PreCallInstructionsModal from '../components/PreCallInstructionsModal';
import AddMemoryModal from '../components/AddMemoryModal';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Demo() {
  const { username: urlUsername } = useParams();
  const username = urlUsername || 'grandmademo'; // Default to grandmademo
  const [isLoading, setIsLoading] = useState(false);
  const [conversationUrl, setConversationUrl] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [showHairCheck, setShowHairCheck] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [credits, setCredits] = useState(0);
  const [isCancelling, setIsCancelling] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [isLoadingCreator, setIsLoadingCreator] = useState(false);
  const [showPreCallInstructions, setShowPreCallInstructions] = useState(false);
  const [finishedFirstCall, setFinishedFirstCall] = useState(false);
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);

  // Check for existing token on mount and fetch creator info if username provided
  useEffect(() => {
    const token = localStorage.getItem('demo_token');
    const storedCredits = localStorage.getItem('demo_credits');
    const storedFinishedFirstCall = localStorage.getItem('demo_finished_first_call');
    if (token) {
      setAuthToken(token);
      setCredits(parseInt(storedCredits) || 0);
      setFinishedFirstCall(storedFinishedFirstCall === 'true');
    }

    // Only fetch creator info for non-default demos (skip for grandmademo since we hardcode it)
    if (username && username !== 'grandmademo') {
      fetchCreatorInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchCreatorInfo = async () => {
    setIsLoadingCreator(true);
    try {
      const response = await axios.get(`${API_URL}/api/creator/${username}`);
      setCreatorInfo(response.data);
    } catch (err) {
      console.error('Error fetching creator info:', err);
      if (err.response?.status === 404) {
        setError(`Profile '${username}' not found`);
      }
    } finally {
      setIsLoadingCreator(false);
    }
  };

  const handleStartClick = () => {
    // Check if we have a valid token
    if (!authToken) {
      setShowPasswordModal(true);
    } else {
      // Always show pre-call instructions
      setShowPreCallInstructions(true);
    }
  };

  const handlePreCallContinue = async () => {
    setShowPreCallInstructions(false);

    // Mark first call as complete in backend and localStorage
    try {
      await axios.post(
        `${API_URL}/api/demo/mark-first-call-complete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      setFinishedFirstCall(true);
      localStorage.setItem('demo_finished_first_call', 'true');
    } catch (err) {
      console.error('Error marking first call complete:', err);
      // Non-critical error, continue anyway
      setFinishedFirstCall(true);
      localStorage.setItem('demo_finished_first_call', 'true');
    }

    // Start the call
    if (authToken) {
      startVideoCallWithToken(authToken);
    } else {
      startVideoCall();
    }
  };

  const handleAuthenticated = async (authData) => {
    setAuthToken(authData.token);
    setCredits(authData.credits);
    const isFirstCall = !authData.finished_first_call;
    setFinishedFirstCall(!isFirstCall);

    // Store in localStorage for future sessions
    localStorage.setItem('demo_finished_first_call', (!isFirstCall).toString());

    setShowPasswordModal(false);

    // After password authentication, always show pre-call instructions
    setTimeout(() => {
      setShowPreCallInstructions(true);
    }, 100);
  };

  const startVideoCallWithToken = async (token) => {
    if (!token) {
      setShowPasswordModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requestData = username ? { creator_username: username } : {};
      const response = await axios.post(
        `${API_URL}/api/demo/start-call`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.conversation_url) {
        setConversationUrl(response.data.conversation_url);
        setConversationId(response.data.conversation_id);
        setCredits(response.data.credits_left);
        localStorage.setItem('demo_credits', response.data.credits_left);
        setShowHairCheck(true);
      }
    } catch (err) {
      console.error('Error starting video call:', err);
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('demo_token');
        localStorage.removeItem('demo_credits');
        setAuthToken(null);
        setShowPasswordModal(true);
      } else if (err.response?.status === 403) {
        setError('No credits remaining. Please contact hello@foreverpresent.ai');
      } else {
        setError((err.response?.data?.detail || 'Failed to start video call') + '. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startVideoCall = async () => {
    if (!authToken) {
      setShowPasswordModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requestData = username ? { creator_username: username } : {};
      const response = await axios.post(
        `${API_URL}/api/demo/start-call`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      if (response.data.conversation_url) {
        setConversationUrl(response.data.conversation_url);
        setConversationId(response.data.conversation_id);
        setCredits(response.data.credits_left);
        localStorage.setItem('demo_credits', response.data.credits_left);
        setShowHairCheck(true);
      }
    } catch (err) {
      console.error('Error starting video call:', err);
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('demo_token');
        localStorage.removeItem('demo_credits');
        setAuthToken(null);
        setShowPasswordModal(true);
      } else if (err.response?.status === 403) {
        setError('No credits remaining. Please contact hello@foreverpresent.ai');
      } else {
        setError((err.response?.data?.detail || 'Failed to start video call') + '. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const endVideoCall = async () => {
    setIsCancelling(true);
    if (conversationId && authToken) {
      try {
        const response = await axios.post(
          `${API_URL}/api/demo/end-call/${conversationId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }
        );

        if (response.data.credits_remaining !== undefined) {
          setCredits(response.data.credits_remaining);
          localStorage.setItem('demo_credits', response.data.credits_remaining);
        }
      } catch (err) {
        console.error('Error ending video call:', err);
      }
    }

    setConversationUrl(null);
    setConversationId(null);
    setIsInCall(false);
    setShowHairCheck(false);
    setIsJoining(false);
    setError(null);
    setIsCancelling(false);
  };

  // Show loading state while fetching creator info
  if (isLoadingCreator) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <p className="text-navy-500">Loading demo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {!isInCall && !showHairCheck ? (
        <>
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
            <Link to="/" className="text-2xl font-serif font-semibold">
              <span className="text-navy-900">Forever</span>
              <span className="text-champagne-500">Present</span>
            </Link>
            <Link to="/" className="px-6 py-2 border border-primary-500/50 rounded-full text-primary-600 hover:bg-primary-50 transition-all">
              Back to Home
            </Link>
          </header>

          {/* Demo Landing */}
          <div className="relative min-h-screen flex items-center justify-center">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-champagne-100 rounded-full blur-3xl opacity-40"></div>
            </div>

            {/* Demo content */}
            <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
              {/* Decorative icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary-100 to-champagne-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 text-navy-900">
                {username === 'grandmademo' ? 'Connect with Grandma Demo' : (creatorInfo ? `Connect with ${creatorInfo.full_name}` : 'Connect with Grandma Demo')}
              </h1>
              <p className="text-xl md:text-2xl text-navy-500 mb-12 max-w-xl mx-auto">
                {creatorInfo
                  ? `A meaningful AI experience that preserves their presence`
                  : 'See how ForeverPresent can help preserve your loved one\'s memory'}
              </p>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                {/* Main CTA Button */}
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

                {/* Add More Memories Button - Secondary */}
                <button
                  onClick={() => setShowAddMemoryModal(true)}
                  className="w-full group px-8 py-4 rounded-2xl text-base font-medium transition-all bg-white border border-gray-200 text-navy-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 shadow-sm hover:shadow"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add More Memories
                  </span>
                </button>
              </div>

              {credits > 0 && authToken && (
                <p className="mt-4 text-sm text-primary-500">
                  {credits} minute{credits !== 1 ? 's' : ''} remaining
                </p>
              )}

              <p className="mt-8 text-sm text-navy-400">
                Need access? Email hello@foreverpresent.ai
              </p>
            </div>
          </div>
        </>
      ) : showHairCheck && !isInCall ? (
        <div className="fixed inset-0 bg-navy-900 overflow-hidden">
          {/* Hair Check / Waiting Room - Full Screen */}
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

            {/* Cancel button overlay */}
            <button
              onClick={endVideoCall}
              disabled={isCancelling}
              className="absolute top-4 right-4 z-50 px-5 py-2 bg-red-500/80 hover:bg-red-500 backdrop-blur border border-red-500/50 rounded-full text-white transition-all text-sm md:text-base md:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
            creatorUsername={username}
            onLeave={endVideoCall}
            isDemo={true}
          />
        </div>
      ) : null}

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          onAuthenticated={handleAuthenticated}
          onCancel={() => setShowPasswordModal(false)}
        />
      )}

      {/* Pre-Call Instructions Modal (First-time users only) */}
      {showPreCallInstructions && (
        <PreCallInstructionsModal
          onContinue={handlePreCallContinue}
        />
      )}

      {/* Add Memory Modal */}
      {showAddMemoryModal && (
        <AddMemoryModal
          onClose={() => setShowAddMemoryModal(false)}
          onSubmit={(memory) => {
            console.log('Memory submitted:', memory);
            setShowAddMemoryModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Demo;
