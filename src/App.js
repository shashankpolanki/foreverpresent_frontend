import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CVIProvider } from './components/cvi/components/cvi-provider';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Demo from './pages/Demo';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Testimonials from './pages/Testimonials';

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
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Demo Routes */}
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo/:username" element={<Demo />} />
        </Routes>
      </Router>
    </CVIProvider>
  );
}

export default App;
