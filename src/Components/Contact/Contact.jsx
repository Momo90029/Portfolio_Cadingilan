import emailjs from "emailjs-com";
import React, { useState } from "react";
import {
  Send,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import "./Contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    send_copy: false,
  });

  const API_URL =
  import.meta.env.DEV
    ? "https://portfolio-cadingilan.vercel.app/api/ai"
    : "/api/ai";

  const [status, setStatus] = useState("idle");
  const [aiMode, setAiMode] = useState("generate");
  const [aiStatus, setAiStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =======================================================
  // ✅ UPDATED: CALL AI THROUGH VERCEL BACKEND
  // =======================================================
 async function callHfModel(message) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }),
    });

    if (!res.ok) throw new Error("AI request failed");

    const data = await res.json();

    // 🟢 CASE 1: HuggingFace returns array [{ generated_text }]
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    }

    // 🟢 CASE 2: HuggingFace returns { generated_text }
    if (data.generated_text) {
      return data.generated_text.trim();
    }

    console.warn("Unexpected AI response:", data);

    return "AI returned an unexpected format.";
  } catch (err) {
    console.error("AI Proxy Error:", err);
    throw err;
  }
}

  // =======================================================
  // AI GENERATE / POLISH
  // =======================================================
  const handleAI = async () => {
    if (aiMode === "generate" && !formData.subject.trim()) return;
    if (aiMode === "polish" && formData.message.trim().length < 5) return;

    setAiStatus("loading");

    try {
      let prompt = "";

      if (aiMode === "generate") {
        prompt = `
Write a short casual-professional message (3–6 sentences) the user can send to Omar regarding their project.

Subject: "${formData.subject}"

Tone: friendly, direct, concise.
        `;
      } else {
        prompt = `
Polish the following message into a clearer, friendly casual-professional email. Keep meaning the same.

Message:
"${formData.message}"
        `;
      }

      const output = await callHfModel(prompt);

      setFormData((prev) => ({ ...prev, message: output.trim() }));

      if (aiMode === "generate") setAiMode("polish");

      setAiStatus("success");
      setTimeout(() => setAiStatus("idle"), 1800);
    } catch (err) {
      console.error("AI error:", err);
      setAiStatus("error");
    }
  };

  // =======================================================
  // EMAIL SUBMIT (unchanged)
  // =======================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const timeString = new Date().toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
      });

      await emailjs.send(
        "service_9mynyxi",
        "template_26byk5u",
        {
          from_name: formData.name,
          email: formData.email,
          project: formData.subject,
          message: formData.message,
          time_sent: timeString,
          to_email: "omarcadingilan@gmail.com",
        },
        "cxcMyzn6ukIXa6AA9"
      );

      if (formData.send_copy) {
        await emailjs.send(
          "service_9mynyxi",
          "template_l2lstw4",
          {
            from_name: formData.name,
            email: formData.email,
            project: formData.subject,
            message: formData.message,
            time_sent: timeString,
            to_email: formData.email,
          },
          "cxcMyzn6ukIXa6AA9"
        );
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        send_copy: false,
      });
      setAiMode("generate");

      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error("Email sending failed:", err);
      setStatus("error");
    }
  };

  // =======================================================
  // RENDER
  // =======================================================
  return (
    <div className="contact-page-center">
      <div className="contact-wrapper">

        {/* LEFT SIDE */}
        <div className="contact-left">
          <div className="circle top"></div>
          <div className="circle bottom"></div>

          <h3 className="left-title">Contact Information</h3>
          <p className="left-text">
            I'm currently open to freelance projects and full-time opportunities.
            Feel free to reach out if you have questions or simply want to connect.
          </p>

          <div className="info-list">
            <div className="info-item">
              <div className="icon-box"><Mail className="icon" /></div>
              <div>
                <p className="label">Email</p>
                <p className="value">omarcadingilan@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><Phone className="icon" /></div>
              <div>
                <p className="label">Phone Number</p>
                <p className="value">(+63)9776605126</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><MapPin className="icon" /></div>
              <div>
                <p className="label">Location</p>
                <p className="value">
                  Purok III, Tapodoc, Labangan, Zamboanga del Sur
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">
          <h2 className="form-title">Send a Message</h2>

          <form onSubmit={handleSubmit} className="form">

            <div className="row">
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="field">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
              />
            </div>

            <div className="field">
              <div className="message-header">
                <label>Message</label>

                <button
                  type="button"
                  className={`polish-btn ${aiStatus}`}
                  disabled={aiStatus === "loading"}
                  onClick={handleAI}
                >
                  {aiStatus === "loading" ? (
                    <Loader2 className="spin" size={14} />
                  ) : aiStatus === "success" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  <span>
                    {aiStatus === "loading"
                      ? aiMode === "generate"
                        ? "Generating..."
                        : "Polishing..."
                      : aiMode === "generate"
                      ? "Generate Message"
                      : "Polish Message"}
                  </span>
                </button>
              </div>

              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or generate one..."
              ></textarea>

              {aiStatus === "error" && (
                <p className="error-text">
                  <AlertCircle size={12} /> AI failed. Try again.
                </p>
              )}
            </div>

            <div className="checkbox-field">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="send_copy"
                  checked={formData.send_copy}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Send me a copy of this message
              </label>
            </div>

            <button
              type="submit"
              className={`submit-btn ${status}`}
              disabled={status === "submitting" || status === "success"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="spin" size={18} /> Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle size={20} /> Message Sent!
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
