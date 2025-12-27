import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pb-32 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne-50/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-8 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-100 rounded-full mb-4 lg:mb-6">
                <span className="w-2 h-2 bg-champagne-500 rounded-full"></span>
                <span className="text-champagne-700 text-sm font-medium">Preserve What Matters Most</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-navy-900 leading-tight mb-4 lg:mb-6">
                Keep Their <span className="text-gold-gradient">Memory</span> Alive,{' '}
                <span className="text-primary-600">Forever</span>
              </h1>

              <p className="text-lg lg:text-xl text-navy-600 leading-relaxed mb-6 max-w-lg">
                We create meaningful AI experiences that <strong className="text-navy-800">let you see, hear, and speak with your passed away loved ones</strong>, preserving their essence for generations to come.
              </p>

              {/* Mobile-only GIF preview - shown before CTA on mobile */}
              <div className="lg:hidden mb-6">
                <div className="relative max-w-sm mx-auto">
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary-100 via-champagne-100 to-primary-50 rounded-2xl blur-xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <img
                      src="/foreverpresent_preview.gif"
                      alt="ForeverPresent AI Video Call Demo"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Floating badge - AI Video Call */}
                  <div className="absolute -right-2 top-1/4 bg-white rounded-xl shadow-lg px-3 py-2 animate-float" style={{ animationDelay: '1s' }}>
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

                  {/* Floating badge - Daily Messages */}
                  <div className="absolute -left-2 bottom-1/4 bg-white rounded-xl shadow-lg px-3 py-2 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-champagne-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-navy-900">Daily Messages</p>
                        <p className="text-[10px] text-navy-500">Good morning videos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button - shown after GIF on mobile */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-0">
                <Link
                  to="/connect"
                  className="btn-primary inline-flex items-center justify-center gap-3 group"
                >
                  Connect With Loved One
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-navy-500 mb-4">Trusted by families across the world</p>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-semibold text-navy-900">2000+</div>
                    <div className="text-sm text-navy-500">Families Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-semibold text-navy-900">10K+</div>
                    <div className="text-sm text-navy-500">Memories Preserved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-semibold text-navy-900">5.0</div>
                    <div className="text-sm text-navy-500">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image/Visual (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block relative animate-float">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 via-champagne-100 to-primary-50 rounded-full blur-3xl opacity-60"></div>

                {/* Main visual */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <img
                    src="/foreverpresent_preview.gif"
                    alt="ForeverPresent AI Video Call Demo"
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">Video Call</p>
                      <p className="text-xs text-navy-500">Available 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 bottom-1/4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">Daily Messages</p>
                      <p className="text-xs text-navy-500">Good morning videos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">How We Help Families</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              We offer personalized services to help you preserve and cherish the memories of your loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">AI Video Calls</h3>
              <p className="text-navy-600">
                Have meaningful video conversations with an AI that looks, sounds, and responds like your loved one.
              </p>
            </div>

            {/* Service 2 */}
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-champagne-100 to-champagne-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">Daily Messages</h3>
              <p className="text-navy-600">
                Receive personalized good morning or good night video messages from your loved one, delivered to your phone.
              </p>
            </div>

            {/* Service 3 */}
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-100 to-champagne-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-3">Memory Stories</h3>
              <p className="text-navy-600">
                AI-generated video stories that bring cherished memories to life, featuring your loved one's face and voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Who We Serve</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              ForeverPresent is designed for families who want to preserve meaningful connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border border-navy-100">
              <div className="w-12 h-12 mb-4 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">Grieving Families</h3>
              <p className="text-navy-600">
                For those who have lost a wife or husband, parent, or loved one and want to feel connected to them again.
              </p>
            </div>

            <div className="bg-gradient-to-br from-champagne-50 to-white p-8 rounded-2xl border border-champagne-100">
              <div className="w-12 h-12 mb-4 rounded-xl bg-champagne-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">Terminal Illness</h3>
              <p className="text-navy-600">
                For those facing terminal diagnoses who want to leave a lasting presence for their family.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100">
              <div className="w-12 h-12 mb-4 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">Legacy Preservation</h3>
              <p className="text-navy-600">
                For families wanting to preserve their elders' wisdom, stories, and presence for future generations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy-50 to-champagne-50 p-8 rounded-2xl border border-navy-100">
              <div className="w-12 h-12 mb-4 rounded-xl bg-navy-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">Deployed Families</h3>
              <p className="text-navy-600">
                For families separated by service, whether military deployment, maritime work, or other circumstances limiting reliable communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">What Families Say</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Hear from families who have experienced the comfort of staying connected
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 mb-6 italic">
                "Being able to see my mother's face and hear her voice again has brought our whole family so much peace. It's like having her with us during the holidays again."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-champagne-200 flex items-center justify-center">
                  <span className="text-navy-700 font-semibold">SM</span>
                </div>
                <div>
                  <p className="font-medium text-navy-900">Sarah M.</p>
                  <p className="text-sm text-navy-500">Lost her mother in 2023</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 mb-6 italic">
                "My kids can now 'talk' to their grandfather whenever they miss him. It's helped them process their grief in such a healthy way. Worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-champagne-200 flex items-center justify-center">
                  <span className="text-navy-700 font-semibold">JT</span>
                </div>
                <div>
                  <p className="font-medium text-navy-900">James T.</p>
                  <p className="text-sm text-navy-500">Father of 3</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 mb-6 italic">
                "Before my diagnosis, I worked with ForeverPresent to create something special for my family. Knowing they'll always have a piece of me brings incredible comfort."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-champagne-200 flex items-center justify-center">
                  <span className="text-navy-700 font-semibold">RK</span>
                </div>
                <div>
                  <p className="font-medium text-navy-900">Robert K.</p>
                  <p className="text-sm text-navy-500">Legacy preservation client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6">
            Ready to Preserve Your Loved One's Legacy?
          </h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Schedule a free consultation to learn how ForeverPresent can help your family stay connected.
          </p>
          <div className="flex justify-center">
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-3 bg-white text-navy-900 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg group"
            >
              See How We Can Help
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-serif font-semibold text-white">
                Forever<span className="text-champagne-400">Present</span>
              </div>
              <p className="text-navy-400 mt-2">Preserving memories, forever.</p>
              <p className="text-navy-400 mt-1">Email: <a href="mailto:team@foreverpresent.ai" className="hover:text-white transition-colors">team@foreverpresent.ai</a></p>
            </div>
            <div className="flex gap-8 text-navy-300">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="mailto:hello@foreverpresent.ai" className="hover:text-white transition-colors">Contact</a>
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

export default Landing;
