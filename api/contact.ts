import type { IncomingMessage, ServerResponse } from "node:http"

type ContactRequest = IncomingMessage & { body?: unknown }
type ContactResponse = ServerResponse & {
  status(statusCode: number): ContactResponse
  json(payload: unknown): void
}

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

const allowedSubjects = new Set(["Research collaboration", "Projects", "General inquiry"])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function readPayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) return null
  const { name, email, subject, message, website } = value
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    typeof website !== "string"
  ) {
    return null
  }
  return { name: name.trim(), email: email.trim(), subject, message: message.trim(), website }
}

export default async function handler(req: ContactRequest, res: ContactResponse): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).json({ message: "Method not allowed." })
    return
  }

  const origin = req.headers.origin
  const hostHeader = req.headers["x-forwarded-host"] ?? req.headers.host
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        res.status(403).json({ message: "Request origin is not allowed." })
        return
      }
    } catch {
      res.status(403).json({ message: "Request origin is not allowed." })
      return
    }
  }

  const payload = readPayload(req.body)
  if (
    !payload ||
    !payload.name ||
    payload.name.length > 100 ||
    payload.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    !allowedSubjects.has(payload.subject) ||
    !payload.message ||
    payload.message.length > 5000
  ) {
    res.status(400).json({ message: "Please check the form fields and try again." })
    return
  }

  if (payload.website) {
    res.status(400).json({ message: "Invalid submission." })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_TO_EMAIL
  const sender = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !recipient || !sender) {
    console.error("Contact form is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.")
    res.status(503).json({ message: "The contact form is temporarily unavailable." })
    return
  }

  let response: Response
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: payload.email,
        subject: `DASHRES website: ${payload.subject}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      }),
    })
  } catch (error) {
    console.error("Contact form could not reach the email provider.", error)
    res.status(502).json({ message: "The message could not be sent right now." })
    return
  }

  if (!response.ok) {
    console.error("Email provider rejected the contact message.", response.status)
    res.status(502).json({ message: "The message could not be sent right now." })
    return
  }

  res.status(200).json({ message: "Message sent." })
}
