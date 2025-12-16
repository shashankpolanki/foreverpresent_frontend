import React, { useState, useEffect } from 'react';

function PreCallInstructionsModal({ onContinue }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-continue when countdown reaches 0
    if (countdown === 0) {
      onContinue();
      return;
    }

    // Decrement countdown every second
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onContinue]);

  // Calculate progress percentage for the circular ring
  const progress = ((5 - countdown) / 5) * 100;
  const circumference = 2 * Math.PI * 52; // radius of 52
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-navy-900/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-champagne-50 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          {/* Title */}
          <h2 className="text-3xl font-serif font-semibold mb-3 text-center text-navy-900">
            Let's Get Ready
          </h2>

          {/* Circular countdown timer */}
          <div className="flex justify-center mb-6 mt-8">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-champagne-400 rounded-full blur-2xl opacity-30"></div>

              {/* SVG circle with progress */}
              <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="rgba(37, 99, 235, 0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="url(#gradientBlue)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                />
                <defs>
                  <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#c9a66c" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary-600 mb-1 transition-all duration-300">
                    {countdown}
                  </div>
                  <div className="text-xs text-navy-400 font-medium uppercase tracking-wider">
                    sec
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instruction text with icon */}
          <div className="bg-gradient-to-r from-primary-50 to-champagne-50 rounded-2xl p-4 mb-6 border border-primary-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-champagne-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-navy-900 font-semibold mb-1">
                  Enable Microphone
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">
                  On the next screen, please allow microphone access when prompted. This is required for the video call to work.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span>Continue</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Auto-continue text */}
          <p className="mt-4 text-xs text-navy-400 text-center font-medium">
            Auto-continuing in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreCallInstructionsModal;
