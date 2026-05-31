import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact — Direct Line message delivery via Resend.
 *
 * Server-only. The Resend API key is read from process.env at request time and
 * is NEVER returned to the client or written to logs. Validation mirrors the
 * client form; a hidden honeypot field and a best-effort per-IP rate limit
 * provide lightweight spam protection. Success is reported ONLY when Resend
 * confirms the send.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Best-effort in-memory rate limit. Scoped to a single server instance and
 * reset on cold start — adequate as a light abuse guard for a portfolio form.
 * TODO: swap for a durable store (e.g. Upstash Redis) for multi-instance prod. */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(fields: {
  name: string;
  email: string;
  topic: string;
  link: string;
  message: string;
  timestamp: string;
}): string {
  const { name, email, topic, link, message, timestamp } = fields;
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:0.18em;color:#7f86a8;text-transform:uppercase;vertical-align:top;width:96px;">${label}</td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.08);font:400 15px/1.5 -apple-system,Segoe UI,Arial,sans-serif;color:#e7f7ff;vertical-align:top;">${value}</td>
    </tr>`;
  const linkRow = link
    ? row("Link", `<a href="${escapeHtml(link)}" style="color:#00d9ff;text-decoration:none;">${escapeHtml(link)}</a>`)
    : "";
  return `<!doctype html><html><body style="margin:0;background:#070b19;padding:28px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#0a0e1c;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;">
    <tr><td style="padding:22px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div style="font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:0.24em;color:#00d9ff;text-transform:uppercase;">● Direct Line / 05</div>
      <div style="margin-top:6px;font:700 20px/1.2 -apple-system,Segoe UI,Arial,sans-serif;color:#f5f2ea;">New portfolio message</div>
    </td></tr>
    <tr><td style="padding:8px 28px 22px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", escapeHtml(name))}
        ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#00d9ff;text-decoration:none;">${escapeHtml(email)}</a>`)}
        ${row("Topic", escapeHtml(topic))}
        ${linkRow}
        ${row("Time", escapeHtml(timestamp))}
      </table>
      <div style="margin-top:18px;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:0.18em;color:#7f86a8;text-transform:uppercase;">Message</div>
      <div style="margin-top:8px;padding:16px;background:rgba(8,11,22,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:12px;font:400 15px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#e7f7ff;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);font:400 12px/1.4 -apple-system,Segoe UI,Arial,sans-serif;color:#7f86a8;">Sent from the ALBARAA OS contact console · reply directly to respond.</td></tr>
  </table>
</body></html>`;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const topic = String(raw.topic ?? "").trim() || "General";
  const link = String(raw.link ?? "").trim();
  const message = String(raw.message ?? "").trim();
  const honeypot = String(raw.company ?? "").trim();

  // Honeypot: humans never fill the hidden "company" field. Silently accept so
  // the bot believes it worked, but send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  else if (name.length > 120) errors.name = "Name is too long.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Email is invalid.";
  if (!message) errors.message = "Message is required.";
  else if (message.length > 5000) errors.message = "Message is too long.";
  if (link && (!isValidUrl(link) || link.length > 500)) errors.link = "Link must be a valid URL.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    // Never reveal which variable is missing (or its value) to the client.
    console.error("[contact] Email service is not configured.");
    return NextResponse.json({ ok: false, error: "Email service is not configured yet." }, { status: 500 });
  }

  const timestamp = new Date().toISOString();
  const subject = `New portfolio message from ${name}`;
  const text = [
    "New message via the ALBARAA portfolio /contact console",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Topic:   ${topic}`,
    `Link:    ${link || "—"}`,
    `Time:    ${timestamp}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html: buildHtml({ name, email, topic, link, message, timestamp }),
    });
    if (error || !data?.id) {
      // Log the failure category only — never the message body or secrets.
      console.error("[contact] Resend reported a send failure.");
      return NextResponse.json({ ok: false, error: "Couldn’t deliver the message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    console.error("[contact] Resend send threw an exception.");
    return NextResponse.json({ ok: false, error: "Couldn’t deliver the message." }, { status: 502 });
  }
}
