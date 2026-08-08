# Pool Master Design Notes

## Core Architecture & Implementation Strategy

> **Purpose**
>
> This document exists to keep me grounded throughout the development of Pool Master. It records the reasoning behind the architecture, the responsibilities of each component, and the implementation strategy I agreed on before writing the application.
>
> Whenever I feel tempted to redesign everything or add new abstractions, I should come back here first.

---

# Why I am rebuilding the application

The current version of Pool Master works.

It successfully allows me to:

- Add players
- Record scores
- Determine winners
- Store game history
- Display a leaderboard
- Continue interrupted sessions

The problem is not functionality.

The problem is architecture.

As the application has grown, the data has become scattered across multiple arrays, localStorage entries and UI functions. Most features work because they know where to find the required data rather than because the application has a well-defined structure.

That approach worked while the application was small, but it will not scale to the features I eventually want to build.

This rewrite is therefore not about replacing a working application.

It is about giving the application a proper foundation that allows future features to be added naturally instead of forcing them into an increasingly complicated codebase.

---

# My First Goal

The first milestone is **not** to introduce new features.

The first milestone is to rebuild the existing application using the new architecture while preserving all current behaviour.

Only when the React version behaves exactly like the current vanilla JavaScript version should I begin adding new functionality.

Feature parity comes first.

New features come afterwards.

---

# The Biggest Lesson

When I first started planning this rewrite, I assumed the biggest challenge would be designing the classes.

It wasn't.

The real challenge was understanding how object-oriented programming fits into React.

If I were writing this in vanilla JavaScript or Java, I would simply let one GameEngine object own everything and mutate itself whenever something changes.

React doesn't work that way.

React expects immutable state.

My domain objects are naturally mutable.

Trying to force one paradigm into the other created unnecessary confusion.

Eventually I realised something important.

The GameEngine does not have to be immutable.

Only React state does.

That changes everything.

---

# The Relationship Between React and the Engine

The engine is not React state.

The engine is the application.

React is simply a way of looking at it.

The engine should be created once.

It should exist for the entire lifetime of the session.

Whenever the user performs an action, React asks the engine to perform that action.

The engine updates itself.

React then requests a fresh snapshot of the engine's state and replaces its own state with that snapshot.

React never owns the game.

It only renders the current state of the game.

This separation is the most important architectural decision in the project.

---

# The Role of the GameEngine

The GameEngine is the root object of the application.

Everything begins here.

Every interaction between the UI and the domain passes through the GameEngine.

Nothing inside the application should be manipulated directly by React.

Instead, React communicates exclusively with the GameEngine.

The GameEngine is responsible for coordinating the rest of the application.

It is not responsible for doing absolutely everything itself.

Instead, it owns the objects that perform specialised work and coordinates them.

I should think of the GameEngine as the conductor of an orchestra.

It doesn't play the instruments.

It tells them when to play.

---

# What the GameEngine Owns

The GameEngine owns four primary pieces of the application.

## Current Session

Represents the session that is currently being played.

There is always at most one active session.

Everything related to the current gathering belongs here.

---

## Player Repository

Stores every player that the application knows about.

Originally players only existed inside a session.

That design immediately became limiting because I wanted to:

- create a new session using players from the previous session,
- detect duplicate players,
- allow players to return after being archived,
- eventually maintain player history across multiple sessions.

This means players should exist independently of sessions.

The session simply references the players participating in it.

---

## Session Repository

Stores completed sessions.

This allows the application to:

- display previous sessions,
- create a new session from an older session,
- resume unfinished sessions,
- eventually support exports,
- eventually support cloud synchronisation.

A session should not disappear simply because it is no longer active.

---

## Available Game Modes

The GameEngine owns every available game mode.

A mode is simply a configuration describing how the session should behave.

The engine applies the selected mode while coordinating gameplay.

---

# Current Session

A GameSession represents one real-world meeting.

Everything that happens during that meeting belongs to that session.

The session owns:

- participating players,
- the current round,
- completed rounds,
- session configuration,
- the selected game mode.

The session is responsible for storing gameplay data.

It is not responsible for coordinating gameplay.

That responsibility belongs to the GameEngine.

---

# Players

A Player represents one real person.

A Player should only contain information that naturally belongs to that person.

For now this is intentionally very small.

Examples include:

- identity,
- display name,
- current participation state.

Players should not permanently store statistics.

Statistics belong to gameplay history.

This distinction is important.

A player's average score is not something they own.

It is something that can always be calculated.

The same applies to:

- wins,
- rankings,
- badges,
- averages,
- streaks,
- performance reports.

Those values belong to analytics.

---

# Rounds

A Round represents one completed game.

Each round is responsible for recording:

- participating players,
- scores,
- winner,
- completion state.

Once completed, a round becomes historical data.

It should not continue changing during normal gameplay.

The collection of completed rounds becomes the source of truth for everything else.

---

# Analytics

The AnalyticsEngine exists for one purpose.

To answer questions.

It never controls gameplay.

It never changes gameplay.

It simply reads completed rounds and produces information.

Examples include:

- leaderboard,
- player rankings,
- average scores,
- badges,
- session summaries,
- performance reports.

If I ever find myself storing information that can already be calculated from completed rounds, I should stop and ask whether it really belongs there.

---

# Why Statistics Are Calculated

Originally I considered storing wins, averages and similar values directly on the Player.

Eventually I realised this creates unnecessary duplication.

Gameplay history already contains everything required to calculate these values.

By treating history as the source of truth, every statistic automatically updates whenever history changes.

This makes the application simpler and reduces opportunities for inconsistent data.

---

# React's Responsibility

React is responsible only for presentation.

It should:

- render screens,
- receive user input,
- display dialogs,
- display reports,
- display statistics.

React should never decide who won.

React should never calculate rankings.

React should never modify domain objects directly.

Every action passes through the GameEngine.

---

# Implementation Strategy

I will not attempt to rebuild everything at once.

Instead, I will recreate the current application feature by feature.

The implementation order is intentionally simple.

## Phase 1

Build the core domain objects.

- GameEngine
- GameSession
- Player
- Round
- AnalyticsEngine

No UI concerns.

Only domain logic.

---

## Phase 2

Recreate the existing application.

Implement only the features that already exist today.

These include:

- creating sessions,
- adding players,
- archiving players,
- restoring archived players,
- recording scores,
- ending rounds,
- storing history,
- displaying leaderboards,
- persisting sessions.

The application should now behave exactly like the current version.

Nothing more.

---

## Phase 3

Only after feature parity is achieved should I begin introducing the new features.

These include:

- substitutions,
- waiting queues,
- team mode,
- configurable game modes,
- badge system,
- advanced analytics,
- tournament support,
- cloud synchronisation.

Each feature should be introduced independently without requiring major architectural changes.

If adding a feature forces me to redesign the core architecture, I should first question whether the architecture is wrong or whether the feature can be integrated differently.

---

# The Rule I Want to Follow

Every time I write code, I want to ask myself one question:

> **"Am I implementing the architecture, or am I fighting against it?"**

If I find myself writing code that bypasses the GameEngine, stores duplicate data, or tightly couples React to the domain, I should stop and reconsider.

The architecture exists to make future development easier.

Every decision should reinforce it, not work around it.

---

# Long-Term Vision

The application I am building today is only the foundation.

Eventually I want Pool Master to become a complete game management platform capable of supporting:

- multiple game modes,
- player substitutions,
- team play,
- historical session management,
- advanced analytics,
- achievements and badges,
- tournament management,
- cloud synchronisation,
- multiple client applications (Web, Android and Desktop).

I should not build these features today.

Instead, I should build an architecture that allows me to add them naturally when the time comes.

---
