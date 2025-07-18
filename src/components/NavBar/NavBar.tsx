import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  const [menu, setMenu] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenu(sectionId);
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="gradient-text">Vishnu</span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${menu === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn-primary nav-cta"
          onClick={() => scrollToSection('contact')}
        >
          Let's Connect
        </button>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;