import React, { useState } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Project.css';

// Reusable component for cards with hover-controlled carousel
const ProjectCardWithCarousel = ({ images, title, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card h-100 shadow-sm">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          interval={isHovered ? 2000 : null}
          pause={false}
          controls={false}
          indicators={false}
        >
          {images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                src={img}
                className="d-block w-100 card-img-top"
                alt={`${title}-${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-justify">{text}</p>
      </div>
    </div>
  );
};

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

const Project = () => {
  // Modal state and handlers
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleShow = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // List of projects
  const projects = [
    {
      title: 'E-Konsulta: Clinic Medical Record Management System with Online Follow-Up Through Google Meet',
      text: 'E-Konsulta is a system we developed during our capstone project, it is a system that boosted the work efficiency of our clinic, it highlights live tracking of data of the patients and inventory of the clinic. it also has the feature of integrating online checkup using gmeet for scheduling patients that arent able to be in the clinic physically. ',
      images: eKonsultaImages,
    },
    {
      title: 'PawFriends',
      text: 'PawFriends app will let the user’s  be able to track down the health and food of your pet and recommending food suitable to your pet by letting the user know and track the pets status. We will measure effectiveness by getting the feedback of the user satisfaction and getting result of the pets condition.',
      images: PawFriendsImages,
    },
    {
      title: 'OWWA E-Logbook System',
      text: 'This is another example card that will autoplay on hover.',
      images: ElogbookImages,
    },
  ];

  return (
    <div className="container-card my-5">
      <section className="text-center mb-5">
        <h1 className="fw-bold">My Recent Project's</h1>
        <p className="text-muted">Here are some Recent Project that I've been working with</p>
      </section>

      {/* Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {projects.map((project, index) => (
          <div
            className="col"
            key={index}
            onClick={() => handleShow(project)}
            style={{ cursor: 'pointer' }}
          >
            <ProjectCardWithCarousel
              images={project.images}
              title={project.title}
              text={project.text}
            />
          </div>
        ))}
      </div>

      {/* Modal for project details */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel interval={2500} pause="hover">
                {selectedProject.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      className="d-block w-100"
                      alt={`${selectedProject.title}-${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <p className="mt-3 text-muted">{selectedProject.text}</p>
            </Modal.Body>
            <Modal.Footer>
             
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Project;
