---
name: stitch-prompt
description: The prompt for the Google Stitch to generate UI designs.
author: nadun
---

Create a complete, production-quality multi-page web UI/UX design for a cybersecurity Capture The Flag platform called:

WATCHTOWER

TAGLINE:
"Observe. Investigate. Exploit."

WATCHTOWER is a narrative-driven cybersecurity investigation and CTF platform.

The player is not simply browsing a list of CTF questions. They are an investigator working for an organization called US@FE, responding to a security incident involving a fictional technology/security company called GuardianOS.

The platform combines:

- Professional cybersecurity operations console
- CTF challenge platform
- Digital forensics workspace
- Investigation dashboard
- Mission-based progression
- Interactive challenge environments
- Evidence management
- Network analysis
- Terminal access
- Narrative storytelling

The interface must feel like a real cybersecurity investigation platform.

==================================================

1. # CORE VISUAL DIRECTION

The visual identity combines three major influences:

A. MODERN PROFESSIONAL CYBERSECURITY PLATFORM

The information architecture should feel like a serious enterprise security product.

Use:

- Persistent left sidebar
- Global top status bar
- Modular workspace
- Contextual side panels
- Investigation timelines
- Evidence panels
- Technical metadata
- Network visualization
- Terminal interfaces
- Status indicators
- Tables
- Activity feeds
- Mission tracking
- Progress indicators

The interface must be functional and information-dense without becoming cluttered.

B. WATCH DOGS 2-STYLE HACKER CULTURE

Take inspiration from:

- urban technology
- rebellious hacker culture
- surveillance systems
- city infrastructure
- digital graffiti
- playful technical overlays
- unconventional typography
- bright accent colors used sparingly
- technology integrated into everyday life
- street-level hacking culture

Do NOT copy Watch Dogs 2 artwork, characters, logos, or exact UI.

Instead capture the feeling of:

"Someone is sitting behind a laptop and has access to an entire city's digital infrastructure."

C. MR. ROBOT ATMOSPHERE

Take inspiration from:

- grounded cybersecurity
- realistic terminals
- corporate infrastructure
- surveillance
- anonymity
- underground operations
- dark environments
- sparse layouts
- realistic system logs
- uncomfortable corporate atmosphere
- believable hacking interfaces

The interface should feel technically believable.

Avoid Hollywood hacking clichés.

DO NOT use:

- Matrix rain
- giant green terminal text everywhere
- random binary backgrounds
- skull graphics
- generic hacker masks
- excessive neon
- fake "ACCESS GRANTED" animations
- meaningless code decoration

The design should look like a platform actual security researchers could use.

================================================== 2. BRAND
==================================================

Product:

WATCHTOWER

Primary incident:

RAVEN-17

Organization:

US@FE

Target organization:

GuardianOS

GuardianOS is a fictional technology company specializing in IoT security, connected devices, operating systems, and security infrastructure.

The incident occurred:

2026-08-11
00:48 IST

The investigator arrives at approximately:

01:00 IST

The player is investigating a breach involving GuardianOS infrastructure.

WATCHTOWER is the investigation platform used to coordinate the investigation.

================================================== 3. COLOR SYSTEM
==================================================

Overall theme:

Dark.

Background:

Almost-black / charcoal.

Use multiple levels of dark surfaces rather than one flat black.

Suggested visual hierarchy:

Level 0:
#080A0D

Level 1:
#0D1117

Level 2:
#121820

Level 3:
#18212A

Borders:
subtle gray-blue

Primary text:
off-white

Secondary text:
cool gray

Muted text:
dark gray

Primary accent:
electric cyan / blue

Secondary accent:
warm orange

Warning:
amber

Danger:
muted red

Success:
muted green

The accent colors must be used strategically.

Do not turn the entire interface neon.

================================================== 4. TYPOGRAPHY
==================================================

Primary UI font:

Inter / Geist / IBM Plex Sans / Space Grotesk

Technical font:

JetBrains Mono / IBM Plex Mono

Use monospace only for:

- IP addresses
- ports
- hashes
- commands
- terminal output
- flags
- timestamps
- system logs
- technical identifiers

Normal navigation and descriptions should use the primary sans-serif font.

Typography should feel technical but highly readable.

================================================== 5. GLOBAL APPLICATION LAYOUT
==================================================

Every authenticated page should share the same application shell.

LEFT SIDEBAR:

WATCHTOWER logo at top.

Navigation:

OVERVIEW
MISSIONS
CHALLENGES
INVESTIGATION
EVIDENCE
TERMINAL
NETWORK
LEADERBOARD

Then:

ACCOUNT

PROFILE
SETTINGS

Bottom of sidebar:

SYSTEM STATUS

● SYSTEM OPERATIONAL

The sidebar should be collapsible.

Collapsed state:

Only icons.

Expanded state:

Icons + labels.

The active navigation item uses the cyan accent.

================================================== 6. GLOBAL TOP BAR
==================================================

Every authenticated screen has a top bar.

Left:

Current page title.

Center or contextual:

RAVEN-17
INVESTIGATION ACTIVE

Right:

System status

Connection status

Notifications

User avatar

User name

Optional command/search field:

"Search challenges, evidence, IPs, hashes..."

The top bar should remain visually minimal.

================================================== 7. LOGIN SCREEN
==================================================

Create a cinematic but restrained login page.

Full-screen dark background.

Possible background:

A dark urban environment viewed through surveillance cameras.

Subtle elements:

- CCTV framing
- network lines
- system telemetry
- timestamp
- location markers
- faint GuardianOS infrastructure diagrams

Do not overwhelm the screen.

Center-left or centered login interface.

WATCHTOWER

"US@FE Security Operations"

Fields:

USERNAME
PASSWORD

Button:

INITIALIZE SESSION

Secondary:

Remember session

Forgot credentials

Bottom:

RAVEN-17
INCIDENT RESPONSE SYSTEM

The login should feel like accessing a restricted security platform.

================================================== 8. INITIAL INCIDENT / INTRO SCREEN
==================================================

After login, create a narrative incident briefing screen.

Title:

RAVEN-17

Subtitle:

GuardianOS Security Incident

Show:

DATE
2026-08-11

TIME
00:48 IST

LOCATION
GuardianOS Infrastructure

SEVERITY
CRITICAL

STATUS
ACTIVE INVESTIGATION

Include a short narrative:

"At 00:48 IST, GuardianOS monitoring systems detected anomalous activity across internal infrastructure."

The investigator is assigned to determine:

- initial access
- compromised systems
- attacker identity
- attack path
- persistence mechanism
- final objective

Button:

BEGIN INVESTIGATION

This screen establishes the story before the dashboard.

================================================== 9. MAIN DASHBOARD / OVERVIEW
==================================================

Create the primary investigator dashboard.

Header:

GOOD EVENING, INVESTIGATOR.

RAVEN-17 / ACTIVE INVESTIGATION

Top statistics:

MISSION PROGRESS
0%

CHALLENGES SOLVED
0 / 6

EVIDENCE COLLECTED
0

ACCESS LEVEL
INVESTIGATOR

THREAT STATUS
ACTIVE

Main area:

CURRENT INVESTIGATION

Display a visual investigation timeline.

Example:

00:48
INCIDENT DETECTED

01:00
INVESTIGATOR DISPATCHED

01:12
NETWORK TRAFFIC ACQUIRED

01:37
UNKNOWN ENDPOINT IDENTIFIED

...

The timeline should update as the player solves challenges.

Below:

ACTIVE MISSION

"The GuardianOS Breach"

Description.

Button:

CONTINUE INVESTIGATION

Right panel:

RECENT ACTIVITY

Example:

- Evidence acquired
  PCAP file unlocked

- Challenge completed
  The Traffic

- System discovered
  RAVEN-17 endpoint

Another panel:

SYSTEM STATUS

NETWORK
OPERATIONAL

CHALLENGE SERVICES
OPERATIONAL

CONTAINER ENVIRONMENTS
OPERATIONAL

DATABASE
OPERATIONAL

================================================== 10. MISSIONS PAGE
==================================================

Create a mission-centric page.

Header:

MISSIONS

Subtitle:

"Investigations assigned to your account."

Primary mission card:

RAVEN-17

GUARDIANOS INCIDENT

CRITICAL

ACTIVE

Show:

6 CHALLENGES
4 DOMAINS
ESTIMATED INVESTIGATION TIME
PROGRESS

Mission map / progression visualization.

Important:

Do not make this look like a simple linear game level list.

The player should feel like they are investigating an incident.

Use an investigation board style.

Connections between challenges should represent relationships between evidence and discoveries.

================================================== 11. CHALLENGES PAGE
==================================================

Create a challenge browser.

Header:

CHALLENGES

Filters:

ALL
NETWORKING
OSINT
REVERSE ENGINEERING
STEGANOGRAPHY
WEB

Also:

SOLVED
UNSOLVED
LOCKED

Challenge cards should show:

Challenge number

Challenge title

Domain

Difficulty

Points

Status

Evidence unlocked

Example:

01
THE TRAFFIC

NETWORKING

MEDIUM

250 PTS

UNSOLVED

Description:

"Something entered GuardianOS through the network. Determine where the traffic originated."

Card states:

AVAILABLE
IN PROGRESS
SOLVED
LOCKED

Avoid generic gaming UI.

These should look like investigation case files.

================================================== 12. CHALLENGE DETAIL PAGE
==================================================

This is one of the MOST IMPORTANT screens.

Create a highly detailed interactive challenge interface.

Example challenge:

THE TRAFFIC

NETWORKING
MEDIUM
250 POINTS

Top header:

THE TRAFFIC

RAVEN-17 / NETWORK ANALYSIS

Status:

INVESTIGATION ACTIVE

Main layout:

LEFT / CENTER:

Challenge description.

Narrative:

"GuardianOS network monitoring captured suspicious traffic shortly before the incident."

Objective:

"Identify the compromised endpoint and determine the source of the connection."

Below:

OBJECTIVES

□ Identify suspicious host
□ Determine destination
□ Extract relevant indicator
□ Submit the flag

Then:

ATTACHED EVIDENCE

traffic_capture.pcap

network_notes.txt

Each artifact should have:

file icon
filename
size
type
download/open button

Right sidebar:

CHALLENGE INFORMATION

DOMAIN
NETWORKING

DIFFICULTY
MEDIUM

POINTS
250

TIME
—

STATUS
IN PROGRESS

Then:

TOOLS

Open PCAP
Launch Terminal
Open Notes
View Network

Bottom section:

FLAG SUBMISSION

Input:

RAVEN{******\_\_\_\_******}

Button:

SUBMIT FLAG

Feedback states:

Correct flag:
"Evidence verified."

Incorrect:
"Flag rejected. Review the available evidence."

Do NOT reveal the correct flag.

Also include:

HINTS

Hint 1
Hint 2
Hint 3

Each hint should show a cost:

-10 points
-25 points
-50 points

Use confirmation before revealing a hint.

================================================== 13. INTERACTIVE CHALLENGE WORKSPACE
==================================================

For challenges that require tools, create a workspace mode.

Example:

THE IMPLANT

REVERSE ENGINEERING

The workspace has a split layout.

LEFT:

Challenge instructions.

CENTER:

Tool / artifact workspace.

RIGHT:

Investigation notes.

Possible tabs:

OVERVIEW
FILES
TERMINAL
HEX VIEW
STRINGS
NETWORK
NOTES

For reverse engineering challenges, show:

guardian_update.exe

File information:

SHA256
FILE SIZE
TYPE
TIMESTAMP

Tools:

DOWNLOAD
OPEN TERMINAL
STRINGS
HEX VIEW

Terminal panel:

investigator@watchtower:~$

The terminal should look realistic and minimal.

================================================== 14. STEGANOGRAPHY CHALLENGE UI
==================================================

Create a challenge workspace specifically for:

DEAD AIR

STEGANOGRAPHY

Show:

audio.wav

Waveform visualization.

Metadata panel.

EXIF / metadata information.

Possible extracted artifacts.

Buttons:

ANALYZE
EXTRACT
DOWNLOAD
OPEN TERMINAL

The interface should feel like a forensic analysis tool.

================================================== 15. WEB EXPLOITATION CHALLENGE UI
==================================================

For:

THE INTERNAL EXPOSURE

Create a challenge page that provides access to an isolated target application.

Main layout:

LEFT:

Challenge instructions.

CENTER:

Embedded target application / browser preview.

RIGHT:

Notes / evidence / challenge information.

Provide a small browser-like frame.

Top:

TARGET:
guardian-dev.internal

Status:

TARGET ONLINE

Below:

OPEN TARGET

The player should feel like they are attacking a real isolated internal application.

================================================== 16. FINAL WATCHTOWER CHALLENGE
==================================================

Create the final challenge page:

WATCHTOWER

CAPSTONE INVESTIGATION

DIFFICULTY:
HARD

This should visually feel different from ordinary challenges.

It represents the final stage of the investigation.

Display:

RAVEN-17

ATTACK PATH RECONSTRUCTED

UNKNOWN ACTOR

TARGET INFRASTRUCTURE

The challenge workspace should provide:

Network map

Discovered hosts

Services

Open ports

Compromised systems

Evidence

Terminal

Logs

Potential C2 connection

The player should have access to an isolated environment.

Use a network topology visualization.

Nodes:

INVESTIGATOR
GATEWAY
GUARDIANOS WEB
INTERNAL API
WATCHTOWER
C2

Some nodes should initially be unknown and become revealed as the player progresses.

This screen should feel like the culmination of the investigation.

================================================== 17. INVESTIGATION PAGE
==================================================

Create a dedicated investigation board.

Title:

INVESTIGATION

RAVEN-17

This is not a challenge list.

It is a visual investigation workspace.

Use a node-based evidence graph.

Example nodes:

PCAP
IP ADDRESS
DOMAIN
USER
HOST
FILE
HASH
PROCESS
CREDENTIAL
SERVER
C2

Connect related evidence.

Example:

PCAP
↓
IP ADDRESS
↓
COMPROMISED HOST
↓
MALWARE
↓
C2
↓
WATCHTOWER

Nodes can have states:

UNKNOWN
DISCOVERED
CONFIRMED
COMPROMISED

Clicking a node opens a contextual panel.

================================================== 18. EVIDENCE PAGE
==================================================

Create a digital evidence management interface.

Header:

EVIDENCE

Search bar.

Filters:

ALL
NETWORK
FILES
HOSTS
HASHES
DOMAINS
CREDENTIALS
LOGS

Evidence table columns:

TYPE
NAME
SOURCE
DISCOVERED
STATUS

Example:

PCAP
traffic_capture.pcap
The Traffic
01:17
CONFIRMED

HASH
guardian_update.exe
The Implant
02:08
CONFIRMED

Evidence cards should be clickable.

Opening evidence displays a detail drawer.

================================================== 19. TERMINAL PAGE
==================================================

Create a dedicated terminal workspace.

The terminal should feel like a real remote investigation environment.

Header:

TERMINAL

Connection:

watchtower-lab

USER:

investigator

STATUS:

CONNECTED

Terminal should support realistic visual states.

Example:

investigator@watchtower:~$

Use realistic command output.

Side panel:

ACTIVE SESSIONS

SESSION 01
LOCAL

SESSION 02
GUARDIANOS-WEB

SESSION 03
UNKNOWN HOST

Bottom:

Connection status

CPU

Memory

Network

Do not make the terminal dominate the entire application.

It should look like one tool inside a professional security platform.

================================================== 20. NETWORK PAGE
==================================================

Create an interactive network topology interface.

Header:

NETWORK

RAVEN-17 INFRASTRUCTURE

Display nodes and connections.

Example nodes:

INTERNET
GATEWAY
WEB SERVER
API
DATABASE
WATCHTOWER
C2

Each node displays:

IP

HOSTNAME

STATUS

SERVICES

Example:

10.10.20.14

guardian-web

ONLINE

80 / 443

Use subtle animated connection lines.

Unknown systems should be visually distinct from confirmed systems.

Clicking a node opens a side panel.

================================================== 21. LEADERBOARD
==================================================

Create a competitive leaderboard.

Header:

LEADERBOARD

Tabs:

GLOBAL
UNIVERSITY
TEAM

Columns:

RANK
PLAYER
SCORE
SOLVED
TIME
STATUS

Do not make it look like a colorful esports leaderboard.

Keep it professional.

Show the current user's position separately.

Example:

YOUR POSITION

#27

1,450 POINTS

================================================== 22. PROFILE PAGE
==================================================

Create a cybersecurity investigator profile.

Show:

Avatar

Username

Rank

Points

Challenges solved

Accuracy

Investigation progress

Domains completed

Badges

Recent activity

Example badges:

NETWORK ANALYST
REVERSE ENGINEER
FORENSICS
OSINT
WEB EXPLOITATION

Use restrained badge design.

================================================== 23. SETTINGS PAGE
==================================================

Sections:

ACCOUNT

SECURITY

NOTIFICATIONS

APPEARANCE

TERMINAL

PRIVACY

Preferences:

Dark interface

Compact mode

Terminal font size

Notifications

Sound effects

Reduced motion

Session management

API keys

================================================== 24. NOTIFICATION SYSTEM
==================================================

Create notification interactions.

Examples:

"New evidence discovered."

"Challenge completed."

"GuardianOS host identified."

"New mission objective unlocked."

"Container environment ready."

"Flag accepted."

Notifications should appear as small professional toast messages.

Do not use large game-style popups.

================================================== 25. MODALS / INTERACTIONS
==================================================

Design reusable modal components for:

Flag submission

Hint confirmation

Download evidence

Launch environment

Terminate environment

Reset challenge

Confirm investigation action

Example:

LAUNCH CHALLENGE ENVIRONMENT

Target:

guardian-dev

Environment:

ISOLATED

Estimated startup:

~15 seconds

Button:

LAUNCH ENVIRONMENT

================================================== 26. CHALLENGE ENVIRONMENT STATES
==================================================

Challenge environments should have clear states:

OFFLINE

STARTING

READY

CONNECTED

TERMINATING

ERROR

Example:

LAB ENVIRONMENT

● READY

TARGET:

10.10.30.15

TIME REMAINING:

42:18

BUTTON:

CONNECT

================================================== 27. LOADING STATES
==================================================

Create realistic loading states.

Examples:

INITIALIZING INVESTIGATION...

CONNECTING TO GUARDIANOS...

PROVISIONING ISOLATED ENVIRONMENT...

ANALYZING EVIDENCE...

SYNCING INVESTIGATION DATA...

Do not use generic spinning loaders everywhere.

================================================== 28. EMPTY STATES
==================================================

Create useful empty states.

Examples:

NO EVIDENCE DISCOVERED

"Evidence collected during the investigation will appear here."

NO ACTIVE SESSIONS

"Launch a challenge environment to establish a session."

NO NOTIFICATIONS

"You're up to date."

================================================== 29. ERROR STATES
==================================================

Design realistic cybersecurity-specific errors.

Examples:

ENVIRONMENT UNAVAILABLE

"Unable to provision isolated challenge environment."

CONNECTION LOST

"Your investigation session has been interrupted."

ACCESS DENIED

"Your current clearance level does not permit access to this resource."

Do not use generic "Oops!" messages.

================================================== 30. MICROINTERACTIONS
==================================================

Use subtle animations.

Examples:

- Sidebar transitions
- Network nodes appearing
- Evidence being discovered
- Progress updates
- Terminal cursor
- Status indicators
- Challenge completion
- Toast notifications
- Panel transitions
- Hover states

Animations must be subtle and fast.

Do not create excessive glitch effects.

================================================== 31. RESPONSIVE DESIGN
==================================================

Design responsive versions.

Desktop:

1920x1080

Laptop:

1440x900

Tablet:

768px

Mobile:

390px

On mobile:

Sidebar becomes a drawer.

Complex network graphs become horizontally scrollable.

Evidence tables become cards.

Challenge workspace becomes vertically stacked.

Terminal becomes full width.

Do not simply shrink desktop layouts.

================================================== 32. DESIGN SYSTEM
==================================================

Create a consistent component system.

Components:

Buttons

Primary button

Secondary button

Ghost button

Danger button

Cards

Challenge cards

Evidence cards

Mission cards

Status cards

Tables

Tabs

Badges

Tags

Progress bars

Timeline

Activity feed

Toast

Modal

Drawer

Dropdown

Tooltip

Search

Terminal

Network nodes

Graph edges

File browser

Code viewer

Hex viewer

Waveform

Browser preview

================================================== 33. STATUS LANGUAGE
==================================================

Use consistent terminology.

AVAILABLE
IN PROGRESS
SOLVED
LOCKED
DISCOVERED
CONFIRMED
UNKNOWN
ONLINE
OFFLINE
CONNECTED
DISCONNECTED
ACTIVE
INACTIVE
CRITICAL
WARNING
OPERATIONAL

Avoid inconsistent wording.

================================================== 34. IMPORTANT UX PRINCIPLE
==================================================

The user should always understand:

WHERE AM I?

WHAT AM I INVESTIGATING?

WHAT HAVE I DISCOVERED?

WHAT CAN I DO?

WHAT SHOULD I INVESTIGATE NEXT?

WHAT EVIDENCE DO I HAVE?

WHAT HAS BEEN CONFIRMED?

WHAT IS STILL UNKNOWN?

The interface should help the investigator form a mental model of the incident.

Do not make the user hunt through decorative UI to find important information.

================================================== 35. VISUAL STORYTELLING
==================================================

The UI should gradually reveal the GuardianOS incident.

At the beginning:

Most systems are unknown.

As challenges are solved:

Evidence appears.

Network nodes become visible.

Hosts become identified.

Attack paths become connected.

Investigation timeline expands.

The dashboard should visually become more complete as the investigation progresses.

The interface itself should communicate:

"I am uncovering something."

================================================== 36. FINAL VISUAL FEEL
==================================================

Imagine:

A cybersecurity researcher working at 2 AM.

One monitor shows a terminal.

Another shows a network graph.

A dark city is visible outside.

GuardianOS infrastructure is being investigated.

The system is professional enough for a security engineer.

But the interface has an underground hacker identity.

It should feel tense, intelligent, technical, urban, and slightly dystopian.

WATCHTOWER should feel like a real security platform from this fictional world.

NOT:

A generic CTF website.

NOT:

A generic SaaS dashboard.

NOT:

A cyberpunk landing page.

NOT:

A video game menu.

Instead:

A professional cybersecurity investigation platform with a distinctive hacker identity.

================================================== 37. OUTPUT REQUIREMENT
==================================================

Generate a coherent multi-page UI design system.

Maintain exactly the same:

- navigation
- color system
- typography
- spacing
- components
- icon style
- borders
- status indicators
- interaction patterns

across every screen.

Create high-fidelity desktop screens first.

Prioritize these screens:

1. Login
2. Incident Briefing
3. Overview Dashboard
4. Missions
5. Challenge List
6. Challenge Detail
7. Interactive Challenge Workspace
8. Investigation Board
9. Evidence
10. Terminal
11. Network
12. Final WATCHTOWER Challenge
13. Leaderboard
14. Profile
15. Settings

The Challenge Detail and Interactive Challenge Workspace screens are especially important because they represent the core product experience.

Make the final result look like a real, polished cybersecurity product that could be implemented as a React/Tailwind application.
