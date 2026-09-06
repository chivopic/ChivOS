# ChivOS — Product Brief (v0.1)

**Status:** draft for human sign-off · **Repo (planned):** `chivopic/ChivOS` · **Ship:** Vercel  
**Owner (door):** Forge · **Build (planned):** BOT-155 → App Builder / Frontend  
**Not yet:** no GitHub repo, no code, no deploy

---

## 1. One-liner
ChivOS is a **browser personal desktop** for Chiv — an interactive “home OS” that feels like sitting down at a machine, not scrolling a resume.

## 2. Why (vs chiv.blog)
| | chiv.blog | ChivOS |
|---|---|---|
| Job | Long-form writing / garden posts | **Main entry** — presence, play, navigation |
| Feel | Read | **Use** (windows, icons, focus) |
| Cadence | Articles over time | Always-on shell; content windows update slowly |

Motto fit: *build things · explore deeply · stay curious* — the desktop is the stage; blog posts are optional deep links.

## 3. Audience
Primary: visitors who already found Chiv (GitHub, X, friends).  
Secondary: hiring / collab screens — 30-second “who is this builder?” without a PDF.

## 4. Product shape (v1)
**Shell**
- Full-viewport desktop (dark workshop aesthetic; restrained motion)
- Icon dock / desktop icons → open **windows** (draggable, focusable, closable)
- Clock + “ChivOS” wordmark; optional light status bar
- Mobile: stacked “app list” → full-screen panels (no fake tiny windows)

**Windows (v1 content — static / MD-driven, no CMS)**
1. **About** — who Chiv is, positioning (AI-native SWE / Builder), short bio
2. **Projects** — 3–6 featured projects (name, one line, link, status)
3. **Notes** — links into digital garden / `chiv.blog` (not a second blog engine)
4. **Now** — what I’m building / learning this month (manual edit)
5. **Contact** — GitHub `chivopic`, email or X, clear CTA

**Explicit non-goals (v1)**
- No auth, no database, no agent chat inside the OS
- No real filesystem / terminal that executes code
- No multi-user; no analytics product; no SEO content farm
- No cloning blog CMS into the repo

## 5. Stack (recommended)
- **Next.js** (App Router) + TypeScript + Tailwind
- Content as local MD/MDX or typed TS constants (easy PR edits)
- Deploy: **Vercel** (preview per PR; production on `main` after you merge)
- Repo: public `chivopic/ChivOS`

Optional later: custom domain (e.g. path under existing brand, or `chiv.online` if unlocked) — **not blocking v1**.

## 6. Success criteria (v1 done when)
1. Cold load shows a coherent desktop in &lt; ~3s on decent network  
2. Open / focus / close at least About + Projects + Contact  
3. Looks intentional on phone (usable, not broken desktop parody)  
4. README: local run + Vercel link; license + “unofficial personal project” tone if needed  
5. Production URL on Vercel after **you** merge + approve deploy  

## 7. Ticket plan (after brief OK)
| Ticket | Owner | Outcome |
|--------|--------|---------|
| T0 Create `chivopic/ChivOS` (empty or Next scaffold) | Forge / you approve | Repo exists |
| T1 Desktop shell + window manager | 155 → Frontend / App Builder | Icons + windows work |
| T2 Content windows (About/Projects/Notes/Now/Contact) | 155 → App Builder + Writer | Real copy, not lorem |
| T3 Polish + a11y + mobile | 155 → Frontend | Keyboard/focus basics |
| T4 Vercel project + preview | 155 → DevOps | Preview URL |
| T5 Human merge → production | **You** | Live site |

## 8. Risks / decisions still open
- **Tone:** playful OS parody vs quiet craft tool — default: **quiet craft**, light OS metaphor  
- **Domain:** Vercel default first; custom domain later  
- **Projects list source:** hand-maintained in repo (v1) vs pull GitHub API (v2+)  
- **Brand assets:** need logo/avatar if you have a preferred mark  

## 9. Ask
Approve this brief (or mark edits) → then we create the repo and start T1.
