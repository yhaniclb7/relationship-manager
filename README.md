# Relationship Manager

A lightweight, VC-style relationship management tool built for operators who need to track their network without the bloat of traditional CRMs.

**Built for:** Yhanic Braithwaite  
**Purpose:** Track high-value relationships, manage follow-ups, close deals.

---

## Features

- **Priority-based tracking**: High/Medium/Low priority levels
- **Status workflow**: Active / Need to Foster / Dormant / Archived
- **Smart follow-ups**: Automatic overdue detection
- **Quick actions**: Mark contacted, schedule follow-ups (7/14/30 days)
- **Context fields**: Track why each relationship matters
- **Tagging system**: Organize by category (VC, AI, Personal, etc.)
- **Local storage**: Data persists in browser (export/import coming)
- **Premium dark UI**: Matches Mission Control v2 aesthetic

---

## Pre-loaded Contacts

The app ships with Yhanic's current network:
- **Raj Shah** (Shield Capital) - VC contact from Waypoint
- **Christo** - Pathway Automation co-founder
- **Alexa Chiriac** - Personal relationship
- **Alex Gill** - Best friend
- **John Richmond, Andrew Shen, Ami Patel, Paul Kwan** - Priority outreach targets

---

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui
- LocalStorage persistence
- Static export for easy hosting

---

## Deployment

### Option 1: Vercel (Recommended)
```bash
npx vercel --prod
```

### Option 2: Manual Upload
The `dist/` folder contains the static build. Upload to any static host:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

---

## Development

```bash
cd my-app
npm install
npm run dev
```

---

## Roadmap / Monetization

**Free tier (current):**
- Local storage only
- Up to 200 contacts
- Basic features

**Premium tier ($9/mo potential):**
- Cloud sync across devices
- Email integration (auto-log from Gmail)
- LinkedIn integration
- Team collaboration
- CSV import/export
- API access

**Use case for Yhanic:**
- Personal use: Track VC relationships, deal flow, Kellogg network
- Agency use: Pathway Automation could white-label this for clients
- VC use: Waypoint portfolio company relationship tracking

---

## GitHub Repo

https://github.com/yhaniclb7/relationship-manager

---

Built by Donna (Software Factory) | Feb 17, 2026
