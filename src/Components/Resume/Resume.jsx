import React from "react";
import "./Resume.css";
import profileImg from "../../assets/Images/Profile-Images/profile-image.png";
import Resumepdf from "../../assets/Downloads/Resume_Cadingilan/Resume_cadingilan.pdf";
import certificates from "../../assets/Data/Certificates/Certificate";
import skills from "../../assets/Data/Skills/Skills";


const experience = [
  {
    title: "Web & System Designer / Developer",
    company: "Freelance / Personal Projects",
    from: "2022",
    to: "Present",
    bullets: [
      "Design and build responsive websites and internal systems.",
      "Create UI/UX prototypes and translate them to production-ready components.",
      "Manage small cross-functional projects through delivery.",
    ],
  },
  {
    title: "Junior Front-End Developer",
    company: "Example Company",
    from: "2020",
    to: "2022",
    bullets: [
      "Implemented design-to-code workflows and optimized performance.",
      "Worked closely with designers to ship iterative product improvements.",
    ],
  },
];

const education = [
  {
    degree: "BS in Information Technology",
    school: "(Add your school here)",
    year: "2018 - 2022",
  },
];

export default function Resume() {
  return (
    <main className="resume-page light-theme" aria-labelledby="resume-heading">
      {/* Header */}
      <header className="resume-header">
        <div className="resume-title-area">
          <h1 id="resume-heading">Resume</h1>
          <p className="subtitle">
            A compact view of my skills, experience, and achievements.
          </p>
        </div>

        <div className="resume-actions">
          <a
            className="btn-download"
            href={Resumepdf}
            download="Omar_Cadingilan_Resume.pdf"
          >
            ⬇️ Download Resume
          </a>
        </div>
      </header>

      {/* Top Section */}
      <section className="top-row">
        <div className="photo-card">
          <div className="photo-frame">
            <img src={profileImg} alt="Omar Cadingilan" />
          </div>
          <div className="photo-caption">
            <strong>Omar bin Ayob D. Cadingilan</strong>
            <div className="muted">WEB DESIGNER|FRONT END DEVELOPER| UI / UX DESIGNER |
            WEB DEVELOPER • Philippines</div>
          </div>
        </div>

        <div className="summary-card card">
          <h2>Professional Summary</h2>
          <p>
            I am a highly skilled and versatile Web and System Designer and Developer with a passion for
            creating innovative and user-focused digital solutions. With a strong background in UI/UX
            design, mobile app development, and project management, I have successfully delivered
            results in both individual and collaborative settings. My expertise includes transforming ideas
            into functional, visually appealing products while meeting deadlines and exceeding client
            expectations.

          </p>

          <div className="contact-grid">
            <div><strong>Location:</strong> Purok III, Tapodoc, Labangan, Zamboanga del Sur</div>
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
            {skills.map((s) => (
              <div key={s.name} className="skill-row">
                <div className="skill-label">
                  <span>{s.name}</span>
                  <span className="skill-percent">{s.level}%</span>
                </div>
                <div className="skill-bar-outer">
                  <div
                    className="skill-bar-inner"
                    style={{ width: `${s.level}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="certs-card card">
          <h3>Certificates</h3>
          <ul className="cert-list">
            {certificates.map((c, i) => (
              <li key={i}>
                <strong>{c.title}</strong>
                <div className="muted">{c.issuer} • {c.year}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section card">
        <h3>Experience</h3>
        <ol className="timeline">
          {experience.map((exp, idx) => (
            <li key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{exp.title}</h4>
                  <div className="muted date">{exp.from} — {exp.to}</div>
                </div>
                <div className="muted company">{exp.company}</div>
                <ul>
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section className="education-cert-row">
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
          <p className="muted">
              Want to see certificates or project badges? Add links or uploaded PDFs here.
          </p>

        {/* FIXED DOWNLOAD BUTTON */}
            <a className="btn-outline" href="/Certificates_Cadingilan.zip" download>
                Download Certificates
            </a>
        </div>

      </section>

      {/* Footer */}
      <footer className="resume-footer muted">
        Last updated: <time>Nov 16, 2025</time>
      </footer>
    </main>
  );
}
