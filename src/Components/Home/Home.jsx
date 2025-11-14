import React from 'react';
import backgroundsvg from '../../assets/Background/yellowbg.svg';
import './Home.css';
import profileImg from "../../assets/Images/Profile-Images/profile-image.png";
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="home">

<div className='home-content'>
    <div className="typewriter">
        <Typewriter
            options={{
                strings: ['UI | UX Designer', 'Web Developer', 'Project Manager', 'Graphic Designer'],
                autoStart: true,
                loop: true,
            }}
        />
    </div>

    <span className='Header'>
         <h1>Hello, my name is <br /> Omar bin Ayob D. Cadingilan </h1>
    <p>
       I am a highly skilled and versatile Web and System Designer and Developer with a passion
       for creating innovative and user-focused digital solutions. With a strong background in UI/UX
       design, mobile app development, and project management, I have successfully delivered results
       in both individual and collaborative settings. My expertise includes transforming ideas into 
       functional, visually appealing products while meeting deadlines and exceeding client expectations.
    </p>
    <Link to="/projects" className="btn">
    View My Work
    </Link>

    </span>
   
</div>

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