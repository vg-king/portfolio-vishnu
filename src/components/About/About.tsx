import React, { useEffect, useRef } from 'react';
import { Code, Database, Smartphone, Globe, GitBranch, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: <Code size={40} />,
      title: "Frontend Development",
      description: "Building modern web applications using React, JavaScript, and responsive design principles.",
      technologies: ["React", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Responsive Design"]
    },
    {
      icon: <Database size={40} />,
      title: "Backend Development",
      description: "Proficient in Node.js, Spring Boot, and database design for scalable server-side applications.",
      technologies: ["Java", "Spring Boot", "Node.js", "MySQL", "PostgreSQL", "REST APIs"]
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile Development",
      description: "Building modern Android applications using Kotlin and Jetpack Compose with clean architecture.",
      technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase"]
    },
    {
      icon: <Globe size={40} />,
      title: "Full Stack Integration",
      description: "End-to-end application development with modern tools and deployment strategies.",
      technologies: ["Git", "Docker", "AWS", "CI/CD", "Testing", "Agile"]
    }
  ];

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">
            Passionate full-stack developer with expertise in modern web and mobile technologies
          </p>
        </div>

        <div className="about-content">
          <div className="about-intro">
            <div className="intro-text">
              <h3>Building Digital Solutions</h3>
              <p>
                I'm a dedicated software developer with a passion for creating efficient, scalable, and user-friendly applications. 
                My journey in software development has equipped me with a comprehensive skill set spanning frontend, backend, 
                and mobile development.
              </p>
              <p>
                I believe in writing clean, maintainable code and following best practices to deliver high-quality software solutions 
                that solve real-world problems.
              </p>
            </div>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card glass-card">
                <div className="skill-icon">{skill.icon}</div>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
                <div className="tech-stack">
                  {skill.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;