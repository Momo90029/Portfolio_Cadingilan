import React from "react";
import './Footer.css';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (

      <footer className="bg-dark text-light border-top py-3 mt-auto">
      <div className="containerfooter d-flex justify-content-between align-items-center flex-wrap">
       
      <div className="logo">
          <h2 className="fs-5 fw-semibold mb-0 text-white">O.C</h2>
        </div>


        {/* Left side (text & links) */}
      <div className="containerfooter d-flex justify-content-between align-items-center flex-wrap">
             <p className="mb-0">
             © {new Date().getFullYear()} Omar bin Ayob D. Cadingilan. All rights reserved.
             </p>
        </div>


        {/* Right side (social icons) */}
        <div className="d-flex align-items-center gap-3 me-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
            <FaInstagram size={22} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
            <FaFacebook size={22} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
            <FaLinkedin size={22} />
          </a>
          <a href="https://github.com/Momo90029" target="-blank" rel="noopener noreferrer" className="text-light">
            <FaGithub size={22}></FaGithub></a>
        </div>

      </div>
    </footer>

  );
};

export default Footer;