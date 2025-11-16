import React from "react";
import "./Resume.css";
import profileImg from "../../assets/Images/Profile-Images/profile-image.png";


const skills = [
  { name: "JavaScript (ES6+)", level: 85, color: "#F1C40F" },
  { name: "React.js", level: 80, color: "#F1C40F" },
  { name: "HTML / CSS / Tailwind", level: 90, color: "#F1C40F" },
  { name: "UI/UX Design", level: 75, color: "#F1C40F" },
];

const certificates = [
  { title: "Front-End Web Development", issuer: "FreeCodeCamp", year: 2023 },
  { title: "Figma UI Design", issuer: "Coursera", year: 2022 },
];

const experience = [
  {
    title: "Web & System Designer / Developer",
    company: "Freelance / Personal Projects",
    from: "2022",
    to: "Present",
    bullets: [
      "Design and build responsive websites and internal systems.",
      "Create UI/UX prototypes and translate them to production-ready components.",
      "Manage small cross-functional projects through delivery."
    ]
  },
  {
    title: "Junior Front-End Developer",
    company: "Example Company",
    from: "2020",
    to: "2022",
    bullets: [
      "Implemented design-to-code workflows and optimized performance.",
      "Worked closely with designers to ship iterative product improvements."
    ]
  }
];

const education = [
  {
    degree: "BS in Information Technology",
    school: "(Add your school here)",
    year: "2018 - 2022"
  }
];

export default function Resume() {
  return (
    <main className="resume-page" aria-labelledby="resume-heading">
      {/* Header / Actions */}
      <header className="resume-header">
        <div className="resume-title-area">
          <h1 id="resume-heading">Resume</h1>
          <p className="subtitle">A compact view of my skills, experience, and achievements.</p>
        </div>

        <div className="resume-actions">
          <a
            className="btn-download"
            href="/assets/Omar_Cadingilan_Resume.pdf"
            download="Omar_Cadingilan_Resume.pdf"
            aria-label="Download resume PDF"
          >
            ⬇️ Download Resume
          </a>
        </div>
      </header>

      {/* Top row: photo + summary */}
      <section className="top-row">
        <div className="photo-card" aria-hidden="false">
          <div className="photo-frame">
            <img src={profileImg} alt="Omar Cadingilan" loading="lazy" />
          </div>
          <div className="photo-caption">
            <strong>Omar bin Ayob D. Cadingilan</strong>
            <div className="muted">Web & System Designer • Philippines</div>
          </div>
        </div>

        <div className="summary-card card">
          <h2>Professional Summary</h2>
          <p>
            I am a passionate Web & System Designer and Developer focused on creating
            elegant, accessible, and high-performance user experiences. I work across
            design and engineering to bring clear, maintainable, and user-focused solutions.
          </p>

          <div className="contact-grid">
            <div><strong>Location:</strong> Zamboanga del Sur, Philippines</div>
            <div><strong>Email:</strong> <a href="omarcadingilan@gmail.com">omarcadingilan@gmail.com</a></div>
            <div><strong>Availability:</strong> Open to freelance & full-time</div>
          </div>
        </div>
      </section>

      {/* Skills + Certificates row */}
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

                {/* animated bar */}
                <div className="skill-bar-outer" role="progressbar" aria-valuenow={s.level} aria-valuemin="0" aria-valuemax="100">
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

      {/* Timeline (Experience) */}
      <section className="timeline-section card">
        <h3>Experience</h3>

        <ol className="timeline">
          {experience.map((exp, idx) => (
            <li key={idx} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true"></div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{exp.title}</h4>
                  <div className="muted date">{exp.from} — {exp.to}</div>
                </div>
                <div className="muted company">{exp.company}</div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Education + Certificates expanded */}
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
          <p className="muted">Want to see certificates or project badges? Add links or uploaded PDFs here.</p>
          <a className="btn-outline" href="/assets/certificates.zip" download>Download Certificates</a>
        </div>
      </section>

      {/* Footer small note */}
      <footer className="resume-footer muted">
        Last updated: <time dateTime="2025-11-16">Nov 16, 2025</time>
      </footer>
    </main>
  );
}
