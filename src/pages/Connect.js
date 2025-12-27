import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Connect() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [selectedReadiness, setSelectedReadiness] = useState(null);

  const relationships = [
    { id: 'mother', label: 'Mother' },
    { id: 'father', label: 'Father' },
    { id: 'husband', label: 'Husband' },
    { id: 'wife', label: 'Wife' },
    { id: 'grandparent', label: 'Grandparent' },
    { id: 'child', label: 'Child' },
    { id: 'sibling', label: 'Sibling' },
    { id: 'other', label: 'Other' },
  ];

  const readinessOptions = [
    {
      id: 'ready',
      label: 'Ready to start',
      description: 'I want to begin soon'
    },
    {
      id: 'considering',
      label: 'Seriously considering',
      description: 'Ready to learn more'
    },
    {
      id: 'exploring',
      label: 'Just exploring',
      description: 'Learning about my options'
    },
  ];

  const handleRelationshipSelect = (relationship) => {
    setSelectedRelationship(relationship);
    // Small delay for visual feedback before transitioning
    setTimeout(() => setStep(2), 300);
  };

  const handleReadinessSelect = (readiness) => {
    setSelectedReadiness(readiness);
    // Small delay then redirect to Calendly
    setTimeout(() => {
      window.open('https://calendly.foreverpresent.ai/widget/bookings/forever-present', '_blank');
      // Navigate back to home or show a confirmation
      navigate('/');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-16 min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne-50/50 to-transparent"></div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 w-full">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full transition-all ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
              <div className={`w-12 h-1 rounded-full transition-all ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`w-3 h-3 rounded-full transition-all ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Step 1: Relationship */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy-900 mb-4">
                  Who would you like to reconnect with?
                </h1>
                <p className="text-lg text-navy-600">
                  Select the loved one you're hoping to see and hear again
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relationships.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => handleRelationshipSelect(rel)}
                    className={`group p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                      selectedRelationship?.id === rel.id
                        ? 'border-primary-600 bg-primary-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-medium text-navy-900 text-center">{rel.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Readiness */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-10">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-700 mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy-900 mb-4">
                  How ready are you to feel connected to your {selectedRelationship?.label.toLowerCase()} again?
                </h1>
                <p className="text-lg text-navy-600">
                  This helps us understand how best to support you
                </p>
              </div>

              <div className="space-y-4 max-w-xl mx-auto">
                {readinessOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleReadinessSelect(option)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      selectedReadiness?.id === option.id
                        ? 'border-primary-600 bg-primary-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold text-lg text-navy-900 mb-1">{option.label}</div>
                    <div className="text-navy-500">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trust indicator */}
          <div className="mt-12 text-center">
            <p className="text-sm text-navy-400">
              Free consultation • No commitment required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Connect;
