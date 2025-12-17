import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Conversation } from './cvi/components/conversation';
import { useDaily, useMeetingState, useParticipantIds } from '@daily-co/daily-react';
import { useReplicaIDs } from './cvi/hooks/use-replica-ids';
import { useObservableEvent } from './cvi/hooks/cvi-events-hooks';

export const ConversationWrapper = ({ conversationUrl, conversationId, introMessage, isFirstTime, idleMessages, maxDurationMinutes, creatorName, creatorUsername, onLeave, isDemo = false }) => {
  const daily = useDaily();
  const meetingState = useMeetingState();
  const participantIds = useParticipantIds();
  const replicaIds = useReplicaIDs();

  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [disconnectMessage, setDisconnectMessage] = useState('Ending call...');
  const [isReady, setIsReady] = useState(false);
  const [hasBeenReady, setHasBeenReady] = useState(false);
  const [introSent, setIntroSent] = useState(false);
  const [userSpokeFirst, setUserSpokeFirst] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [memoryText, setMemoryText] = useState('');

  // Use refs for activity tracking to avoid re-renders
  const lastActivityTimeRef = useRef(Date.now());
  const idleMessageSentRef = useRef(false);
  const isUserSpeakingRef = useRef(false);
  const isReplicaSpeakingRef = useRef(false);
  const inputRef = useRef(null);
  const introTimerRef = useRef(null);
  const contextTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const hardTimeoutRef = useRef(null);
  const introMessageSentRef = useRef(false);
  const creditWarningRef = useRef(null);
  const callStartTimeRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);
  const previousReplicaCountRef = useRef(0);

  // Real-time conversation monitoring
  useObservableEvent(useCallback((event) => {
    if (!event.event_type?.startsWith('conversation.')) return;

    if (event.event_type === 'conversation.user.started_speaking') {
      isUserSpeakingRef.current = true;
      lastActivityTimeRef.current = Date.now();
      idleMessageSentRef.current = false;

      if (hardTimeoutRef.current) {
        clearTimeout(hardTimeoutRef.current);
        hardTimeoutRef.current = null;
      }

      if (!userSpokeFirst) {
        setUserSpokeFirst(true);
        if (introTimerRef.current) {
          clearTimeout(introTimerRef.current);
          introTimerRef.current = null;
        }
      }
    } else if (event.event_type === 'conversation.user.stopped_speaking') {
      isUserSpeakingRef.current = false;
      lastActivityTimeRef.current = Date.now();
    } else if (event.event_type === 'conversation.replica.started_speaking') {
      isReplicaSpeakingRef.current = true;
      lastActivityTimeRef.current = Date.now();

      if (hardTimeoutRef.current) {
        clearTimeout(hardTimeoutRef.current);
        hardTimeoutRef.current = null;
      }
    } else if (event.event_type === 'conversation.replica.stopped_speaking') {
      isReplicaSpeakingRef.current = false;
      lastActivityTimeRef.current = Date.now();
    }
  }, [userSpokeFirst]));

  // Store conversation ID in localStorage
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('tavus_conversation_id', conversationId);
      localStorage.setItem('tavus_conversation_timestamp', new Date().toISOString());
    }
  }, [conversationId]);

  // Auto-scroll to bottom on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' });
    }
  }, []);

  // Monitor when ready to chat
  useEffect(() => {
    if (meetingState === 'joined-meeting' && replicaIds.length > 0) {
      const timer = setTimeout(() => {
        setIsReady(true);
        setHasBeenReady(true);
        callStartTimeRef.current = Date.now();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [meetingState, replicaIds]);

  // Send intro message after 10 seconds if user hasn't spoken
  useEffect(() => {
    if (meetingState === 'joined-meeting' && replicaIds.length > 0 && introMessage && !introMessageSentRef.current && !userSpokeFirst && daily) {
      const sendIntroMessage = () => {
        if (!introMessageSentRef.current && !userSpokeFirst) {
          introMessageSentRef.current = true;
          setIntroSent(true);

          daily.sendAppMessage({
            message_type: "conversation",
            event_type: "conversation.respond",
            conversation_id: conversationId,
            properties: {
              text: introMessage
            }
          }, '*');
        }
      };

      introTimerRef.current = setTimeout(sendIntroMessage, 10000);

      return () => {
        if (introTimerRef.current) {
          clearTimeout(introTimerRef.current);
          introTimerRef.current = null;
        }
      };
    }
  }, [meetingState, replicaIds, introMessage, userSpokeFirst, daily, conversationId]);

  const handleSendMessage = async () => {
    if (!userSpokeFirst) {
      setUserSpokeFirst(true);
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
        introTimerRef.current = null;
      }
    }

    lastActivityTimeRef.current = Date.now();
    idleMessageSentRef.current = false;
    if (hardTimeoutRef.current) {
      clearTimeout(hardTimeoutRef.current);
      hardTimeoutRef.current = null;
    }

    if (!message.trim() || isSending || !conversationId || !daily || !isReady) {
      inputRef.current?.focus();
      return;
    }

    const userMessage = message.trim();
    setMessage('');
    setIsSending(true);

    try {
      const interaction = {
        message_type: "conversation",
        event_type: "conversation.respond",
        conversation_id: conversationId,
        properties: {
          text: userMessage
        }
      };

      await daily.sendAppMessage(interaction, '*');
      console.log('Message sent:', userMessage);

    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage();
      }
    }
  };

  const handleAddMemory = useCallback(() => {
    setShowMemoryModal(true);
  }, []);

  const handleSubmitMemory = useCallback(async () => {
    if (!memoryText.trim() || !daily || !conversationId) return;

    try {
      // Append context to the conversation
      await daily.sendAppMessage({
        message_type: "conversation",
        event_type: "conversation.append_llm_context",
        conversation_id: conversationId,
        properties: {
          context: `Additional memory/context shared by the user: ${memoryText.trim()}`
        }
      }, '*');

      console.log('Memory context added:', memoryText.trim());
      setMemoryText('');
      setShowMemoryModal(false);
    } catch (error) {
      console.error('Failed to add memory context:', error);
    }
  }, [memoryText, daily, conversationId]);

  const handleLeave = useCallback((reason = 'user_ended') => {
    let message = 'Ending call...';

    if ((reason === 'meeting_error' || reason === 'meeting_ended') && maxDurationMinutes && callStartTimeRef.current) {
      const elapsed = Date.now() - callStartTimeRef.current;
      const maxDurationMs = maxDurationMinutes * 60 * 1000;
      if (elapsed >= maxDurationMs * 0.5) {
        reason = 'credits_expired';
      }
    }

    if (reason === 'credits_expired') {
      message = 'Your session has ended';
    } else if (reason === 'meeting_error') {
      message = 'Connection lost';
    }

    setDisconnectMessage(message);
    setIsDisconnecting(true);

    if (creditWarningRef.current) {
      clearTimeout(creditWarningRef.current);
    }
    setTimeout(() => {
      onLeave(reason);
    }, 200);
  }, [onLeave, maxDurationMinutes]);

  // Detect replica leaving
  useEffect(() => {
    const currentReplicaCount = replicaIds.length;
    const previousReplicaCount = previousReplicaCountRef.current;

    if (previousReplicaCount > 0 && currentReplicaCount === 0 && hasBeenReady && callStartTimeRef.current) {
      const elapsed = Date.now() - callStartTimeRef.current;

      if (elapsed > 15000) {
        let endReason = 'meeting_ended';
        if (maxDurationMinutes) {
          const maxDurationMs = maxDurationMinutes * 60 * 1000;
          if (elapsed >= maxDurationMs * 0.5) {
            endReason = 'credits_expired';
          }
        }
        handleLeave(endReason);
      }
    }

    previousReplicaCountRef.current = currentReplicaCount;
  }, [replicaIds, hasBeenReady, maxDurationMinutes, handleLeave]);

  // Idle detection system
  useEffect(() => {
    if (meetingState === 'joined-meeting' && daily && conversationId && idleMessages && idleMessages.length > 0) {
      const checkIdleStatus = () => {
        const now = Date.now();
        const timeSinceActivity = now - lastActivityTimeRef.current;

        if (isUserSpeakingRef.current || isReplicaSpeakingRef.current) {
          return;
        }

        if (timeSinceActivity >= 20000 && !idleMessageSentRef.current) {
          const randomIdleMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)];

          daily.sendAppMessage({
            message_type: "conversation",
            event_type: "conversation.interrupt",
            conversation_id: conversationId
          }, '*');

          setTimeout(() => {
            daily.sendAppMessage({
              message_type: "conversation",
              event_type: "conversation.echo",
              conversation_id: conversationId,
              properties: {
                modality: "text",
                text: randomIdleMessage
              }
            }, '*');
          }, 100);

          idleMessageSentRef.current = true;
        }

        if (timeSinceActivity >= 60000) {
          handleLeave();
        }
      };

      const interval = setInterval(checkIdleStatus, 1000);

      return () => {
        clearInterval(interval);
        if (hardTimeoutRef.current) {
          clearTimeout(hardTimeoutRef.current);
        }
      };
    }
  }, [meetingState, daily, conversationId, idleMessages, handleLeave]);

  // Heartbeat to track active session
  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !conversationId) return;

        const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        await fetch(`${backendUrl}/api/heartbeat/${conversationId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        // Silently handle heartbeat errors
      }
    };

    sendHeartbeat();
    heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000);

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [conversationId]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-navy-50 to-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 px-8 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-serif font-semibold">
            <span className="text-navy-900">Forever</span>
            <span className="text-champagne-500">Present</span>
          </div>
          <div className="flex items-center gap-2">
            {isReady ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-navy-600 text-sm">Connected</span>
              </>
            ) : hasBeenReady && maxDurationMinutes && callStartTimeRef.current ? (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-navy-600 text-sm">Ending call...</span>
              </>
            ) : meetingState === 'joined-meeting' ? (
              <>
                <div className="w-2 h-2 bg-champagne-500 rounded-full animate-pulse"></div>
                <span className="text-navy-600 text-sm">Connecting...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-champagne-500 rounded-full animate-pulse"></div>
                <span className="text-navy-600 text-sm">Connecting...</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="absolute inset-0 pt-16 pb-16">
        <div className="w-full h-full">
          <Conversation
            conversationUrl={conversationUrl}
            creatorName={creatorName}
            onLeave={handleLeave}
            isDisconnecting={isDisconnecting}
            maxDurationMinutes={maxDurationMinutes}
            callStartTime={callStartTimeRef.current}
            onAddMemory={handleAddMemory}
          />
        </div>
      </div>

      {/* Disconnecting overlay */}
      {isDisconnecting && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="animate-spin text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <p className="text-navy-900 text-lg font-medium">{disconnectMessage}</p>
          </div>
        </div>
      )}

      {/* Memory Modal */}
      {showMemoryModal && (
        <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-semibold text-navy-900">Share a Memory</h3>
              <button
                onClick={() => {
                  setShowMemoryModal(false);
                  setMemoryText('');
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-navy-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-navy-600 text-sm mb-4">
              Share additional context or a memory to enrich the conversation.
            </p>
            <textarea
              value={memoryText}
              onChange={(e) => setMemoryText(e.target.value)}
              placeholder="e.g., Remember when we went to the beach last summer..."
              className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowMemoryModal(false);
                  setMemoryText('');
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-navy-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMemory}
                disabled={!memoryText.trim()}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  memoryText.trim()
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add Memory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat input - with gradient to cover video bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pt-8 pb-4 px-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200/50 shadow-sm">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isReady ? "Type a message or start speaking..." : "Connecting..."}
              disabled={isSending || !isReady}
              className="flex-1 px-2 py-1.5 bg-transparent text-sm text-navy-900 placeholder-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isSending || !isReady}
              className={`p-2 rounded-full transition-all duration-200 transform flex-shrink-0 ${
                message.trim() && !isSending && isReady
                  ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isSending ? (
                <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
