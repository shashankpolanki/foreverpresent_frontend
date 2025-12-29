import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Lost her mother in 2023",
      initials: "SM",
      image: "/sarah_img.png",
      rating: 5,
      quote: "Being able to see my mother's face and hear her voice again has brought our whole family so much peace. It's like having her with us during the holidays again. The technology is remarkable, but what really stands out is how thoughtfully the ForeverPresent team handled everything.",
      highlight: "It's like having her with us during the holidays again."
    },
    {
      name: "James Thompson",
      role: "Father of 3",
      initials: "JT",
      image: "/james_img.png",
      rating: 5,
      quote: "My kids can now 'talk' to their grandfather whenever they miss him. It's helped them process their grief in such a healthy way. Worth every penny. The conversations feel natural and my father's personality really shines through.",
      highlight: "It's helped them process their grief in such a healthy way."
    },
    {
      name: "Robert Kim",
      role: "Legacy preservation client",
      initials: "RK",
      image: "/robert_img.png",
      rating: 5,
      quote: "Before my diagnosis, I worked with ForeverPresent to create something special for my family. Knowing they'll always have a piece of me brings incredible comfort. The team was compassionate and professional throughout the entire process.",
      highlight: "Knowing they'll always have a piece of me brings incredible comfort."
    },
    {
      name: "Maria Garcia",
      role: "Lost her husband in 2022",
      initials: "MG",
      image: "/maria_img.png",
      rating: 5,
      quote: "After losing my husband of 40 years, I felt so alone. Now I can hear his voice tell me good morning every day. It's not the same, but it helps fill a little of that void. The ForeverPresent team understood exactly what I needed.",
      highlight: "I can hear his voice tell me good morning every day."
    },
    {
      name: "David Chen",
      role: "Preserved his grandmother's legacy",
      initials: "DC",
      image: "/david_img.png",
      rating: 5,
      quote: "My grandmother was the matriarch of our family and had so many stories to tell. Thanks to ForeverPresent, future generations of our family will be able to hear those stories directly from her. It's an invaluable gift.",
      highlight: "Future generations will be able to hear those stories directly from her."
    },
    {
      name: "Patricia Williams",
      role: "Military family",
      initials: "PW",
      image: "/patricia_img.png",
      rating: 5,
      quote: "When my son was deployed overseas, the uncertainty was overwhelming. We created a ForeverPresent experience just in case. Thankfully he returned safely, but having that peace of mind was priceless. Now we're keeping it for our grandchildren.",
      highlight: "Having that peace of mind was priceless."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-champagne-500 rounded-full"></span>
            <span className="text-champagne-700 text-sm font-medium">Trusted by Families Nationwide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 mb-6">
            Stories from Families <span className="text-primary-600">We've Helped</span>
          </h1>

          <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-12">
            Since 2023, ForeverPresent has helped hundreds of families preserve the memory of their loved ones. Here's what they have to say.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-semibold text-navy-900">2500+</div>
              <div className="text-navy-500 mt-1">Families Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-semibold text-navy-900">10K+</div>
              <div className="text-navy-500 mt-1">Memories Preserved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-semibold text-navy-900">5.0</div>
              <div className="text-navy-500 mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-semibold text-navy-900">2023</div>
              <div className="text-navy-500 mt-1">Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-navy-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-navy-600 text-center">
              <p>
                ForeverPresent was founded in 2023 with a simple but profound mission: to help families stay connected with their loved ones, even after they're gone.
              </p>
              <p>
                What started as a way to help grieving families has grown into a comprehensive legacy preservation service. We've since expanded to help families facing terminal diagnoses, military families dealing with deployment, and anyone who wants to preserve the essence of their loved ones for future generations.
              </p>
              <p>
                Every family we work with reminds us why we do this work. The technology is advanced, but the purpose is timeless — <strong className="text-navy-800">keeping the people we love present in our lives, forever.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-4 text-center">
            What Families Are Saying
          </h2>
          <p className="text-navy-500 text-center mb-12 max-w-2xl mx-auto">
            Real stories from real families who have experienced the comfort of staying connected
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-champagne-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-navy-600 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Highlight */}
                <div className="bg-primary-50 border-l-4 border-primary-500 px-4 py-2 mb-6 rounded-r-lg">
                  <p className="text-primary-700 font-medium text-sm italic">
                    "{testimonial.highlight}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-champagne-200 flex items-center justify-center">
                      <span className="text-navy-700 font-semibold">{testimonial.initials}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-navy-900">{testimonial.name}</p>
                    <p className="text-sm text-navy-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try Demo CTA Section */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-4">
            Experience It Yourself
          </h2>
          <p className="text-navy-500 mb-8">
            Try our interactive demo and see what a conversation with a loved one feels like
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Try the Demo
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Ready to Preserve Your Loved One's Legacy?
          </h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Join thousands of families who have found comfort through ForeverPresent. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/connect"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Call Today
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try Demo
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
            </div>
            <div className="flex gap-8 text-navy-300">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
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

export default Testimonials;
