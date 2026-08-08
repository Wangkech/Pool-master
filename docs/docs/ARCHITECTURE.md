# Pool Master Architecture v1.0 (Locked)

## Core Philosophy

The objective of this rewrite is **not** to add new features.

The objective is to migrate the existing application into a clean, scalable architecture while preserving its current functionality.

Only after the rewritten application reaches feature parity with the current version will new features be introduced incrementally.

---

# Guiding Principles

### 1. Feature Parity First

The rewritten application must behave exactly like the current application.

No new gameplay mechanics should be introduced until parity is achieved.

This minimizes variables and makes debugging significantly easier.

---

### 2. The Engine Owns the Domain

The GameEngine owns the application's business logic.

React owns the presentation.

Neither should know how the other works internally.

---

### 3. React Is a Viewer

React never manipulates Players, Rounds, Sessions, or Scores directly.

It simply asks the GameEngine to perform operations and then renders the latest state.

---

### 4. Single Source of Truth

Gameplay data lives inside the engine.

Statistics are derived from gameplay history.

Nothing should be duplicated unless there is a compelling performance reason.

---

# Architecture

```text
React UI
      │
      ▼
PoolMasterController
      │
      ▼
GameEngine
      │
 ┌────┼─────────────────────────────┐
 │    │                             │
 │    │                             │
 ▼    ▼                             ▼
Current Session              Player Repository
      │                      Session Repository
      │                      Available Modes
      │
 ┌────┼─────────────────────┐
 │    │                     │
 ▼    ▼                     ▼
Players
Current Round
Completed Rounds
Configuration
      │
      ▼
Analytics Engine
```

---

# Responsibilities

## React

Responsible for:

- Rendering UI
- User interaction
- Navigation
- Forms
- Dialogs
- Animations

React is **not** responsible for gameplay.

---

## PoolMasterController

Acts as the bridge between React and the engine.

Responsibilities:

- Receive UI requests.
- Call the GameEngine.
- Retrieve updated state.
- Update React state.

It contains no business logic.

---

## GameEngine

The root domain object.

The GameEngine coordinates the entire application.

It owns:

- Current Session
- Player Repository
- Session Repository
- Available Modes

It is responsible for:

- Starting sessions.
- Ending sessions.
- Creating rounds.
- Ending rounds.
- Player management.
- Applying the selected game mode.
- Coordinating gameplay.
- Persisting state.

Everything passes through the GameEngine.

---

## Player Repository

Stores every player known to the application.

This allows:

- Creating new sessions from existing players.
- Duplicate detection.
- Player history across sessions.
- Reusing players without recreating them.

Players become persistent entities instead of session-only objects.

---

## Session Repository

Stores completed sessions.

Responsible for:

- Loading previous sessions.
- Creating sessions from previous sessions.
- Session history.
- Future exports.
- Future cloud synchronization.

---

## Available Modes

Contains every supported game mode.

Examples:

- Classic
- Rotation
- Teams
- Custom Modes

Modes are configuration objects.

They define rules but do not execute gameplay.

---

# Current Session

Represents one real-world gathering.

Owns:

- Active Players
- Current Round
- Completed Rounds
- Session Configuration
- Selected Game Mode

Everything inside the Session disappears when the session ends except what is archived by the repositories.

---

# Player

Represents one real person.

Owns only information intrinsic to that person.

Examples:

- Name
- Unique ID
- Display preferences (future)

The Player does **not** own:

- Wins
- Rankings
- Average score
- Badges
- Leaderboard position

These are all computed.

---

# Current Round

Represents one game.

Responsible for:

- Participants
- Scores
- Winner
- Completion status

When completed:

The Round is moved into the Session's completed rounds.

---

# Analytics Engine

Reads completed rounds.

Produces:

- Leaderboards
- Player statistics
- Rankings
- Badges
- Reports

It never modifies gameplay.

---

# Persistence Strategy

The GameEngine should exist for the entire lifetime of the active session.

It should survive:

- Page refreshes
- Browser reloads
- Accidental reloads
- Application restarts (through persistence)

The engine is restored before the UI is rendered.

This creates the feeling of a continuously running application rather than a webpage with temporary state.

---

# React Integration Strategy

The engine is **not** stored in React state.

Instead:

```text
Application Starts

↓

Engine Restored

↓

React Requests Snapshot

↓

React Stores Snapshot

↓

Render UI
```

Whenever the user performs an action:

```text
Button Click

↓

Controller

↓

GameEngine

↓

GameEngine Updates Domain

↓

Controller Requests Fresh Snapshot

↓

React Replaces State

↓

UI Re-renders
```

React never mutates domain objects.

The GameEngine is free to use mutable objects internally because React only receives immutable snapshots.

---

# Implementation Roadmap

We will rebuild the existing application one capability at a time.

### Phase 1 — Core Domain

- GameEngine
- Player
- GameSession
- Round
- AnalyticsEngine

### Phase 2 — Existing Features

- Add player
- Archive player
- Restore player
- Record score
- End round
- Store round history
- Leaderboard
- Session persistence

At this point, the React version should behave exactly like the current vanilla JavaScript application.

### Phase 3 — New Features

Only after reaching feature parity will we introduce:

- Substitutions
- Waiting queue
- Team mode
- Rotation mode
- Configurable rules
- Custom modes
- Badges
- Advanced analytics
- Tournament mode
- Cloud synchronization

Each feature will be added independently without requiring architectural changes.

---

# Development Rule

From this point onward, every implementation decision should satisfy one question:

> **Does this move the React version closer to feature parity without compromising the architecture?**

If the answer is **yes**, it belongs in the current milestone.

If the answer is **no**, it should be postponed until after parity is achieved.

---
