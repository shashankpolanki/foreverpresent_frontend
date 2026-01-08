import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BuyVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Facebook Pixel ViewContent event
    if (window.fbq) {
      window.fbq('track', 'ViewContent');
    }
  }, []);

  const handlePlayClick = async () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          // Ignore play interruption errors
          console.log('Video play was interrupted');
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stripeLink = "https://buy.stripe.com/00wfZi2Fw2AUdb01xpenS09";

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
          <span className="font-medium">Introductory Offer:</span> $49 for Only Today
        </p>
      </div>

      {/* Hero Section - CTA Above Video */}
      <section className="px-6 pt-8 pb-12 bg-gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          {/* Emotional Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 leading-tight mb-4">
            See Your Loved One<br />
            <span className="text-gold-gradient">One More Time</span>
          </h1>

          {/* Subheadline - Clear about passed away loved one */}
          <p className="text-lg md:text-xl text-navy-700 mb-6 max-w-2xl mx-auto">
            We create a <strong>60-second video of someone you've lost</strong> — a moment you never got to have, delivered in 48 hours.
          </p>

          {/* Micro Reassurances - Above CTA */}
          <div className="mb-6 text-navy-600 text-sm">
            <div className="flex justify-center gap-4 md:gap-6 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Private & secure
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                48-hour delivery
              </span>
            </div>
            <div className="flex justify-center">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                High professional quality
              </span>
            </div>
          </div>

          {/* Primary CTA - ABOVE THE FOLD */}
          <a
            href={stripeLink}
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
          >
            <span className="hidden md:inline">Create Remembrance Video — Only $49</span>
            <span className="md:hidden">Get Remembrance Video for $49</span>
          </a>

          {/* Video Player - Below CTA */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                playsInline
                onClick={handlePlayClick}
                onEnded={() => setIsPlaying(false)}
              >
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/popclone-88562.firebasestorage.app/o/she_passed_away_2.mp4?alt=media&token=5e6b8bcf-27db-4bc0-aa81-90e7909dafb8"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all hover:bg-black/30"
                  onClick={handlePlayClick}
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                    <svg className="w-10 h-10 text-navy-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Create */}
      <section className="px-6 py-16 bg-navy-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 text-center mb-4">
            One Video. Infinite Comfort.
          </h2>
          <p className="text-navy-600 text-center mb-10 max-w-xl mx-auto">
            Whether it's a memory from the past or a moment you always wished you had — we bring it to life.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-champagne-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Relive a Real Memory</h3>
              <p className="text-navy-600 text-sm">Recreate a cherished moment — a birthday, holiday, or quiet day together that you want to see again.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Create a New Moment</h3>
              <p className="text-navy-600 text-sm">Imagine them at your wedding, meeting your child, or saying the words you never got to hear.</p>
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
              <h3 className="text-navy-900 font-semibold mb-2">Order Now</h3>
              <p className="text-navy-600 text-sm">Secure checkout takes 30 seconds</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Share Your Vision</h3>
              <p className="text-navy-600 text-sm">Upload photos and describe the moment you want to see</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Receive Video</h3>
              <p className="text-navy-600 text-sm">Get your video in 48 hours</p>
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
              <p className="text-navy-600 text-sm mb-4">"I didn't know I needed this until I saw her face again. The video brought me to tears — in the best way."</p>
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
              <p className="text-navy-600 text-sm mb-4">"My kids can now see their grandfather. It's helped them process their grief in such a healthy way. Worth every penny."</p>
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
              <p className="text-navy-600 text-sm mb-4">"After losing my husband of 40 years, I felt so alone. This video helps fill a little of that void every day."</p>
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
              <p className="text-navy-600 text-sm mb-4">"Future generations of our family will hear my grandmother's stories directly from her. It's an invaluable gift."</p>
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-navy-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 mb-4">
            Give yourself the gift of<br />one more moment
          </h2>
          <p className="text-navy-600 mb-8">
            No subscriptions. No hidden fees. Just one beautiful video.
          </p>

          <a
            href={stripeLink}
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="hidden md:inline">Create Remembrance Video — Only $49</span>
            <span className="md:hidden">Get Remembrance Video for $49</span>
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

export default BuyVideo;
