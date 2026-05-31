# ALBARAA i18n — Arabic glossary & authoring rules

Canonical Arabic terminology. **Every surface must follow these** so the whole
site reads in one confident, premium, slightly-editorial Saudi/Arab voice — human,
warm, never stiff, never literal, never robotic, never marketing fluff.

## Tone
- Premium personal portfolio. Confident, clear, concise, memorable.
- Meaning-first, not word-for-word. Prefer natural phrasing a real person says.
- Modern Standard Arabic with a warm editorial feel; light, tasteful Saudi
  flavor is welcome ("خلّنا نبدأ الحديث") but never heavy slang.

## Canonical terms (use consistently)
| English | Arabic |
|---|---|
| Home | الرئيسية |
| About | عن البراء |
| Work / Selected Work | الأعمال / أعمال مختارة |
| Impact | الأثر |
| Résumé / Resume | السيرة الذاتية |
| Contact | تواصل |
| Ask Albaraa AI | اسأل ذكاء البراء |
| INDEX | الفهرس |
| Profile | الملف الشخصي |
| Identity | الهوية |
| Capabilities | القدرات |
| Skills | المهارات |
| Experience | الخبرة |
| Projects / Systems | المشاريع / الأنظمة |
| Leadership | القيادة |
| Open / Open X | افتح / استعرض |
| View | عرض |
| Download | تنزيل |
| Live | مباشر |
| Participants | مشارك |
| Software Engineering | هندسة البرمجيات |
| AI Builder | باني منتجات ذكاء اصطناعي |
| Full-Stack Developer | مطوّر متكامل |
| Open to opportunities | متاح للفرص |
| Send / Send Message | أرسل / أرسل الرسالة |
| Email | البريد الإلكتروني |
| Name | الاسم |
| Message | الرسالة |
| Topic | الموضوع |
| Optional | اختياري |

## DO NOT translate (keep Latin, identical in en & ar)
- Brand & product names: **ALBARAA, ALBARAA OS, DocuPilot**
- Tech/tool names: React, Next.js, TypeScript, Python, etc.
- URLs, domains, emails, social handles: docupilot.site, github.com/…, the email
- Route paths: /about, /work, …
- Numeric tokens/indices: 01, 02, 5,000+, etc.
- Org proper names where they are official names (translate the descriptive part
  only, keep the proper name; e.g. "Google Developer Groups" stays Latin).

## Authoring contract for a surface dictionary file
Export ONE const named for your surface, shape `{ ar: {...}, en: {...} }`, with
your assigned top-level namespace(s) inside each. English values must be
byte-faithful to the current source. Mark the file `as const`. Keys must be
identical between `ar` and `en`. Example:

```ts
export const hero = {
  ar: { hero: { eyebrow: "…", title: { main: "ALBARAA", subtitle: "…" } } },
  en: { hero: { eyebrow: "ALBARAA OS / INTELLIGENCE ENGINE", title: { main: "ALBARAA", subtitle: "AI Builder & Software Engineer" } } },
} as const;
```
