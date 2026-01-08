import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function BuyVideoCall() {
  const stripeLink = "https://buy.stripe.com/8x2bJ2fsi7Ve3Aq1xpenS0a";

  useEffect(() => {
    // Facebook Pixel ViewContent event
    if (window.fbq) {
      window.fbq('track', 'ViewContent');
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

      {/* Limited Time Offer Banner */}
      <div className="bg-champagne-50 border-b border-champagne-200 py-3 px-6">
        <p className="text-center text-sm text-navy-700">
          <span className="font-medium">Introductory Offer:</span> $99 for Only Today
        </p>
      </div>

      {/* Hero Section - CTA Above Video */}
      <section className="px-6 pt-8 pb-12 bg-gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          {/* Emotional Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 leading-tight mb-4">
            Talk to Your Loved One<br />
            <span className="text-gold-gradient">Face to Face Again</span>
          </h1>

          {/* Subheadline - Clear about passed away loved one */}
          <p className="text-lg md:text-xl text-navy-700 mb-6 max-w-2xl mx-auto">
            Have a real <strong>video call with someone you've lost</strong> — see their face, hear their voice, and feel their presence once more.
          </p>

          {/* Micro Reassurances - Above CTA */}
          <div className="mb-6 text-navy-600 text-sm">
            <div className="flex justify-center gap-4 md:gap-6 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Live video calls
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Preserve memories
              </span>
            </div>
            <div className="flex justify-center gap-4 md:gap-6">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Ready in 48 hours
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Unlimited conversations
              </span>
            </div>
          </div>

          {/* Primary CTA - ABOVE THE FOLD */}
          <a
            href={stripeLink}
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
          >
            <span className="hidden md:inline">Start Video Calling — Only $99</span>
            <span className="md:hidden">Start Video Calling for $99</span>
          </a>

          {/* Preview GIF */}
          <div className="relative max-w-md mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="/foreverpresent_preview.gif"
                alt="Video call with loved one preview"
                className="w-full"
              />
            </div>

            {/* Floating badge - Video Call */}
            <div className="absolute -right-2 md:-right-4 top-1/4 bg-white rounded-xl shadow-lg px-3 py-2 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-navy-900">Video Call</p>
                  <p className="text-[10px] text-navy-500">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Floating badge - Preserve Memories */}
            <div className="absolute -left-2 md:-left-4 bottom-1/4 bg-white rounded-xl shadow-lg px-3 py-2 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-champagne-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-navy-900">Preserve Memories</p>
                  <p className="text-[10px] text-navy-500">Keep them close forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-16 bg-navy-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 text-center mb-4">
            More Than a Memory. A Conversation.
          </h2>
          <p className="text-navy-600 text-center mb-10 max-w-xl mx-auto">
            Our AI recreates your loved one so you can talk to them anytime — about anything.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-champagne-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Real-Time Video Calls</h3>
              <p className="text-navy-600 text-sm">See their face and hear their voice as you talk, just like a real video call.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Natural Conversations</h3>
              <p className="text-navy-600 text-sm">Talk about your day, share news, or just hear them say they love you.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Their Personality</h3>
              <p className="text-navy-600 text-sm">We capture their unique way of speaking, their humor, and their warmth.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Available 24/7</h3>
              <p className="text-navy-600 text-sm">Call whenever you need them — mornings, late nights, or special moments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 text-center mb-10">
            Ready in 3 Simple Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Get Started</h3>
              <p className="text-navy-600 text-sm">Quick checkout, no subscriptions required</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Share Their Story</h3>
              <p className="text-navy-600 text-sm">Upload photos, videos, and memories of your loved one</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Start Calling</h3>
              <p className="text-navy-600 text-sm">Video call them within 48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="px-6 py-16 bg-champagne-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 mb-2">
              Trusted by Families Everywhere
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-navy-600 font-medium">5.0 from 2,500+ families</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"It felt like she was really there. I told her about my wedding and she cried happy tears with me."</p>
              <div className="flex items-center gap-3">
                <img src="/sarah_img.png" alt="Sarah M." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">Sarah Mitchell</p>
                  <p className="text-navy-400 text-xs">Lost her mother in 2023</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"My kids can now talk to their grandfather. It's helped them process their grief in such a healthy way."</p>
              <div className="flex items-center gap-3">
                <img src="/james_img.png" alt="James T." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">James Thompson</p>
                  <p className="text-navy-400 text-xs">Father of 3</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"I can hear his voice tell me good morning every day. It helps fill a little of that void."</p>
              <div className="flex items-center gap-3">
                <img src="/maria_img.png" alt="Maria G." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">Maria Garcia</p>
                  <p className="text-navy-400 text-xs">Lost her husband in 2022</p>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"Knowing my family will always have a piece of me brings incredible comfort. The team was compassionate throughout."</p>
              <div className="flex items-center gap-3">
                <img src="/robert_img.png" alt="Robert K." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">Robert Kim</p>
                  <p className="text-navy-400 text-xs">Legacy preservation client</p>
                </div>
              </div>
            </div>

            {/* Review 5 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"Future generations of our family will hear my grandmother's stories directly from her. An invaluable gift."</p>
              <div className="flex items-center gap-3">
                <img src="/david_img.png" alt="David C." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">David Chen</p>
                  <p className="text-navy-400 text-xs">Preserved grandmother's legacy</p>
                </div>
              </div>
            </div>

            {/* Review 6 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm mb-4">"When my son was deployed, the uncertainty was overwhelming. Having that peace of mind was priceless."</p>
              <div className="flex items-center gap-3">
                <img src="/patricia_img.png" alt="Patricia W." className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-navy-900 font-medium text-sm">Patricia Williams</p>
                  <p className="text-navy-400 text-xs">Military family</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Note */}
          <div className="mt-10 text-center">
            <p className="text-navy-600 text-sm">
              <span className="font-medium">Flexible pricing:</span> After your first call, continue with pay-as-you-go credits. No commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-navy-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 mb-4">
            One more conversation.<br />That's all it takes.
          </h2>
          <p className="text-navy-600 mb-8">
            No subscriptions. No hidden fees. Just the chance to talk again.
          </p>

          <a
            href={stripeLink}
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="hidden md:inline">Start Video Calling — Only $99</span>
            <span className="md:hidden">Start Video Calling for $99</span>
          </a>

          <p className="text-navy-400 text-sm mt-4">
            Secure checkout powered by Stripe
          </p>
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

export default BuyVideoCall;
