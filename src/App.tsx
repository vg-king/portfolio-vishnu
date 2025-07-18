import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <ParticleBackground />
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;