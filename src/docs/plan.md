# Implementation Strategy

## Objective

The rewrite will be completed incrementally.

Rather than attempting to recreate the entire application before testing it, I will build one complete feature at a time.

Each implementation phase should leave the application in a working state.

By the end of every phase, I should be able to run the application, interact with it, and verify that the newly implemented feature behaves correctly.

This approach reduces debugging complexity and allows architecture problems to be discovered early.

---

# Phase 0 — Project Setup

## Goal

Establish the foundation of the new React application.

Nothing gameplay-related should be implemented during this phase.

### Deliverables

- Create the React project.
- Configure the project structure.
- Organize folders for:

  - components
  - pages
  - engine
  - domain
  - analytics
  - persistence
  - hooks
  - utilities

- Configure routing (if needed).
- Configure styling.
- Configure linting and formatting.
- Establish naming conventions.

### Success Criteria

The application launches successfully and displays a placeholder interface.

No gameplay functionality exists yet.

---

# Phase 1 — Engine Skeleton

## Goal

Create the application's backbone.

At this stage the engine does not perform any gameplay logic.

It simply exists as the central coordinator.

### Implement

- GameEngine
- GameSession
- Player
- Round
- AnalyticsEngine
- SessionManager

Only constructors and relationships should exist.

Example:

```text
GameEngine

owns

Current Session

Player Repository

Session Repository

AnalyticsEngine
```

No business logic.

No scoring.

No winners.

### Success Criteria

The engine can be instantiated.

React can create one engine instance.

Nothing else.

---

# Phase 2 — Session Lifecycle

## Goal

The application should be able to create and manage sessions.

### Implement

- Create Session
- End Session
- Resume Session
- Load Session
- Save Session
- Session Configuration

A session should persist across browser refreshes.

The engine should restore itself automatically.

### Success Criteria

A user can:

- create a session,
- refresh the page,
- continue exactly where they left off.

---

# Phase 3 — Player Management

## Goal

Replace the current player array with proper domain objects.

### Implement

- Create Player
- Player Repository
- Add Existing Player
- Add New Player
- Prevent duplicates
- Archive Player
- Restore Player
- Remove Player Permanently

At the end of this phase the player list should behave exactly like the current application.

### Success Criteria

Every player action currently available in the vanilla application works identically in React.

---

# Phase 4 — Round Management

## Goal

Introduce the concept of a playable round.

### Implement

- Create Round
- Start Round
- End Round
- Current Round
- Completed Rounds

The engine should now understand the concept of "currently playing."

### Success Criteria

The application can start and finish rounds without scores.

---

# Phase 5 — Score Management

## Goal

Move all scoring logic into the engine.

### Implement

- Add Score
- Deduct Score
- Score Validation
- Reset Scores
- Round Scores

No score calculations should happen inside React.

### Success Criteria

The scoring behaviour matches the existing application exactly.

---

# Phase 6 — Winner Determination

## Goal

The engine can now complete a round correctly.

### Implement

- Highest Score
- Tie Detection
- Tie Resolution
- Winner Assignment

At this point the application behaves exactly like the current version regarding winners.

### Success Criteria

Round winners match the existing application.

---

# Phase 7 — History

## Goal

Preserve gameplay.

### Implement

- Completed Round Storage
- Session History
- Previous Session Loading

No statistics yet.

Only history.

### Success Criteria

History survives application reloads.

---

# Phase 8 — Analytics

## Goal

Generate information from history.

### Implement

- Leaderboard
- Rankings
- Total Wins
- Total Games
- Average Scores (if needed)

Everything should be calculated.

Nothing duplicated.

### Success Criteria

The leaderboard matches the current application.

---

# Phase 9 — React Integration

## Goal

Finish the communication between React and the engine.

### Implement

- Controller
- Snapshot generation
- UI refresh mechanism
- Engine persistence
- State synchronization

React should never directly modify domain objects.

Every interaction goes through the GameEngine.

### Success Criteria

The application reaches **feature parity** with the existing vanilla JavaScript version.

At this point the rewrite is complete.

---

# Phase 10 — Architecture Validation

This phase is intentionally different.

No new features are added.

Instead, I should spend time using the application exactly as an end user would.

Questions to ask:

- Does every responsibility live in the correct class?
- Is there duplicated logic?
- Does React know too much?
- Does the engine know too much?
- Are there methods becoming too large?
- Are objects depending on each other unnecessarily?

The purpose of this phase is to refine the architecture before expanding it.

---

# Phase 11 — New Features

Only after the rewrite reaches feature parity should new functionality begin.

Features should be introduced independently so they don't destabilize the existing system.

Planned roadmap:

1. Archive & Restore improvements.
2. Waiting queue / substitute mode.
3. Automatic substitutions.
4. Team mode.
5. Team substitutions.
6. Configurable game modes.
7. Badge system.
8. Advanced analytics.
9. Tournament support.
10. Cloud synchronization.
11. Native Android application.

Each feature should integrate with the existing architecture without requiring major redesigns.

---

# Development Principles

Every phase must satisfy these rules:

### 1. The application should always compile.

There should never be a phase where the project is intentionally left broken.

### 2. Every phase should be testable.

I should be able to verify the feature before moving on.

### 3. Finish before expanding.

I will complete one phase before starting the next.

Avoid partially implementing multiple systems simultaneously.

### 4. Preserve feature parity.

Until Phase 9 is complete, I am rebuilding—not inventing.

Any temptation to add new features should be recorded for later rather than implemented immediately.

### 5. Refactor only when necessary.

If I notice a better design while implementing a phase, I should first ask:

> "Does this solve a real problem I'm facing now, or am I designing for a future feature?"
