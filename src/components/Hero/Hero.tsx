import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Vishnu Gupta</span>
            </h1>
            <h2 className="hero-subtitle">
              Full Stack Developer | Java | Spring Boot | React | Android
            </h2>
            <p className="hero-description">
              Passionate about creating efficient, scalable applications using modern technologies. 
              Specializing in Java, Spring Boot, React, Android development, and full-stack solutions.
            </p>
            
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <a
                href="https://drive.google.com/file/d/1U2i3PCUFkY0sMrkpYli7mA-NbKdOR9f_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Download size={20} />
                Resume
              </a>
            </div>

            <div className="hero-social">
              <a
                href="https://github.com/vishnu-gupta"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vishnu-gupta-293864248/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:vg3772285@gmail.com"
                className="social-link"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              <img
                src="/cropped_circle_image.png"
                alt="Vishnu Gupta"
                className="profile-image"
              />
            </div>
          </div>
        </div>

        <button
          className="scroll-indicator"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;