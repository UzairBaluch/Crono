# CronAPI.dev — Full UI/UX Specification

## Product Vision

A production-grade developer tool for scheduling and monitoring HTTP jobs.

The interface should feel:
- Minimal
- Fast
- Technical
- Calm
- Reliable
- Enterprise-clean
- Vercel-inspired

The UI must avoid:
- Startup gradients everywhere
- Over-animation
- Clutter
- Heavy dashboards
- Fancy unnecessary visuals

This product is infrastructure software.
Trust and clarity are more important than creativity.

---

# Tech Stack

## Frontend
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Aceternity UI
- Framer Motion
- Lucide Icons
- TanStack Table
- React Hook Form
- Zod

---

# Design Philosophy

## Core Principles

### 1. Functional First
Every component must serve a purpose.

### 2. Minimal Cognitive Load
The user should instantly understand:
- what happened
- what failed
- what runs next

### 3. Infrastructure-Level Trust
Design should communicate:
- reliability
- uptime
- technical confidence

### 4. Fast UX
- no unnecessary modals
- minimal clicks
- keyboard-friendly
- fast navigation

### 5. Vercel-Inspired Simplicity
The interface should feel similar to:
- Vercel
- Stripe Dashboard
- Railway
- Resend
- PostHog

---

# Color System

## Theme
Dark-first UI.

### Background Colors

```css
--background: #0a0a0a;
--card: #111111;
--card-secondary: #161616;
--border: #262626;
--hover: #1c1c1c;
```

### Text Colors

```css
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #71717a;
```

### Accent Colors

```css
--primary: #ffffff;
--success: #22c55e;
--warning: #f59e0b;
--danger: #ef4444;
--info: #3b82f6;
```

### Status Colors

#### Success
- green-500

#### Failed
- red-500

#### Retrying
- amber-500

#### Paused
- zinc-500

---

# Typography

## Font System

### Primary Font
Use:

```txt
Geist Sans
```

### Monospace Font
Use:

```txt
Geist Mono
```

Monospace should be used for:
- cron expressions
- logs
- request IDs
- API keys
- timestamps
- HTTP methods

---

# Layout Structure

## Application Layout

```txt
┌───────────────────────────────┐
│ Sidebar                       │
│                               │
│ Logo                          │
│ Dashboard                     │
│ Jobs                          │
│ Logs                          │
│ Alerts                        │
│ Billing                       │
│ Settings                      │
│                               │
│ User Profile                  │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Top Navbar                    │
│ Search                        │
│ Create Job Button             │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Main Content                  │
└───────────────────────────────┘
```

---

# Sidebar Design

## Sidebar Width

```txt
260px
```

## Sidebar Style
- fixed left sidebar
- subtle right border
- dark background
- active item glow
- compact spacing

## Navigation Item Style

### Default
- muted text
- transparent background

### Hover
- background hover state
- brighter text

### Active
- subtle white background
- white text
- left accent border

---

# Top Navigation

## Structure

Left:
- breadcrumb
- page title

Right:
- search bar
- notifications
- create job button
- user avatar

## Height

```txt
64px
```

## Style
- sticky top navbar
- blur backdrop
- subtle border bottom

---

# Dashboard Page

## Purpose
Provide instant infrastructure visibility.

---

# Dashboard Sections

## 1. Stats Grid

4 cards:

### Total Jobs

### Successful Runs

### Failed Runs

### Avg Response Time

---

## Card Design

Style:
- rounded-2xl
- subtle border
- hover glow
- clean typography
- tiny charts optional

Use:
- shadcn Card
- Aceternity spotlight hover effect lightly

---

# 2. Recent Activity Feed

Show:
- latest runs
- failures
- retries
- paused jobs

Each item:
- timestamp
- status icon
- job name
- duration

---

# 3. Quick Actions

Buttons:
- Create Job
- Import Job
- View Logs
- Configure Alerts

---

# Jobs Page

## Core Product Screen

This must feel extremely polished.

---

# Jobs Table

Columns:

| Job | Method | Schedule | Last Run | Status | Next Run |

---

# Table Style

Requirements:
- sticky header
- subtle row hover
- monospace cron values
- compact but readable
- clean spacing
- no visual clutter

---

# Status Badge Design

## Success
Green dot + text

## Failed
Red dot + text

## Running
Blue pulse dot

## Paused
Gray badge

---

# Row Actions

Hover-only actions:
- Run Now
- Pause
- Edit
- Delete

Use dropdown menu.

---

# Create Job Page

## Most Important UX Flow

The user must create a job in under 60 seconds.

---

# Form Layout

## Step 1 — Basic Info

Fields:
- Job Name
- URL Endpoint
- HTTP Method

---

## Step 2 — Schedule

Field:
- cron expression

Add:
- helper presets
- visual next-run preview

Examples:
- Every hour
- Daily at midnight
- Every Monday

---

## Step 3 — Optional Settings

Accordion section:
- retries
- timeout
- headers
- body
- auth token
- alerts

Hide advanced complexity.

---

# Form UI Style

Requirements:
- large input fields
- generous spacing
- monospace endpoint inputs
- inline validation
- keyboard accessible

---

# Logs Page

## Trust Page

This page matters massively.

Developers trust products with great logs.

---

# Logs Table

Columns:

| Timestamp | Job | Status | Duration | Response |

---

# Log Detail Drawer

When clicking a row:

Open side drawer containing:
- full request
- response body
- headers
- retry attempts
- execution metadata

Use:
- code blocks
- monospace typography
- syntax highlighting

---

# Empty States

All empty states should:
- feel calm
- guide action
- avoid excessive illustrations

Example:

```txt
No jobs yet.
Create your first scheduled task.
```

---

# Loading States

Use:
- skeleton loaders
- subtle shimmer
- avoid giant spinners

---

# Animation Rules

Use animation sparingly.

Allowed:
- fade in
- hover transitions
- drawer transitions
- button micro-interactions

Avoid:
- excessive motion
- parallax
- floating particles
- distracting effects

---

# Aceternity Components To Use

Recommended:
- Spotlight Card
- Grid Background
- Tracing Beam lightly
- Floating Border
- Bento Grid for landing page
- Animated Tooltip

DO NOT overuse effects.

---

# Landing Page Design

## Hero Section

Headline:

```txt
Reliable cron jobs for modern apps.
```

Subheadline:

```txt
Schedule any HTTP endpoint with retries, logs, and monitoring.
```

CTA Buttons:
- Start Free
- View Documentation

---

# Hero Visual

Show:
- terminal-like execution logs
- success/failure badges
- clean dashboard preview

NOT illustrations.

---

# Landing Page Sections

## Features

Grid:
- Retries
- Monitoring
- Alerts
- Fast Setup
- API Access
- Global Infrastructure

---

## Code Example Section

Show:

```bash
curl -X POST https://api.cronapi.dev/jobs
```

Use terminal-style block.

---

## Pricing Section

3 cards:
- Free
- Pro
- Team

Highlighted:
- Pro

---

## FAQ Section

Accordion style.

---

# Component Design Rules

## Buttons

### Primary
- white background
- black text
- subtle hover darkening

### Secondary
- dark background
- border
- white text

### Danger
- red accent

---

# Input Design

Requirements:
- dark background
- subtle border
- strong focus ring
- rounded-xl
- smooth transitions

---

# Card Design

Requirements:
- rounded-2xl
- subtle borders
- soft shadows
- minimal gradients

---

# Icons

Use:
- Lucide React only

Suggested icons:
- Clock
- Activity
- Terminal
- AlertCircle
- CheckCircle
- Zap
- Server

---

# Responsive Rules

## Mobile

Sidebar becomes drawer.

Tables:
- horizontal scroll
- condensed layout

Buttons:
- full width where needed

---

# Accessibility

Requirements:
- keyboard navigation
- proper aria labels
- high contrast
- visible focus states
- semantic HTML

---

# Folder Structure (4-Layer Architecture)

```txt
src/
├── app/
│   ├── (marketing)/
│   ├── (dashboard)/
│   ├── api/
│   └── globals.css
│
├── features/
│   ├── jobs/
│   ├── logs/
│   ├── alerts/
│   ├── auth/
│   └── billing/
│
├── shared/
│   ├── components/
│   ├── ui/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   └── constants/
│
├── entities/
│   ├── job/
│   ├── execution/
│   ├── user/
│   └── workspace/
│
└── widgets/
    ├── dashboard-stats/
    ├── jobs-table/
    ├── activity-feed/
    └── log-viewer/
```

---

# Production Quality Requirements

The generated UI must:

- use strict TypeScript
- avoid prop drilling
- use reusable components
- support dark mode
- use loading states
- use error boundaries
- use responsive layouts
- use semantic HTML
- use optimized rendering
- avoid inline styles
- use server components where possible

---

# shadcn Components To Use

Required:
- Card
- Table
- Dialog
- Drawer
- Dropdown Menu
- Tooltip
- Tabs
- Skeleton
- Badge
- Alert
- Sheet
- Accordion
- Input
- Button
- Form
- Separator
- ScrollArea

---

# UX Inspiration

Primary references:

- Vercel
- Stripe Dashboard
- Railway
- Resend
- Linear
- PostHog

The UI should feel:

```txt
Professional > flashy
Fast > decorative
Clear > clever
Reliable > trendy
```

---

# Final Instruction For AI Code Generator

Build a production-grade SaaS UI for a cron scheduling platform using:
- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Aceternity UI

The design language must closely resemble Vercel-style infrastructure software:
- dark minimal UI
- strong typography
- subtle borders
- clean spacing
- developer-focused UX
- highly polished tables
- excellent loading states
- premium dashboard feel

The application must feel:
- enterprise-ready
- fast
- technical
- modern
- clean
- trustworthy

Avoid:
- excessive gradients
- startup-style fluff
- over-animation
- cluttered layouts
- unnecessary complexity

Focus heavily on:
- usability
- clarity
- logs UI
- dashboard polish
- execution visibility
- fast workflows
- clean information hierarchy

The result should look launch-ready and production-ready.

