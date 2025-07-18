import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "84ec6f78-002f-4b92-a7a4-685d9d338996",
          ...formData
        })
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "vg3772285@gmail.com",
      link: "mailto:vg3772285@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+91 9644423363",
      link: "tel:+919644423363"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "India",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: "GitHub",
      url: "https://github.com/vishnu-gupta"
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vishnu-gupta-293864248/"
    },
    {
      icon: <Twitter size={24} />,
      name: "Twitter",
      url: "https://twitter.com/vishnu_gupta"
    }
  ];

  return (
    <section id="contact" className="contact section" ref={contactRef}>
      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-subtitle">
            Let's discuss how we can work together to bring your ideas to life
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Let's Start a Conversation</h3>
              <p>
                I'm always open to discussing new opportunities, creative projects, 
                or just having a chat about technology and development.
              </p>
            </div>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-detail glass-card">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form glass-card">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project..."
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;