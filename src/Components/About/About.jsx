import React from "react";
import Typewriter from "typewriter-effect";
import "./About.css";
import profileImg from "/Users/omarc/Desktop/Projects 2025/Portfolio/Cadingilan_Portfolio/Cadingilan_myportfolio/src/assets/Images/profile-image.png"; // ✅ correct relative import

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* 🖼️ Left side — Image */}
        <div className="about-image">
          <img src={profileImg} alt="Omar Cadingilan" loading="lazy" />
        </div>

        {/* 📜 Right side — Text Content */}
        <div className="about-content">
          <h2 className="section-title">MORE ABOUT ME</h2>

          {/* ✍️ Typewriter Titles */}
          <div className="typewriter">
            <Typewriter
              options={{
                strings: [
                  "UI | UX Designer",
                  "Web Developer",
                  "Project Manager",
                  "Graphic Designer",
                ],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </div>

          <p>
            Hi everyone! I’m <strong>Omar bin Ayob D. Cadingilan</strong> from
            Tapodoc, Labangan, Zamboanga del Sur, Philippines.
          </p>

          <p>
            I’m a passionate and versatile Web and System Designer & Developer,
            dedicated to crafting elegant, user-focused digital experiences
            from clean UI/UX design to robust system development.
          </p>

          <p>
            With a strong grasp of modern frameworks, responsive design, and
            efficient system architecture, I thrive on transforming complex
            challenges into simple, scalable, and effective solutions that
            deliver real-world impact.
          </p>

          <p>Outside of coding, I love keeping my creativity alive through:</p>

          {/* 🎯 Personal Interests */}
          <ul className="about-list">
            <li>🎮 Playing Video Games</li>
            <li>🏋️‍♂️ Going to the Gym</li>
            <li>🏃 Running</li>
            <li>💡 Finding Web Design Trends</li>
          </ul>

              <p>
                "Design with purpose. Build with passion." 
              </p>
              <p>-Omar Cadingilan</p>

        </div>
      </div>
    </section>
  );
};

export default About;
