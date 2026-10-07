---
name: WATCHTOWER
colors:
  primary: "#22D3EE"
  secondary: "#F59E0B"
  tertiary: "#E05252"
  neutral: "#080A0D"
  surface-1: "#0D1117"
  surface-2: "#121820"
  surface-3: "#18212A"
  text-primary: "#E8EEF2"
  text-secondary: "#93A1AD"
  text-muted: "#5D6A75"
  border: "#283541"
  success: "#62B982"
  warning: "#F0B55A"
  danger: "#E05252"
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
  h2:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 0.6875rem
  technical:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
rounded:
  sm: 3px
  md: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

## Product

WATCHTOWER is a narrative-driven cybersecurity investigation and CTF
platform. Investigators working for US@FE respond to the RAVEN-17 breach at
GuardianOS. The product combines a professional security operations console,
forensics workspace, mission progression, evidence management, and isolated
challenge environments.

Tagline: **Observe. Investigate. Exploit.**

The interface should feel believable at 2 AM: technical, tense, urban, and
slightly dystopian. It may suggest hacker culture and surveillance, but it
must remain a usable security product rather than a cyberpunk landing page.

## Visual Direction

Use a dark, layered charcoal interface with restrained cyan and orange
accents. Surfaces should have clear depth through borders and tonal steps, not
heavy shadows or decorative glow. Avoid Matrix rain, skulls, fake binary,
excessive neon, glitch effects, and meaningless code decoration.

Use sans-serif typography for navigation and descriptions. Use IBM Plex Mono
only for IP addresses, ports, hashes, commands, terminal output, flags,
timestamps, logs, and other technical identifiers.

## Application Shell

Every authenticated screen uses the same shell:

- A collapsible left sidebar with the WATCHTOWER mark.
- A minimal top bar showing the current page, `RAVEN-17`, investigation state,
  connection state, notifications, and the investigator account.
- A modular workspace with dense but breathable panels and contextual drawers.
- A bottom sidebar status block reading `SYSTEM OPERATIONAL` with a green
  status dot.

Expanded navigation:

- OVERVIEW
- MISSIONS
- CHALLENGES
- INVESTIGATION
- EVIDENCE
- TERMINAL
- NETWORK
- LEADERBOARD
- PROFILE
- SETTINGS

The active item uses cyan, while locked, unknown, and inactive states use
muted text. On mobile the sidebar becomes a drawer and complex workspaces
stack vertically.

## Status Language

Use these exact status labels consistently: `AVAILABLE`, `IN PROGRESS`,
`SOLVED`, `LOCKED`, `DISCOVERED`, `CONFIRMED`, `UNKNOWN`, `ONLINE`,
`OFFLINE`, `CONNECTED`, `DISCONNECTED`, `ACTIVE`, `INACTIVE`, `CRITICAL`,
`WARNING`, and `OPERATIONAL`.

Status indicators are small, legible, and paired with text. Cyan indicates
active investigation, amber indicates attention, muted red indicates danger,
and muted green indicates operational or confirmed state.

## Core Screens

### Login and Incident Briefing

The login screen is a restrained full-screen access point for `US@FE SECURITY
OPERATIONS`, with subtle CCTV framing, telemetry, timestamp, and GuardianOS
infrastructure detail. The primary action is `INITIALIZE SESSION`.

After login, show the RAVEN-17 incident briefing: GuardianOS Security Incident,
date `2026-08-11`, time `00:48 IST`, location GuardianOS Infrastructure,
severity `CRITICAL`, and status `ACTIVE INVESTIGATION`. Include the short
incident narrative and the objectives to identify initial access, compromised
systems, attacker identity, attack path, persistence, and final objective.
The primary action is `BEGIN INVESTIGATION`.

### Overview

Lead with `GOOD EVENING, INVESTIGATOR.` and the RAVEN-17 investigation state.
Show mission progress, challenges solved, evidence collected, access level,
and threat status. The main workspace contains an investigation timeline,
active mission, recent activity, and system status for network, challenge
services, container environments, and database.

### Missions

Present RAVEN-17 as an investigation board, not a linear game-level list.
Show the GuardianOS Incident, critical and active state, six challenges, four
domains, estimated investigation time, progress, and relationships between
discoveries. Connections represent evidence and leads.

### Challenges

Use case-file cards with challenge number, title, domain, difficulty, points,
status, description, and evidence unlocked. Provide filters for domains and
for `SOLVED`, `UNSOLVED`, and `LOCKED`. The six challenge states are
`AVAILABLE`, `IN PROGRESS`, `SOLVED`, and `LOCKED`, with the active card using
the cyan accent.

### Challenge Detail

Treat challenge detail as a primary product experience. Show the title,
mission context, domain, difficulty, points, status, narrative, objective,
checkbox objectives, attached evidence, challenge information, tools, hints,
and a clearly separated flag submission area. Evidence rows include file icon,
filename, size, type, and an open or download action.

The flag field uses the shape `RAVEN{...}` without revealing any correct flag.
Correct feedback reads `Evidence verified.` Incorrect feedback reads `Flag
rejected. Review the available evidence.` Hints require confirmation and show
costs of `-10 points`, `-25 points`, or `-50 points`.

### Interactive Workspaces

Tool-heavy challenges use a three-column workspace: instructions, artifact
tools, and investigation notes. Tabs may include `OVERVIEW`, `FILES`,
`TERMINAL`, `HEX VIEW`, `STRINGS`, `NETWORK`, and `NOTES`.

For reverse engineering, show `guardian_update.exe`, SHA256, file size, type,
timestamp, download, strings, hex view, and a minimal terminal. For
steganography, show `audio.wav`, waveform, metadata, extracted artifacts,
analyze, extract, download, and terminal controls. For web exploitation, show
a browser-like isolated target frame for `guardian-dev.internal` with
`TARGET ONLINE` and `OPEN TARGET`.

### Investigation and Evidence

The investigation screen is a node-based evidence graph, not a challenge
list. Nodes may represent PCAP, IP address, domain, user, host, file, hash,
process, credential, server, or C2. Nodes transition through unknown,
discovered, confirmed, and compromised states; selecting a node opens a
contextual panel.

Evidence uses a searchable table with filters for all, network, files, hosts,
hashes, domains, credentials, and logs. Columns are type, name, source,
discovered, and status. Selecting a row opens a detail drawer.

### Terminal and Network

The terminal is a professional tool inside the shell, connected to
`watchtower-lab` as `investigator`. Show realistic output, active sessions,
connection status, CPU, memory, and network without allowing it to dominate
the whole product.

The network page shows RAVEN-17 infrastructure as an interactive topology with
Internet, gateway, web server, API, database, WATCHTOWER, and C2 nodes. Each
node includes IP, hostname, status, and services. Unknown systems are
visually distinct and selecting a node opens a side panel. Connection lines
may animate subtly.

### Final WATCHTOWER Challenge

The capstone view is visually distinct from ordinary challenges and presents
`RAVEN-17`, `ATTACK PATH RECONSTRUCTED`, `UNKNOWN ACTOR`, and `TARGET
INFRASTRUCTURE`. Provide a network map, discovered hosts, services, open
ports, compromised systems, evidence, terminal, logs, and potential C2
connection. Reveal unknown nodes progressively as evidence is confirmed.

### Leaderboard, Profile, and Settings

The leaderboard is restrained and operational, with global, university, and
team tabs; rank, player, score, solved, time, and status columns; and a
separate current-position block.

The profile shows avatar, username, rank, points, solved challenges,
accuracy, investigation progress, completed domains, restrained domain badges,
and recent activity.

Settings group account, security, notifications, appearance, terminal, and
privacy. Include dark interface, compact mode, terminal font size,
notifications, sound effects, reduced motion, session management, and API
keys.

## Components and Interaction

Use consistent buttons, tabs, badges, tags, progress bars, timelines, activity
feeds, tables, toasts, modals, drawers, dropdowns, search fields, terminals,
network nodes, graph edges, file browsers, code viewers, hex viewers,
waveforms, and browser previews. Prefer familiar icons from the existing icon
library for icon-only actions and provide tooltips for unfamiliar controls.

Reusable dialogs cover flag submission, hint confirmation, evidence download,
environment launch, environment termination, challenge reset, and investigation
confirmation. Toasts are small and professional: `New evidence discovered`,
`Challenge completed`, `GuardianOS host identified`, `Container environment
ready`, and `Flag accepted`.

Challenge environments expose clear states: `OFFLINE`, `STARTING`, `READY`,
`CONNECTED`, `TERMINATING`, and `ERROR`. Loading states use meaningful copy
such as `INITIALIZING INVESTIGATION...`, `CONNECTING TO GUARDIANOS...`,
`PROVISIONING ISOLATED ENVIRONMENT...`, and `ANALYZING EVIDENCE...`.

Empty states explain the next useful action, for example `NO EVIDENCE
DISCOVERED` with a note that collected evidence will appear there, or `NO
ACTIVE SESSIONS` with a prompt to launch a challenge environment. Error states
should be specific: `ENVIRONMENT UNAVAILABLE`, `CONNECTION LOST`, and `ACCESS
DENIED`.

## Responsive Behavior

Design for 1920px desktop, 1440px laptop, 768px tablet, and 390px mobile.
Maintain hierarchy and readable density at every size. On mobile, use a
sidebar drawer, vertically stack challenge workspaces, turn evidence tables
into cards, make terminals full width, and allow complex network graphs to
scroll horizontally instead of shrinking into illegible diagrams.

## Motion and Accessibility

Use short, subtle transitions for sidebar changes, node discovery, evidence
updates, progress, terminal cursor, panel entry, and toast appearance. Respect
reduced-motion preferences. Preserve strong contrast, visible focus states,
keyboard access, clear status text, and stable dimensions for boards, grids,
toolbars, icon buttons, and tiles. Never communicate important state through
color alone.

## Product Principle

At every moment the investigator should understand where they are, what they
are investigating, what has been discovered, what is confirmed, what remains
unknown, and what action should happen next. The UI should progressively
reveal the GuardianOS incident as challenges are solved: evidence appears,
hosts become identified, network nodes are connected, and the attack path
becomes legible.
