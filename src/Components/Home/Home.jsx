import React from 'react';
import './Home.css';
import profileImg from "../../assets/Images/Profile-Images/profile-image.png";
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Home = () => {
    return (
        <section className="home">

            <div className='home-content'>

                {/* Typewriter */}
                <div className="typewriter">
                    <Typewriter
                        options={{
                            strings: ['UI | UX Designer', 'Web Developer', 'Project Manager', 'Graphic Designer'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>

                {/* Header + Bio */}
                <div className='Header'>
                    <h1>Hello, my name is <br /> Omar bin Ayob D. Cadingilan</h1>
                    <p>
                        I am a highly skilled and versatile Web and System Designer and Developer with a passion
                        for creating innovative and user-focused digital solutions. With a strong background in UI/UX
                        design, mobile app development, and project management, I have successfully delivered results
                        in both individual and collaborative settings. My expertise includes transforming ideas into
                        functional, visually appealing products while meeting deadlines and exceeding client expectations.
                    </p>

                    {/* CTA */}
                    <div className="btn-wrapper">
                    <Link to="/projects" className="btn">
                      View My Work
                    </Link>

    <p className="follow-text">Follow Me On:</p>

    {/* SOCIAL ICONS */}
    <div className="social-links">
        <a href="https://www.facebook.com/Omarcadingilan01/" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare />
        </a>
        <a href="https://www.instagram.com/oms_void900" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
        </a>
        <a href="https://github.com/Momo90029" target="_blank" rel="noopener noreferrer">
            <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/omar-bin-ayob-cadingilan-42b25b2ab/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
        </a>
    </div>
</div>
                </div>

            </div>

            {/* PROFILE IMAGE MASK SECTION */}
            <div className="profile-mask-container">
                <div className="yellow-bg"></div>
                <img
                    className="profile-image"
                    src={profileImg}
                    alt="Omar Cadingilan"
                    loading="lazy"
                />
            </div>

        </section>
    );
};

export default Home;
