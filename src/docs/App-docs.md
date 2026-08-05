Pool Master Engine Documentation (v1.0)

Project overview

Pool Master is a local-first pool score tracking application built around a domain-driven game engine. The engine is intentionally separated from the React UI so that gameplay rules, session management, scoring, persistence, and history remain independent of rendering.

The architecture follows a layered model:

React UI
    ↓
Game Context / useGame
    ↓
Controller
    ↓
GameEngine
    ↓
Session
    ↓
Round
    ↓
Player / Ball

The UI issues commands through the controller. The engine mutates live objects internally and returns immutable snapshots that React renders.

---

Core design principles

Single source of truth

The game engine owns all gameplay state.

React never calculates scores, determines winners, tracks available balls, or decides player order. It only renders snapshots returned by the engine.

Immutable snapshots

The engine operates on mutable class instances during gameplay.

Whenever the UI needs data, the engine returns a deeply cloned immutable snapshot.

Snapshots are used for:

- React rendering
- History
- Persistence
- Session archives
- Restore operations

Layered ownership

GameEngine

Owns:

- player repository
- session history
- active session
- available game modes

Coordinates high-level operations.

Session

Owns:

- participating players
- rounds
- current round
- player ordering between rounds
- session lifecycle

Round

Owns:

- scoring
- fouls
- scratches
- available balls
- winner determination
- round ordering data

Player

Owns intrinsic identity:

- id
- name

Holds contextual state during active gameplay.

Ball

Represents a single ball and its availability.

---

Entity documentation

Ball

Purpose

Represents one playable ball.

Properties

- ballNo
- id
- value
- isPotted

Value rules

Ball values equal their number except:

Ball 3 → value 6

Methods

potted()

Marks the ball as unavailable.

restoreBall(...)

Reconstructs a Ball instance from persisted snapshot data.

---

Player

Purpose

Represents a persistent player identity.

Properties

- id
- name
- state

Runtime state

During an active round:

{
  isKnocked,
  isActive,
  ballBasket,
  score
}

State transitions

sessionMemberState()

Initial session participation.

roundState()

Fresh round state.

knockedState()

Player eliminated.

archivedState()

Player disabled.

Scoring methods

potBall(ball)

Adds a positive scoring ball.

potCueBall(ball)

Adds a negative version of the current ball.

hitWrongBall(ball)

Adds a negative version of a selected ball.

calculateScore()

Recalculates score from the basket.

Score is always derived from the basket.

Serialization

getSnapshot()

Returns immutable player snapshot.

restorePlayer(...)

Restores a player from persisted data.

---

Round

Responsibility

A Round is the authoritative owner of gameplay rules.

It controls:

- scoring
- fouls
- scratches
- available balls
- winner determination

Construction

new Round(players, mode, roundNumber)

Player initialization

setParticipants()

Resets every participant into fresh round state.

Ball management

getAvailableBalls()

Returns remaining unpotted balls sorted ascending.

getCurrentBall()

Returns the current scoring ball.

Rules:

- if breaker (ball 3) remains, current ball is breaker
- otherwise current ball is the lowest available ball

Scoring commands

recordScore(playerId, ballId)

Validates availability.

Marks ball potted.

Adds positive score.

Recalculates player score.

recordCueScratch(playerId)

Applies negative value of current ball.

recordWrongHit(playerId, ballId)

Applies negative value of selected available ball.

Winner determination

determineWinner()

Highest score wins.

Ties are resolved randomly.

Winner is stored before snapshot generation.

Snapshot generation

getSnapshot()

Returns immutable round history object.

Contains:

- round metadata
- player snapshots
- available balls
- winner
- mode
- completion state

Restoration

restoreRound(data)

Reconstructs:

- players
- balls
- winner
- mode
- completion state

Reattaches prototypes so restored objects regain class methods.

---

Session

Responsibility

Represents one complete game session.

Owns:

- players
- rounds
- current round
- player ordering
- mode
- session lifecycle

Player setup

setPlayers()

Places every participant into session state.

Round lifecycle

startNewRound()

Creates a new Round.

Player order comes from:

getPlayersInOrder()

If no previous round exists, original player order is used.

endCurrentRound()

Delegates winner determination and round completion.

saveCurrentRound()

Stores immutable snapshot.

Increments round counter.

Clears active round reference.

Player ordering

getPlayersInOrder()

Returns live Player instances ordered according to previous round results.

fullSort()

Implements Pool Master ordering rules.

Rules:

1. Previous round winner breaks first.
2. Remaining players ordered by descending score.
3. Equal scores randomized.
4. Ordering affects next round only.

Session lifecycle

endSession()

If a round is active:

- ends the round
- marks session complete

Otherwise simply marks session complete.

Snapshot generation

getSnapshot()

Returns immutable session object containing:

- completed rounds
- player snapshots
- current round snapshot
- mode
- completion state

Restoration

restoreSession(data)

Restores:

- players
- completed rounds
- current round
- mode
- completion state

Reconstructs nested Round, Player, and Ball instances.

---

GameEngine

Responsibility

Top-level coordinator.

Owns:

- player repository
- session history
- active session
- available modes

Player management

addPlayer(name)

Creates persistent player.

addLatePlayer(name)

Registers a player during an active session.

Currently equivalent to addPlayer.

deletePlayer(id)

Removes player from repository and active session.

Session management

startNewSession()

Creates active Session.

startNewRound()

Delegates to session.

endCurrentRound()

Ends round and archives snapshot.

endCurrentSession()

Ends session.

Stores session snapshot.

Clears active session.

Persistence

getSnapshot()

Returns complete application snapshot.

Contains:

- players
- current session
- archived sessions
- modes

restoreEngine(data)

Reconstructs entire engine state from persisted snapshot.

---

Controller

Purpose

Public API between React and the engine.

The UI never communicates directly with GameEngine.

Characteristics

Every mutating command returns a fresh snapshot.

Examples:

addPlayer()
recordScore()
startNewRound()
endSession()
deletePlayer()

Read operations expose engine state without allowing mutation.

Persistence

saveGameState()

Serializes engine snapshot to localStorage.

restoreData()

Loads localStorage.

Reconstructs engine.

Returns initial snapshot for React.

---

React integration

useGame hook

Acts as the bridge between React and the controller.

Responsibilities:

- holds current snapshot
- dispatches controller commands
- updates React state
- persists after mutations

Data flow

User clicks button
      ↓
useGame command
      ↓
Controller
      ↓
GameEngine
      ↓
Session
      ↓
Round
      ↓
Player / Ball mutation
      ↓
Snapshot generated
      ↓
React state updated
      ↓
Components re-render

---

Persistence model

Storage location

localStorage

Stored object

Complete GameEngine snapshot.

Includes:

- players
- active session
- archived sessions
- current round
- round history
- scores
- winners
- available balls

Restoration process

JSON
   ↓
plain objects
   ↓
prototype reassignment
   ↓
restore methods
   ↓
live class instances

This allows gameplay to continue seamlessly after a browser reload.

---

Current feature status

Completed

- Player management
- Session lifecycle
- Multiple rounds
- Multiple sessions
- Scoring
- Cue scratches
- Wrong-ball fouls
- Available ball tracking
- Winner determination
- Next-round ordering
- Immutable snapshots
- Local persistence
- Engine restoration
- React integration
- Context integration

Planned

- History display
- Leaderboard
- Temporary player disable
- Late-player session integration
- Team mode
- Rotation mode
- Statistics / analytics

---

Architectural summary

Pool Master is designed around a headless game engine.

The engine contains all business logic and can operate independently of React.

React is treated as a rendering layer that consumes immutable snapshots and issues commands through a controller.

This separation allows future migration to:

- Next.js
- mobile applications
- desktop applications
- multiplayer networking
- server-side persistence

without requiring a rewrite of the gameplay engine itself.