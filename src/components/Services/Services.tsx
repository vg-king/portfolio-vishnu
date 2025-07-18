import React, { useEffect, useRef } from 'react';
import { Monitor, Smartphone, Database, Globe, Code, Zap, Layers, Sparkles } from 'lucide-react';
import './Services.css';

const Services = () => {
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Monitor size={40} />,
      title: "Web Development",
      description: "Modern web applications using React, responsive design, and user-friendly interfaces.",
      features: ["React Development", "Responsive Design", "Modern UI/UX", "Performance Optimization"]
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile App Development",
      description: "Native Android applications using Kotlin and Jetpack Compose with clean architecture and modern design.",
      features: ["Native Android", "Jetpack Compose", "Material Design", "Performance Optimization"]
    },
    {
      icon: <Database size={40} />,
      title: "Backend Development",
      description: "Robust server-side applications using Java, Spring Boot, and database management systems.",
      features: ["Spring Boot", "REST APIs", "Database Design", "Microservices"]
    },
    {
      icon: <Globe size={40} />,
      title: "Full Stack Solutions",
      description: "End-to-end application development from concept to deployment with modern development practices.",
      features: ["System Architecture", "DevOps", "CI/CD", "Cloud Deployment"]
    }
  ];

  return (
    <section id="services" className="services section" ref={servicesRef}>
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive software development services tailored to your needs
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card glass-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="service-btn">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;