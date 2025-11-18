import React, { useState } from 'react';
import './Resume.css';
import certificates from "../../assets/Data/Certificates/Certificate";
import skills from "../../assets/Data/Skills/Skills";
import experience from '../../assets/Data/Experiences/Experience';
import education from '../../assets/Data/Education/Education';


// --- APP ---

export default function Resume() {

 const [expanded, setExpanded] = useState(false);


  return (
    <main className="resume-page">
      {/* Header */}
      <header className="resume-header">
        <div>
          <h1>Resume</h1>
          <p className="subtitle">
            A compact view of my skills, experience, and achievements.
          </p>
        </div>

        <a className="btn-download" href="#" download>
          ⬇️ Download Resume
        </a>
      </header>

      {/* Top Section */}
      <section className="top-row">
        <div className="photo-card">
          <div className="photo-frame">
            <img src="https://picsum.photos/seed/resume-profile/200" alt="Omar Cadingilan" />
          </div>
          <div className="photo-caption">
            <strong>Omar bin Ayob D. Cadingilan</strong>
            <div className="muted">
              WEB DESIGNER | FRONT END DEVELOPER | UI / UX DESIGNER • Philippines
            </div>
          </div>
        </div>

        <div className="summary-card card">
          <h2>Professional Summary</h2>
          <p>
            I am a highly skilled and versatile Web and System Designer and Developer with a
            passion for creating innovative and user-focused digital solutions. With strong
            experience in UI/UX design, mobile app development, and project management, I
            deliver functional and visually appealing digital products that exceed expectations.
          </p>

          <div className="contact-grid">
            <div><strong>Location:</strong> Labangan, Zamboanga del Sur</div>
            <div><strong>Email:</strong> <a href="mailto:omarcadingilan@gmail.com">omarcadingilan@gmail.com</a></div>
            <div><strong>Availability:</strong> Open to freelance & full-time</div>
          </div>
        </div>
      </section>

      {/* Skills & Certificates */}
<section className="skills-cert-row">
  <div className="skills-card card">
    <h3>Skills</h3>

    <div className="skills-list">
      {(expanded ? skills : skills.slice(0, 6)).map((s) => (
        <div key={s.name} className="skill-row">
          <div className="skill-label">
            <span>{s.name}</span>
            <span className="skill-percent">{s.level}%</span>
          </div>

          <div className="skill-bar-outer">
            <div
              className="skill-bar-inner"
              style={{ width: `${s.level}%`, backgroundColor: s.color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="certs-card card">
    <h3>Certificates</h3>

    <ul className="cert-list">
      {(expanded ? certificates : certificates.slice(0, 4)).map((c, i) => (
        <li key={i}>
          <strong>{c.title}</strong>
          <div className="muted">
            {c.issuer} • {c.year}
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

{/* View More / View Less Button */}
<div className="view-more-wrapper">
  <button className="view-more-btn" onClick={() => setExpanded(!expanded)}>
    {expanded ? "View Less ▲" : "View More ▼"}
  </button>
</div>


      {/* Experience */}
      <section className="timeline-section card">
        <h3>Experience</h3>

        <div className="timeline">
          {experience.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{exp.title}</h4>
                  <div className="muted date">{exp.from} — {exp.to}</div>
                </div>

                <div className="company">{exp.company}</div>

                <ul>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="education-row">
        <div className="edu-card card">
          <h3>Education</h3>

          {education.map((e, i) => (
            <div key={i} className="edu-item">
              <strong>{e.degree}</strong>
              <div className="muted">{e.school} • {e.year}</div>
            </div>
          ))}
        </div>

        <div className="certs-cta card">
          <h3>More Certificates</h3>
          <p className="muted">Download the full set of certificates.</p>
          <a className="btn-outline" href="#" download>
            Download Certificates
          </a>
        </div>
      </section>

      <footer className="resume-footer muted">
        Last updated: <time>June 2024</time>
      </footer>
    </main>
  );
}
