import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Background animation
import BackgroundCanvas from "../../Cadingilan_myportfolio/src/assets/Background/Floating/BackgroundCanvas.jsx";

// ✅ Components
import Home from './Components/Home/Home.jsx';
import Project from './Components/Projects/Project.jsx';
import Resume from './Components/Resume/Resume.jsx';
import About from './Components/About/About.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';

// ✅ Animation wrapper for all routes
function AnimatedRoutes() {
  const location = useLocation();


  // --- Dynamic Page Titles ---
  useEffect(() => {
    const titles = {
      '/': 'Home | Omar Cadingilan',
      '/projects': 'Projects | Omar Cadingilan',
      '/about': 'About | Omar Cadingilan',
      '/resume': 'Resume | Omar Cadingilan',
      '/contact': 'Contact | Omar Cadingilan',
    };
    document.title = titles[location.pathname] || 'Omar Cadingilan | Web Developer';
  }, [location]);


  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };


  

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", Component: Home },
          { path: "/projects", Component: Project },
          { path: "/about", Component: About },
          { path: "/resume", Component: Resume },
          { path: "/contact", Component: Contact },
        ].map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Component />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
       <BackgroundCanvas />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
