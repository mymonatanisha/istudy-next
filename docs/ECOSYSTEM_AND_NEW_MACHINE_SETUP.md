# EnamNotes (enamnotes.com) — Ecosystem & New Machine Setup

Last verified: 2026-09-21, against commit `8c8042e` on `main`.

This is the single reference for what this project is, how it is wired together, and how to
stand it up on a fresh computer. Pair it with `AGENTS.md` (project rules) and `README.md`.

---

## 0. Visual overview

![EnamNotes ecosystem flowchart](./enamnotes-ecosystem-flowchart.svg)

*The image above is `docs/enamnotes-ecosystem-flowchart.svg` — open it in any browser, or print it.*

### The one distinction that explains the most confusion

**CODE** travels through Git. **DATA** does not. A blog post is a row in a database table,
not a file — so pushing code can never make a post appear on the live site.

```mermaid
flowchart LR
    A["Your computer<br/>code + assets"] -->|git push origin main| B["GitHub<br/>mymonatanisha/istudy-next"]
    B -->|auto-deploy| C["Heroku"]
    C --> D["Cloudflare"]
    D --> E["enamnotes.com<br/>live site"]
```

### Why a post does not appear after a deploy

```mermaid
flowchart TB
    subgraph CODE["CODE — travels through Git"]
        direction LR
        C1["Your computer"] -->|git push| C2["GitHub"] --> C3["Heroku"] --> C4["enamnotes.com"]
    end

    subgraph DATA["DATA — stays behind"]
        direction LR
        D1["Local database<br/>enamnotes_local"] -. "git push cannot carry data" .-> D2["Production database<br/>Heroku Postgres"]
        D3["Admin form on the LIVE site<br/>/admin/blog"] -->|"the correct way"| D2
    end
```

### Starting on a new computer

```mermaid
flowchart LR
    S1["1. git clone"] --> S2["2. npm install"] --> S3["3. copy .env"]
    S3 --> S4["4. create<br/>enamnotes_local"] --> S5["5. npm run<br/>db:migrate"] --> S6["6. npm run dev"]
```

Detailed commands for each step are in section 8.

---

## 1. What this is

`istudy-next` is the Next.js application that powers **https://enamnotes.com** — an online
learning platform (courses, enrollment, blog, student/instructor/admin dashboards).

| Layer | Technology |
|---|---|
| Framework | Next.js 15.3.1, App Router, React 19 |
| Language | TypeScript 5.9 |
| Runtime | Node.js **24.x** (enforced via `package.json > engines`) |
| Database | PostgreSQL 18 + Prisma 5.15 |
| Auth | NextAuth 4.24 (Google OAuth) **plus** a custom `token` JWT cookie (`jsonwebtoken`) |
| State | Redux Toolkit + redux-persist (client-side only) |
| Styling | SCSS on a Bootstrap 5 base. Theme partials live in `public/assets/scss/` |
| Media | Cloudinary (admin blog image upload), YouTube Data API v3 (course videos) |
| Hosting | GitHub → **Heroku** (auto-deploy on push to `main`), fronted by **Cloudflare** |

Verified live: `Server: cloudflare`, `Via: 1.1 heroku-router`.

---

## 2. Repository map

```
istudy-next/
├─ src/
│  ├─ app/                     # App Router routes
│  │  ├─ (blog)/blog/          # DB-backed blog: /blog, /blog/[slug]
│  │  ├─ (dashboard)/          # (admin) /admin/*, (student), (instructor)
│  │  ├─ (courses-inner-pages)/# /courses, /courses/course-details/[courseId], ...
│  │  ├─ (pages)/              # about, contact, faq, shop, auth pages
│  │  ├─ (elements)/           # UI style-guide / element showcase (template demo)
│  │  ├─ api/                  # REST route handlers (admin + public)
│  │  └─ <verticals>/          # university, kindergarten, quran-learning,
│  │                           #   book-store, language-academy, modern-schooling,
│  │                           #   online-course
│  ├─ components/              # feature components (admin/, blog-inner-pages/, ...)
│  ├─ lib/                     # server-side helpers -> see section 4
│  ├─ data/                    # STATIC demo data (courses, legacy blog-data.ts)
│  ├─ redux/  hooks/  form/  contextApi/  interFace/  svg/  utils/  styles/
├─ prisma/
│  ├─ schema.prisma            # source of truth (introspected, lowercase model names)
│  └─ migrations/              # 18 migrations
├─ public/
│  ├─ assets/scss/             # the real theme (Bootstrap + partials)
│  ├─ assets/css/              # vendor CSS + spacing utilities
│  └─ blog/                    # blog post SVGs (cover + inline images)
├─ scripts/                    # verify-db-state.js, seed/migrate helpers
├─ Procfile                    # web: npm run start  (Heroku)
└─ AGENTS.md                   # PROJECT RULES — read this first
```

**Where styling actually lives:** `src/app/globals.scss` only `@forward`s files from
`public/assets/scss/`. To change site styling, edit `public/assets/scss/**`, not `globals.scss`.

---

## 3. Environment variables

Copy `.env.example` → `.env` (never commit `.env`; it is gitignored via `.env*`).

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. Local points at `enamnotes_local` |
| `JWT_SECRET` | Signs the custom `token` auth cookie |
| `NEXTAUTH_SECRET` | NextAuth session encryption |
| `NEXTAUTH_URL` | `http://localhost:3000` locally; the public URL in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Signed blog image uploads |
| `YT_API_KEY` | YouTube Data API v3 |

Notes:

- In the committed `.env`, the Cloudinary and YouTube values are **still placeholders**
  (`your-cloud-name`, etc.). Anything that needs them (the admin "upload image" button)
  will fail until real values are supplied. Pasting a static image path works regardless.
- `DATABASE_URL` format: `postgresql://USER:PASSWORD@HOST:PORT/DBNAME`.

---

## 4. Key server-side modules (`src/lib/`)

| File | Responsibility |
|---|---|
| `prisma.ts` | Prisma singleton (`globalForPrisma`), logging `error`/`warn` |
| `admin-auth.ts` | `getAdminUser()` — resolves the user via `token` cookie JWT, falling back to a NextAuth session, then requires `role_id === 1` |
| `auth.ts` | `getAuthUser()` — cookie JWT first, then NextAuth session |
| `blog-content.ts` | `sanitizeBlogContent()` — the blog HTML allow-list (section 6) |
| `blog-image-storage.ts` | Cloudinary signed upload/delete + `extractBlogImagePublicIds()`, `publicIdFromCloudinaryUrl()` |

**Authorization model:** there is no separate author/editor role. Only `role_id = 1`
(admin) may reach `/admin/*` pages and the admin APIs. `authorId` on a post is forced to the
logged-in admin.

---

## 5. Database

### Local
- PostgreSQL **18**, database **`enamnotes_local`**
- Local superuser `postgres`; its password is whatever is in your `.env`
- Data directory (Windows): `C:\Program Files\PostgreSQL\18\data`
- `psql`, `pg_dump`, `pg_restore` live in `C:\Program Files\PostgreSQL\18\bin`
  (pgAdmin ships its own copies at `pgAdmin 4\runtime\`)

### Schema
- `prisma/schema.prisma` is the **source of truth** and uses **lowercase, introspected
  model names** (`blog_posts`, `user`, `courses`, …) — not PascalCase.
- `blog_posts` has **no category, tags, or SEO-meta columns**. SEO metadata is derived at
  render time from `title`, `excerpt`, and `coverImage`.
- `updatedAt` has **no database default** — every write must set it explicitly.

### Workflow (mandated by `AGENTS.md`)
```
schema change → Prisma migration → test on local DB → test the app
             → git commit → production migration/deploy
```
**Never** run `prisma db push`, `prisma migrate reset`, or `prisma migrate dev` against
production. Ask before running anything that touches Heroku or the production database.

Migrations are **not** applied automatically by a deploy — run `npm run db:migrate`
(`prisma migrate deploy`) against production deliberately, after a backup.

### npm scripts
| Script | Does |
|---|---|
| `npm run dev` | `next dev` → http://localhost:3000 |
| `npm run build` / `start` | production build / serve |
| `npm run db:generate` | `prisma generate` |
| `npm run db:migrate` | `prisma migrate deploy` |
| `npm run db:migrate:dev` | `prisma migrate dev` (local only) |
| `npm run db:status` | `prisma migrate status` |
| `npm run db:studio` | Prisma Studio GUI |
| `npm run verify-db` | `node scripts/verify-db-state.js` |
| `npm run lint` | `next lint` |

> `npm run build` and `npm run dev` share the `.next` folder — stop the dev server before building.

---

## 6. The blog system (DB-backed)

This is the part most easily confused, because **two blog systems exist in the repo**.

### Use this: the database-backed flow
| Piece | Location |
|---|---|
| Admin UI (list + create + edit) | `/admin/blog` → `src/components/admin/blog/BlogPostsTable.tsx`, `BlogPostForm.tsx` |
| Admin API | `POST`/`GET` `/api/admin/blog-posts`, `PUT`/`GET`/`DELETE` `/api/admin/blog-posts/[id]` |
| Image upload API | `POST` `/api/admin/blog-posts/images` (Cloudinary, admin-only) |
| Public list | `/blog` → `DatabaseBlogPosts.tsx` (client-fetched from `/api/blog-posts`) |
| Public detail | `/blog/[slug]` (server component, Prisma + `dangerouslySetInnerHTML`) |
| Public JSON | `/api/blog-posts`, `/api/blog-posts/[slug]` |
| Sidebar | `DatabaseBlogSidebar.tsx` (server component, 3 latest posts) |

**Form fields (all of them):** `title` (required, ≤200), `slug`, `excerpt` (≤500),
`content` (required HTML, ≤1,000,000), `coverImage`, `status` (`draft` | `published`).
There is no category/tag/SEO/author field — `authorId` comes from the session.

**Publish gate is double:** a post is public only when `status = 'published'`
**and** `publishedAt IS NOT NULL`.

**Content sanitizer** — `src/lib/blog-content.ts`, applied on write *and* re-applied on read.
Allowed tags only:

```
p, br, h2, h3, h4, strong, em, u, ul, ol, li, blockquote, pre, code, a, figure, img, figcaption
```

- `h1` is **not** allowed (the page renders the title as the page `h1`).
- `div`, `span`, `table`, and inline `style` attributes are stripped.
- Allowed attrs: `a → href, target, rel, title`; `img → src, alt, title, loading, width, height, data-cloudinary-public-id`.
- Schemes: `http`, `https`, `mailto`. `disallowedTagsMode: "discard"` — disallowed tags vanish **with their contents**.

**Escaping matters:** inside `<pre><code>` you must write `&lt;int&gt;` and `=&gt;`.
A raw `<int>` is treated as an unknown tag and silently dropped.

**Images:** two valid patterns —
1. **Static path** (what the existing posts use): put a file in `public/blog/` and reference
   `/blog/your-file.svg`. No upload needed; it deploys with the code. This is the recommended
   default and is what the live post `what-is-app-development` does.
2. **Cloudinary URL** via the admin upload button — requires the Cloudinary env vars.

### Avoid this: the legacy static flow
`src/data/blog-data.ts` still drives the template demo routes `/blog-list`, `/blog-grid`,
`/blog/blog-details/[blogId]` and several vertical landing sections. **Do not add real posts
there.** Note that `BLOG_CONTENT_GUIDE.md` describes *that* legacy flow and is **out of date** —
ignore it for real content.

---

## 7. Deployment

```
local dev  →  git push origin main  →  GitHub (mymonatanisha/istudy-next)
           →  Heroku auto-deploy (Procfile: web: npm run start)
           →  Cloudflare  →  https://enamnotes.com
```

- Remote `origin` = `https://github.com/mymonatanisha/istudy-next.git`. There is **no Heroku
  git remote** in this repo, and no CI config (`.github/` is absent).
- **A push to `main` deploys to production** (confirmed empirically: pushing `8c8042e` put the
  new assets and CSS live). Treat every push to `main` as a production release.
- **Unknown / to confirm from the Heroku dashboard:** the Heroku app name. `AGENTS.md`
  references `istudy-next.herokuapp.com`, but that host now returns **"No such app"** — the app
  was renamed or recreated. Production is reachable at `enamnotes.com` only.
- Production database credentials live in Heroku config vars (`DATABASE_URL`). They are **not**
  on this machine and must not be committed.

**Migrations do not run on deploy.** After a schema change: back up production
(`pg_dump "$DATABASE_URL"`), then `npm run db:migrate` against it, then `npm run verify-db`.

---

## 8. Standing it up on a new computer

### Prerequisites
1. **Node.js 24.x** — https://nodejs.org (check: `node --version` → v24.x)
2. **Git**
3. **PostgreSQL 18** for Windows — https://www.postgresql.org/download/windows/
   During install set:
   - Port `5432`
   - Superuser `postgres`
   - Password: **the same one in your `.env`** (the old local value was `enam9999`)
   Note: PostgreSQL 18 is *not* added to PATH by default — full path is
   `C:\Program Files\PostgreSQL\18\bin`.

### Steps

```powershell
# 1. get the code
git clone https://github.com/mymonatanisha/istudy-next.git
cd istudy-next

# 2. dependencies  (postinstall runs: npm rebuild sharp)
npm install

# 3. environment
copy .env.example .env
notepad .env      # fill DATABASE_URL, JWT_SECRET, NEXTAUTH_SECRET,
                  # GOOGLE_CLIENT_*, CLOUDINARY_*, YT_API_KEY

# 4. database
$bin = 'C:\Program Files\PostgreSQL\18\bin'
$env:PGPASSWORD = '<your postgres password>'
& "$bin\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE enamnotes_local;"

# 5. schema
npm run db:generate
npm run db:migrate          # applies prisma/migrations
npm run db:status           # should report everything applied

# 6. run
npm run dev                 # http://localhost:3000
```

**Optional — restore real data instead of an empty schema.** If you have a `pg_dump` of the
local database (`enamnotes.dump`), restore it into the fresh `enamnotes_local`:

```powershell
& "$bin\pg_restore.exe" -U postgres -h localhost -p 5432 -d enamnotes_local `
    --no-owner --no-privileges "E:\path\to\enamnotes.dump"
```

Rebuilding from migrations alone gives you an **empty** database — no admin user, so you
cannot log in to `/admin/blog`. Restore the dump (or create an admin user) before trying the
admin UI.

### New machine checklist
- [ ] Node 24.x installed
- [ ] PostgreSQL 18 installed, service **`postgresql-x64-18`** running
- [ ] Repo cloned
- [ ] `.env` created and filled (not committed)
- [ ] `enamnotes_local` created
- [ ] `npm run db:migrate` applied cleanly
- [ ] `npm run dev` serves http://localhost:3000/blog with real posts
- [ ] Admin login works on `/admin/blog`

---

## 9. Hard-won gotchas

These all cost real debugging time. Keep them.

**Numbers & layout**
- **Theme breakpoints are RANGES, not max-widths.** `$lg` is
  `(min-width: 992px) and (max-width: 1199px)`. So `@media #{$lg,$xs}` fires only at
  992–1199px *or* ≤575px — it silently skips `md` and `sm`. This caused a sidebar thumbnail
  to balloon at laptop widths while being fine everywhere else.
- `.container` padding comes from `--bs-gutter-x: 2.4rem` **halved** by Bootstrap → only
  **12px** per side. Blog pages override the left padding to 30px.
- The global reset sets `h1–h6 { margin: 0 }` and `ul { margin: 0; padding: 0 }`. Any raw HTML
  rendered outside a component (like a blog post body) loses heading spacing and list markers
  unless you restyle it — see `public/assets/scss/layout/blog/_rich-content.scss`.

**Database**
- `blog_posts.updatedAt` has no DB default; set it on every write.
- `blog_posts.status` is a plain string with a `'draft'` default — not an enum.
- Publishing needs both `status='published'` and a non-null `publishedAt`.
- **Slugs are ASCII-only.** The slug builder strips everything outside `[a-z0-9\s-]`, so a
  **Bangla title produces an empty slug** and the server silently falls back to
  `blog-<timestamp>`. Always type the slug by hand for Bangla posts.

**Windows / PowerShell**
- **Never put non-ASCII (Bangla) text inside a `.ps1` file.** Windows PowerShell 5.1 reads
  script files as ANSI unless they have a BOM, so Bangla literals break the parser. Keep
  scripts ASCII and emit non-ASCII from elsewhere.
- PowerShell does **not** use `\"` to escape quotes — use `` `" `` or `""`. Inline
  `node -e "..."` breaks easily; write a `.js` file instead.
- `psql -c "..."` with double quotes inside gets mangled. Use a **single-quoted** PowerShell
  string (`-c 'select "role_id" from "user";'`) or a `.sql` file with `-f`.
- `cd` in **cmd.exe** needs `/d` to switch drives: `cd /d E:\enamnotes\istudy-next`.

**PostgreSQL service (Windows)**
- The service runs as `NT AUTHORITY\NetworkService`. A **non-elevated** shell cannot stop it,
  reload config, or kill its processes (`Access is denied` / `could not send reload signal`).
- `pg_ctl reload` needs the same privileges, so a `pg_hba.conf` edit only takes effect after a
  **service restart** — after which `SELECT pg_reload_conf();` works fine *from inside a session*.
- A Windows Installer transaction that replaces the VC++ runtime DLLs
  (`msvcp140.dll`, `vcruntime140.dll`) while the postmaster is running can wedge the server in
  a permanent `the database system is in recovery mode` state. The fix is the deferred restart
  the installer asked for — **not** `pg_resetwal`, deleting `postmaster.pid`, or reinstalling.

---

## 10. Current state (as of 2026-09-21)

- Local DB `enamnotes_local`: 25 tables, **3 blog posts** —
  `what-is-app-development`, `flutter-app-development-course`, `flutter-app-development`
- **Production has only 1 post** (`what-is-app-development`). The other two exist locally only.
  **Pushing code never publishes a post** — a post is a database row, not a file. Publishing to
  production means creating it through the production `/admin/blog` form (or a deliberate SQL
  insert with a backup first).
- Known open items: Heroku app name to confirm; Cloudinary/YouTube keys still placeholders in
  the committed `.env.example`; `BLOG_CONTENT_GUIDE.md` describes the obsolete static flow.
