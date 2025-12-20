import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Share Your Story",
      subtitle: "A Personal Welcome Call",
      description: "We begin with a heartfelt conversation about your loved one. Tell us about their personality, their laugh, the stories only you know. Together, we'll design a personalized experience that feels authentic to who they were.",
      details: [
        "Share memories and personality traits",
        "Choose your experience: video calls, daily good morning messages, or weekly memory videos",
        "Decide who in your family will connect with them"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Bring Them Back",
      subtitle: "We Handle the Technology",
      description: "Share photos and videos of your loved one with our team. Using advanced AI technology, we carefully recreate their appearance, voice, and mannerisms with the utmost respect and attention to detail.",
      details: [
        "Share photos and videos from any time period",
        "Our team handles all the technical work",
        "Preview and refine until it feels just right"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Feel Connected Again",
      subtitle: "Experience the Joy of Reunion",
      description: "See their face light up. Hear their voice. Share a conversation like you used to. Whether it's a video call to catch up, a good morning message to start your day, or reliving cherished memories together — feel the comfort of their presence once more.",
      details: [
        "Video calls available 24/7, whenever you need them",
        "Daily messages to feel their presence each morning",
        "Relive special memories through personalized videos"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne-50/50 to-transparent"></div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-champagne-500 rounded-full"></span>
            <span className="text-champagne-700 text-sm font-medium">Simple & Meaningful</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 leading-tight mb-6">
            Three Steps to <span className="text-gold-gradient">Reconnect</span>
          </h1>

          <p className="text-xl text-navy-600 leading-relaxed max-w-2xl mx-auto">
            We've made the process simple and personal, so you can focus on what matters most — feeling close to your loved one again.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16 mb-24 last:mb-0`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-serif font-bold text-champagne-200">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-champagne-100 flex items-center justify-center text-primary-600">
                    {step.icon}
                  </div>
                </div>

                <p className="text-primary-600 font-medium mb-2">{step.subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-4">
                  {step.title}
                </h2>

                <p className="text-lg text-navy-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-navy-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-md">
                <div className={`relative ${index % 2 === 1 ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 via-champagne-100 to-primary-50 rounded-3xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-champagne-500 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-serif font-bold text-champagne-400 mb-2">Step {index + 1}</div>
                      <p className="text-navy-600 font-medium">{step.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-champagne-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Ready to Feel Close Again?
          </h2>

          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Let's have a conversation about your loved one. We're here to listen, understand, and help you create something truly meaningful.
          </p>

          <a
            href="https://calendly.foreverpresent.ai/widget/bookings/forever-present"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-navy-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg group"
          >
            Call Us Today
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <p className="mt-6 text-navy-400 text-sm">
            Free consultation • No commitment required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-serif font-semibold">
              <span className="text-white">Forever</span>
              <span className="text-champagne-400">Present</span>
            </div>
            <div className="flex items-center gap-8 text-navy-300">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="https://calendly.foreverpresent.ai/widget/bookings/forever-present" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-navy-400 text-sm">
              © {new Date().getFullYear()} ForeverPresent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HowItWorks;
