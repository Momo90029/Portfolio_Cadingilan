import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import "./Project.css";


/* -----------------------------------------------------------------
   SUB-COMPONENT: ProjectCard
   Handles hover + auto-rotating carousel
   ----------------------------------------------------------------- */
const ProjectCard = ({ project, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isHovered && project.images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, project.images.length]);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(project); }}
    >
      {/* Image Area */}
      <div className="image-area">
        {project.images.length > 0 ? (
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} preview`}
            className={`card-image ${isHovered ? 'card-image-hover' : ''}`}
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}

        {/* Hover Overlay */}
        <div className={`hover-overlay ${isHovered ? 'hover-overlay-visible' : ''}`}>
          <Maximize2 className="hover-icon" size={32} />
        </div>

        {/* Carousel Indicators (Dots) */}
        {project.images.length > 1 && isHovered && (
          <div className="carousel-dots">
            {project.images.map((_, idx) => (
              <div
                key={idx}
                className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="card-content">
        <h3 className={`card-title ${isHovered ? 'card-title-hover' : ''}`}>{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="card-footer">
          <span className="view-details">View Details →</span>
        </div>
      </div>
    </div>
  );
};

/* -----------------------------------------------------------------
   SUB-COMPONENT: ProjectModal
   Detailed view with manual carousel controls
   ----------------------------------------------------------------- */
const ProjectModal = ({ project, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Reset active index when project changes
    setActiveIndex(0);
  }, [project]);

  if (!project) return null;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="modal-root" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="backdrop" onClick={onClose} />

      {/* Modal Card */}
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <button className="icon-button close-button" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body">
          {/* Large Carousel Section */}
          <div className="modal-carousel">
            {project.images.length > 0 ? (
              <img
                src={project.images[activeIndex]}
                alt={`Slide ${activeIndex}`}
                className="modal-image"
              />
            ) : (
              <div className="no-images-large">No Images</div>
            )}

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="nav-button left"
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="nav-button right"
                  aria-label="Next"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Pagination Dots */}
                <div className="modal-pagination">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`modal-dot ${idx === activeIndex ? 'active' : ''}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Description Section */}
          <div className="modal-description">
            <h3 className="about-title">About this Project</h3>
            <p className="about-text">{project.description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


export default function Project() {

  // Dynamically import all folders
const eKonsultaImagesImport = import.meta.glob(
  '../../assets/Images/Projects_Images/E-Konsulta/*.{jpg,jpeg,png}',
  { eager: true }
);

const PawFriendsImagesImport = import.meta.glob(
  '../../assets/Images/Projects_Images/Pawfriends/*.{jpg,jpeg,png}',
  { eager: true }
);

const ElogbookImageImport = import.meta.glob(
  '../../assets/Images/Projects_Images/Elogbook/*.{jpg,jpeg,png}',
  { eager: true }
);

// Convert each import object to an array of URLs
const eKonsultaImages = Object.values(eKonsultaImagesImport).map((img) => img.default);
const PawFriendsImages = Object.values(PawFriendsImagesImport).map((img) => img.default);
const ElogbookImages = Object.values(ElogbookImageImport).map((img) => img.default);


  const [selectedProject, setSelectedProject] = useState(null);


  const projects = [
    {
      id: '1',
      title: 'E-Konsulta: Clinic Medical Record Management System with Online Follow-Up Through Google Meet',
      description: <p>E-Konsulta is a system we developed during our capstone project, 
      it is a system that boosted the work efficiency of our clinic, it highlights live tracking of data of the patients 
      and inventory of the clinic. it also has the feature of integrating online checkup using gmeet for scheduling patients 
      that arent able to be in the clinic physically.</p>,
      images: eKonsultaImages
    },
    {
      id: '2',
      title: 'PawFriends: Pet Health and Mood Tracking App',
      description: <p>PawFriends app will let the user’s  be able to track down the health and food of your pet 
        and recommending food suitable to your pet by letting the user know and track the pets status. We will 
        measure effectiveness by getting the feedback of the user satisfaction and getting result of the pets condition.</p>,
      images: PawFriendsImages
    },
    {
      id: '3',
      title: 'OWWA Digital E-Logbook System',
      description: <p>The OWWA Digital E-Logbook System is a streamlined, data-driven platform designed to modernize
         client monitoring and service recording for Overseas Workers Welfare Administration (OWWA) offices. This tool 
         enhances efficiency by automating client check-ins and organizing essential client information using smart categorization 
         features.</p>,
      images: ElogbookImages
    },
  ]; 

  return (
    <main className="app-container">
      <div className="content-wrapper">

        <header className="header">
          <h1 className="site-title">My Recent Projects</h1>
          <div className="title-underline" />
          <p className="subtitle">
            Here are some recent projects I've been working on.
            <br className="hidden-break" />
            Hover over a card to preview the gallery.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="grid-item">
              <ProjectCard project={project} onClick={setSelectedProject} />
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

      </div>
    </main>
  );
}
