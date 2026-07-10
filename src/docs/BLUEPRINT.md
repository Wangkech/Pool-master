# 1. Vision

## Purpose

Pool Master is not just a score tracking application.

It is a configurable Pool Session Management System designed to manage casual and competitive pool sessions through reusable game rules, multiple play modes, persistent player statistics, and complete session history.

The goal is to separate game logic from presentation so that the same engine can power multiple user interfaces (Web, Android, Desktop, etc.).

## Long-term Vision

The Pool Master engine should eventually support:

- Individual matches
- Team matches
- Player substitution systems
- Waiting queues
- Tournament play
- Persistent player statistics
- Session history
- Multiple game modes
- Cloud synchronization
- Different frontends without changing the engine

# 2. Design Philosophy

### Decision

Pool Master will be designed as a game engine with a separate presentation layer.

### Reason

Business rules should not depend on React, HTML, CSS, or any frontend framework.

The game engine should be capable of running independently of the user interface.

### Future Impact

This enables:

- Web version
- Android application
- Desktop application
- Future API integration
  using the same engine.

### Decision

The engine should model the real-world game rather than the user interface.

### Reason

Users think in terms of:

- sessions
- rounds
- players
- substitutions
- teams
  not buttons and components.

The software architecture should reflect those concepts.

# 3. Engineering Principles

### Single Responsibility

- Every class owns one responsibility.

### Separation of Concerns

- UI displays information.
- The engine manages the game.
- Storage persists data.
- Each layer is independent.

### Configuration over Hardcoding

- Game behavior should be configurable.
- Examples include:
  - substitution method
  - team size
  - scoring method
  - tie breaker
  - player limits

These are configuration choices rather than hardcoded logic.

### Framework Independence

The engine should have no dependency on React.
React is only responsible for presenting data.

### Extensibility

New features should be added by extending the engine rather than modifying existing behavior whenever possible.

# 4. Vocabulary

These definitions establish a common language for the project.

### Session

- A collection of rounds played during a single gathering.
- A session begins when players start playing and ends when the gathering finishes.

### Round

- A single completed game played within a session.
- A session contains multiple rounds.

### Player

- A participant registered in the session.
- Players maintain statistics throughout the session regardless of whether they are currently playing.

### Team

- A collection of players competing together.
- Individual statistics remain independent while the team has its own combined score.

### Waiting Player

- A registered player who is temporarily not participating in the current round but remains part of the session.
- Archived Player
- A player who has temporarily or permanently left the current session.
- Their statistics remain stored.

### Mode

- A predefined configuration that determines how a session operates.
- Examples include:
- - Classic
- - Rotation
- - Teams
- - Tournament
- - Rule

- A configurable behavior that affects gameplay.
- Examples include:
- - substitutions
- - scoring
- - tie breaking
- - grouping
- - player rotation

### 5. High-Level Architecture

                            Pool Master

                                    │

                                    ▼

                            Session Manager

                                    │

                                    ├───────────────┐
                                    ▼               ▼

                            Current Session Session History

                                    │

                                    ▼

                            Game Mode

                                    │

                                    ▼

                            Rules Engine

                                    │

                                    ▼

                            Current Round

                                    │

                     ┌──────────────┴───────────────────────┐
                     ▼                                      ▼

                   Players                                Teams

                    │

                    ▼

                   Rack

                    │

                    ▼

                   Balls




### 6. Project Goals

The architecture should support the following without requiring a redesign.

### Core Features

- Score tracking
- Round history
- Session history
- Winner tracking
- Player statistics
- Rotation Features
- Waiting queue
- Automatic substitutions
- Manual substitutions
- Lowest-score rotation
- Random rotation
- Team Features
- Teams of any size
- Individual contributions
- Team scoring
- Team statistics
- Future Features
- Tournament mode
- Cloud sync
- User accounts
- Session export
- Analytics
- Multiple tables
- Live scoreboard
- AI insights
