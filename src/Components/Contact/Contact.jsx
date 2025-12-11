import emailjs from "emailjs-com";
import OpenAI from "openai";
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
    send_copy: false, // NEW
  });

  const [status, setStatus] = useState("idle");
  const [polishStatus, setPolishStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePolish = async () => {
    if (!formData.message || formData.message.length < 5) return;

    setPolishStatus("loading");

    try {
      const client = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true // Required for browser usage
      });

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Polish this message into a professional job-availability statement: "${formData.message}"`,
          },
        ],
      });

      const polished = response.choices[0].message.content;

      setFormData((prev) => ({
        ...prev,
        message: polished,
      }));

      setPolishStatus("success");
      setTimeout(() => setPolishStatus("idle"), 2500);
    } catch (err) {
      console.error(err);
      setPolishStatus("error");
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("submitting");

  try {
    const timeString = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
    });

    // STEP A — Send email to you
    await emailjs.send(
      "service_9mynyxi",
      "template_26byk5u",   // Your template
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

    // STEP B — Optional: Send copy to the user
    if (formData.send_copy) {
      await emailjs.send(
        "service_9mynyxi",
        "template_l2lstw4",  // The user template ID
        {
          from_name: formData.name,
          email: formData.email,
          project: formData.subject,
          message: formData.message,
          time_sent: timeString,
          to_email: formData.email,   // Only send to user
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

    setTimeout(() => setStatus("idle"), 3000);
  } catch (err) {
    setStatus("error");
    console.error("Email sending failed:", err);
  }
};


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
              <div className="icon-box">
                <Mail className="icon" />
              </div>
              <div>
                <p className="label">Email</p>
                <p className="value">omarcadingilan@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <Phone className="icon" />
              </div>
              <div>
                <p className="label">Phone Number</p>
                <p className="value">(+63)9776605126</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <MapPin className="icon" />
              </div>
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
                  className={`polish-btn ${polishStatus}`}
                  disabled={polishStatus === "loading"}
                  onClick={handlePolish}
                >
                  {polishStatus === "loading" ? (
                    <Loader2 className="spin" size={14} />
                  ) : polishStatus === "success" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  <span>
                    {polishStatus === "loading"
                      ? "Polishing..."
                      : polishStatus === "success"
                      ? "Polished!"
                      : "AI Polish"}
                  </span>
                </button>
              </div>

              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              ></textarea>

              {polishStatus === "error" && (
                <p className="error-text">
                  <AlertCircle size={12} /> Failed to polish. Try again.
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
