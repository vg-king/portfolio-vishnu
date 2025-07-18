import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="gradient-text">Vishnu Gupta</h3>
              <p>
                Passionate full-stack developer dedicated to creating innovative 
                solutions that make a difference.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Web Development</a></li>
                  <li><a href="#services">Mobile Apps</a></li>
                  <li><a href="#services">Backend Development</a></li>
                  <li><a href="#services">Full Stack Solutions</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Connect</h4>
                <div className="footer-social">
                  <a
                    href="https://github.com/vishnu-gupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vishnu-gupta-293864248/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:vg3772285@gmail.com"
                    className="social-link"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                © {currentYear} Vishnu Gupta. All rights reserved. Made with{' '}
                <Heart size={16} className="heart-icon" /> in India.
              </p>
            </div>
            <button className="back-to-top" onClick={scrollToTop}>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;