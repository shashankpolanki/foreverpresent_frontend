import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CVIProvider } from './components/cvi/components/cvi-provider';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Demo from './pages/Demo';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Testimonials from './pages/Testimonials';
import HowItWorks from './pages/HowItWorks';
import Connect from './pages/Connect';
import SmsConsent from './pages/SmsConsent';
import BuyVideo from './pages/BuyVideo';
import BuyVideoCall from './pages/BuyVideoCall';
import ThankYouBuyVideo from './pages/ThankYouBuyVideo';
import ThankYouBuyVideoCall from './pages/ThankYouBuyVideoCall';

function App() {
  return (
    <CVIProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sms-consent" element={<SmsConsent />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/buy-video" element={<BuyVideo />} />
          <Route path="/buy-video-call" element={<BuyVideoCall />} />
          <Route path="/thank-you-buy-video" element={<ThankYouBuyVideo />} />
          <Route path="/thank-you-buy-video-call" element={<ThankYouBuyVideoCall />} />

          {/* Demo Routes */}
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo/:username" element={<Demo />} />
        </Routes>
      </Router>
    </CVIProvider>
  );
}

export default App;
