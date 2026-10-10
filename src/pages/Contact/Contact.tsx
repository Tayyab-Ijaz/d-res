import { useState } from "react"
import type { FormEvent } from "react"
import bg from "../../assets/about/hero.jpg"
import "./contact.css"

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)
    setFeedback(null)

    const form = event.currentTarget
    const values = new FormData(form)
    const payload = {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      subject: String(values.get("subject") ?? ""),
      message: String(values.get("message") ?? ""),
      website: String(values.get("website") ?? ""),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const text =
          response.status === 404 || response.status === 405
            ? "The contact service is not running. For local testing, start the app with `npx vercel dev`."
            : response.status === 503
              ? "The contact service is not configured. Check the Vercel email environment variables."
              : "Your message could not be sent. Please try again later."
        setFeedback({ type: "error", text })
        return
      }

      form.reset()
      setFeedback({ type: "success", text: "Thank you. Your message has been sent." })
    } catch {
      setFeedback({ type: "error", text: "We could not connect to the contact service. Please try again later." })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-page" style={{ "--contact-bg": `url(${bg})` } as React.CSSProperties}>
      <div className="container contact-layout">
        <div className="contact-intro">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1>Let&rsquo;s start a <em>conversation.</em></h1>
          <p>
            Contact DASHRES about research collaboration, projects, or questions for our group.
            Send a message using the form and we&rsquo;ll get back to you.
          </p>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" maxLength={100} required />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
          <label>
            What would you like to discuss?
            <select name="subject" defaultValue="Research collaboration">
              <option>Research collaboration</option>
              <option>Projects</option>
              <option>General inquiry</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows={6} maxLength={5000} required />
          </label>
          <label className="contact-honeypot" aria-hidden="true">
            Leave this field empty
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send message"}
          </button>
          {feedback && (
            <p className={`contact-feedback contact-feedback-${feedback.type}`} role={feedback.type === "error" ? "alert" : "status"}>
              {feedback.text}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}