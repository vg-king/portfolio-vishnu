import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Code, Database, Smartphone, Globe, Server, CreditCard, Train } from 'lucide-react';
import './Projects.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const Projects = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };
        
        // Add authorization header if token is available
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token && token !== 'YOUR_GITHUB_TOKEN_HERE') {
          headers.Authorization = `token ${token}`;
        }
        
        const response = await fetch('https://api.github.com/users/vg-king/repos?sort=updated&per_page=10', {
          headers
        });
        
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please add a GitHub token to .env file.');
          } else if (response.status === 404) {
            throw new Error('GitHub user not found. Please check the username.');
          } else {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        setProjects(data.filter((repo: GitHubRepo) => !repo.name.includes('vg-king')));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Featured projects with custom descriptions and details
  const featuredProjects = [
    {
      id: 1,
      name: "AI-BE",
      title: "AI Chatbot Backend",
      description: "Spring Boot backend for an AI-powered chatbot integrated with an e-commerce website using WebSockets. Enables real-time user interaction for enhanced customer support.",
      html_url: "https://github.com/vg-king/AI-BE",
      homepage: "",
      language: "Java",
      icon: <Code size={24} />,
      technologies: ["Spring Boot", "WebSocket", "AI Integration", "Real-time Chat"],
      category: "Backend",
      featured: true
    },
    {
      id: 2,
      name: "BookMyMovies",
      title: "BookMyShow Clone - Backend",
      description: "Backend system for a movie ticket booking platform with features like movie listing, seat selection, and user management using Java and JDBC.",
      html_url: "https://github.com/vg-king/BookMyMovies",
      homepage: "",
      language: "Java",
      icon: <Database size={24} />,
      technologies: ["Java", "JDBC", "Movie Booking", "Seat Management"],
      category: "Backend",
      featured: true
    },
    {
      id: 3,
      name: "Payment-Gateway",
      title: "Payment Gateway with Razorpay",
      description: "Full-stack Razorpay integration for processing secure online payments in e-commerce apps. Implements order creation, verification, and payment status handling.",
      html_url: "https://github.com/vg-king/Payment-Gateway",
      homepage: "",
      language: "JavaScript",
      icon: <CreditCard size={24} />,
      technologies: ["Razorpay", "Payment Processing", "Full Stack", "Security"],
      category: "Full Stack",
      featured: true
    },
    {
      id: 4,
      name: "Whether-app",
      title: "Modern Weather App",
      description: "A modern Android weather application built using Kotlin and Jetpack Compose. Fetches real-time weather data using REST APIs and displays detailed forecasts with a sleek UI.",
      html_url: "https://github.com/vg-king/Whether-app",
      homepage: "",
      language: "Kotlin",
      icon: <Smartphone size={24} />,
      technologies: ["Kotlin", "Jetpack Compose", "REST API", "Weather Data"],
      category: "Mobile",
      featured: true
    },
    {
      id: 5,
      name: "DriveFolderBackend",
      title: "Drive Clone Backend",
      description: "Google Drive-inspired backend with functionalities for uploading, downloading, deleting, and searching files using Spring Boot.",
      html_url: "https://github.com/vg-king/DriveFolderBackend",
      homepage: "",
      language: "Java",
      icon: <Server size={24} />,
      technologies: ["Spring Boot", "File Management", "Cloud Storage", "REST API"],
      category: "Backend",
      featured: true
    },
    {
      id: 6,
      name: "Ecommerce",
      title: "E-commerce Backend",
      description: "A complete e-commerce backend developed using Spring Boot, including user authentication, product management, and order processing APIs.",
      html_url: "https://github.com/vg-king/Ecommerce",
      homepage: "",
      language: "Java",
      icon: <Globe size={24} />,
      technologies: ["Spring Boot", "Authentication", "Product Management", "Order Processing"],
      category: "Backend",
      featured: true
    },
    {
      id: 7,
      name: "TrainTrakcer",
      title: "TrainTracker",
      description: "A core Java project to store and manage train-related data locally. Focused on applying object-oriented principles and basic file handling.",
      html_url: "https://github.com/vg-king/TrainTrakcer",
      homepage: "",
      language: "Java",
      icon: <Train size={24} />,
      technologies: ["Core Java", "OOP", "File Handling", "Data Management"],
      category: "Desktop",
      featured: false
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      Java: '#007396',
      Kotlin: '#7F52FF',
      Python: '#3776AB',
      HTML: '#E34F26',
      CSS: '#1572B6',
      React: '#61DAFB',
      Vue: '#4FC08D'
    };
    return colors[language] || '#8B5CF6';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Backend': '#8B5CF6',
      'Frontend': '#3B82F6',
      'Full Stack': '#06B6D4',
      'Mobile': '#10B981',
      'Desktop': '#F59E0B'
    };
    return colors[category] || '#8B5CF6';
  };

  // Merge GitHub data with featured projects
  const displayProjects = featuredProjects.map(featured => {
    const githubData = projects.find(p => p.name.toLowerCase() === featured.name.toLowerCase());
    return {
      ...featured,
      stargazers_count: githubData?.stargazers_count || 0,
      forks_count: githubData?.forks_count || 0,
      updated_at: githubData?.updated_at || new Date().toISOString(),
      topics: githubData?.topics || []
    };
  });

  return (
    <section id="projects" className="projects section" ref={projectsRef}>
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">
            A showcase of my development journey featuring backend systems, mobile apps, and full-stack solutions
          </p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading projects from GitHub...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <h3>Unable to load projects</h3>
            <p>{error}</p>
            <div className="error-instructions">
              <h4>To fix this issue:</h4>
              <ol>
                <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">GitHub Settings → Personal Access Tokens</a></li>
                <li>Generate a new token with 'public_repo' scope</li>
                <li>Add it to your .env file as: VITE_GITHUB_TOKEN=your_token_here</li>
                <li>Restart your development server</li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            <div className="featured-section">
              <h3 className="featured-title">Featured Projects</h3>
              <div className="projects-grid featured-grid">
                {displayProjects.filter(p => p.featured).map((project) => (
                  <div key={project.id} className="project-card glass-card featured-card">
                    <div className="project-header">
                      <div className="project-icon-title">
                        <div className="project-icon">{project.icon}</div>
                        <div>
                          <h3>{project.title}</h3>
                          <span 
                            className="category-badge" 
                            style={{ backgroundColor: getCategoryColor(project.category) }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="project-stats">
                        <span className="stat">
                          <Star size={16} />
                          {project.stargazers_count}
                        </span>
                        <span className="stat">
                          <GitFork size={16} />
                          {project.forks_count}
                        </span>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-details">
                      <div className="project-language">
                        <span 
                          className="language-dot" 
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        ></span>
                        {project.language}
                      </div>
                      <div className="project-updated">
                        Updated {new Date(project.updated_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="project-links">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link primary"
                      >
                        <Github size={20} />
                        View Code
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link secondary"
                        >
                          <ExternalLink size={20} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Projects */}
            <div className="other-section">
              <h3 className="other-title">Other Projects</h3>
              <div className="projects-grid other-grid">
                {displayProjects.filter(p => !p.featured).map((project) => (
                  <div key={project.id} className="project-card glass-card">
                    <div className="project-header">
                      <div className="project-icon-title">
                        <div className="project-icon small">{project.icon}</div>
                        <div>
                          <h4>{project.title}</h4>
                          <span 
                            className="category-badge small" 
                            style={{ backgroundColor: getCategoryColor(project.category) }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="project-stats">
                        <span className="stat">
                          <Star size={14} />
                          {project.stargazers_count}
                        </span>
                        <span className="stat">
                          <GitFork size={14} />
                          {project.forks_count}
                        </span>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-details">
                      <div className="project-language">
                        <span 
                          className="language-dot" 
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        ></span>
                        {project.language}
                      </div>
                    </div>

                    <div className="project-links">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link primary small"
                      >
                        <Github size={18} />
                        Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="projects-footer">
          <a
            href="https://github.com/vg-king"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;