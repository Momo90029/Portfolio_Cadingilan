import React, { useEffect, useState } from "react";
import "./About.css";
import Typewriter from "typewriter-effect";
import profileImg from "/src/assets/Images/Profile-Images/profile-image.png"; // ✅ correct relative import

 const githubUsername = "Momo90029";

 
  const interests = [
    { icon: "🎮", label: "Video Games", sub: "Strategist" },
    { icon: "🏋️‍♂️", label: "Gym & Fitness", sub: "Dedicated" },
    { icon: "🏃", label: "Running", sub: "Endurance" },
    { icon: "💡", label: "Web Trends", sub: "Innovator" },
  ];

  const languages = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  ];

  const tools = [
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    { name: "Chrome", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg" },
    { name: "Canva", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  ];


const About = () => {
  
  return (
    <section className="about-root">
      {/* Background blobs / noise */}
      <div className="about-bg">
        <div className="blob blob-yellow" aria-hidden="true" />
        <div className="blob blob-purple" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
      </div>

      <div className="about-inner">
        {/* Top split: image left, bio right */}
        <div className="about-top">
          <div className="about-image-wrap">
            <div className="image-ring" />
            <div className="image-offset" />
            <img className="profile-img" src={profileImg} alt="Omar Cadingilan" />
           <div className="badge badge-left badge-float">
                <div className="badge-emoji">🚀</div>
                 <div>
                    <div className="badge-label">Status</div>
                    <div className="badge-value">Open to Work</div>
                  </div>
                </div>


            <div className="badge badge-right badge-float">
              <div className="badge-emoji">💻</div>
              <div>
                <div className="badge-label">Experience</div>
                <div className="badge-value">3+ Years</div>
              </div>
            </div>
          </div>

          <div className="about-content">
            <div className="small-label">About Me</div>
            <h1 className="about-title">Omar bin Ayob D. Cadingilan</h1>

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

            <div className="bio-text">
              <p>
                Hello! I’m based in <strong>Zamboanga del Sur, Philippines</strong>. I transform complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p>
                I craft elegant digital experiences — from <span className="tag">clean UI/UX</span> to <span className="tag purple">robust code</span>. I aim for clarity, accessibility and performance.
              </p>
            </div>

            <div className="hobbies">
              <h3>Hobbies</h3>
              <div className="hobby-grid">
                {interests.map((it, idx) => (
                  <div key={idx} className="hobby-card">
                    <div className="hobby-emoji">{it.icon}</div>
                    <div className="hobby-title">{it.label}</div>
                    <div className="hobby-sub">{it.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quote-card">
              <div className="quote-mark">”</div>
              <p className="quote-text">"Design with purpose. Build with passion."</p>
            </div>
          </div>
        </div>

        {/* Bottom: tech stack, tools, contributions */}
        <div className="about-bottom">
          <div className="section tech">
            <h3>Tech Stack</h3>
            <div className="chip-row">
              {languages.map((l, i) => (
                <div key={i} className="chip">
                  <img src={l.logo} alt={l.name} />
                  <span>{l.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section tools">
            <h3>Tools I Use</h3>
            <div className="chip-row">
              {tools.map((t, i) => (
                <div key={i} className="chip">
                  <img src={t.logo} alt={t.name} />
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section contributions">
            <h3>Days I Code</h3>
            <div className="contrib-card">
              <img
                        className="gh-graph"
                        src={`https://github-contributions-api.jogruber.de/v4/Momo90029`}
                        alt="GitHub contributions"
              />

              <div className="contrib-footer">
                <span className="muted">Contribution Calendar</span>
                <a className="gh-link" href={`https://github.com/Momo90029`} target="_blank" rel="noreferrer">
                  @{githubUsername} ↗
                </a>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </section>
  );
}

export default About; 