import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Portfolio component
const Portfolio = () => (
  <div className="bg-gray-900 text-white">
    <Header />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  useEffect(() => {
    // Initialize GSAP
    gsap.set("body", { visibility: "visible" });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-gray-50">
            <Dashboard />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;