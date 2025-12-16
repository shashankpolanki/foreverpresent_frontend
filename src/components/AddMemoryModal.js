import React, { useState } from 'react';

function AddMemoryModal({ onClose, onSubmit }) {
  const [memory, setMemory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memory.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate submission (this doesn't actually need to work for MVP)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);

    // Auto close after showing success
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-100">
        {!isSubmitted ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-champagne-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-navy-900">
                  Add a Memory
                </h2>
                <p className="text-navy-500 text-sm">
                  Share a cherished memory to help personalize your experience
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Your Memory
                </label>
                <textarea
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                  placeholder="Share a special memory, story, or detail about your loved one that you'd like to preserve..."
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  autoFocus
                />
                <p className="text-xs text-navy-400 mt-2">
                  This memory will help create a more meaningful AI experience
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !memory.trim()}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    isSubmitting || !memory.trim()
                      ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Memory'
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl font-semibold border border-gray-200 text-navy-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-champagne-50 rounded-xl border border-champagne-100">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-champagne-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-champagne-800">
                  <span className="font-medium">Tip:</span> Include specific details like favorite phrases, stories, mannerisms, or inside jokes to make the experience more authentic.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
              Memory Saved
            </h3>
            <p className="text-navy-500">
              Thank you for sharing this precious memory
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMemoryModal;
