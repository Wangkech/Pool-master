# 🎱 Pool Master

Pool Master is an **offline-first Progressive Web App (PWA)** for managing local pool and billiards sessions across multiple rounds. It was built around a custom game engine that models players, rounds, sessions, scoring, fouls, player ordering, and persistent game history through immutable snapshots.

The app is designed to work reliably even without an internet connection after the initial load, making it suitable for pool halls, tournaments, and casual games where connectivity cannot be guaranteed.

---

## ✨ Features

### 🎮 Session Management

* Create a new game session with any number of players
* Play through **multiple rounds** within the same session
* Automatically preserve session history
* End sessions and start new ones without losing previous records

### 🧮 Scoring System

* Automatic score calculation
* Correct handling of **fouls** and **cue scratches**
* Ball values follow the game rules (including the special value for the breaker ball)
* Shared ball availability across all players
* Prevents duplicate potting of the same ball

### 👥 Player Management

* Add players before a session starts
* **Add late players** during an active session
* Delete players during a session
* Player ordering automatically updates between rounds

### 🏆 Automatic Rankings

After every round, players are reordered automatically:

* Round winner is placed first
* Remaining players are ordered by score
* Ties are resolved automatically and preserved in the saved round snapshot

### 📚 History

* View completed sessions and rounds
* Browse historical player performance
* All history is stored locally on the device
* History remains available offline

### 📱 Progressive Web App

* Installable on desktop and mobile devices
* Works offline after the first successful load
* Fast startup through cached application assets
* No account or internet connection required during gameplay

---

## 🚀 How It Works

### Start a New Session

1. Add players
2. Choose a game mode
3. Start the session
4. Begin Round 1

### During a Round

For each player:

* Record a potted ball
* Record a wrong-ball foul
* Record a cue scratch

Scores update immediately and available balls are synchronized for every player.

### End a Round

When the round ends:

* Winner is determined automatically
* Player order is recalculated
* A snapshot of the completed round is stored
* A new round can begin immediately

### End a Session

Completed sessions are saved permanently in local storage and become available in the History tab.

---

## 🧠 Architecture

Pool Master is built around a layered architecture that separates game rules from the UI.

### Game Engine

* `GameEngine`
* `Session`
* `Round`
* `Player`
* `Ball`

The engine owns all game logic and can run independently of React.

### React Layer

React acts as a presentation layer:

* UI components
* Context providers
* Hooks
* Rendering and interaction handling

All UI is derived directly from immutable **game snapshots** returned by the engine.

---

## 💾 Offline & Persistence

Pool Master follows an **offline-first** design.

* Game state is stored in **localStorage**
* Sessions can be restored after refresh or app restart
* Installed PWA continues functioning without network access
* Completed history remains available offline

---

## 📊 Current MVP

The MVP includes:

* Multi-round sessions
* Automatic player ordering
* Late-player support
* Player deletion
* Session history
* Offline persistence
* Installable PWA
* Basic leaderboard and ranking support

---

## 🛣 Roadmap

Planned post-MVP improvements:

* Expanded analytics dashboard
* Global player rankings across sessions
* Cloud synchronization
* Import/export of game history
* Additional tournament formats
* Enhanced statistics and visualizations

---

## 🧑‍💻 Tech Stack

* **React**
* **Vite**
* **Tailwind CSS**
* **vite-plugin-pwa**
* **LocalStorage**
* **Custom JavaScript game engine**

---

## 📄 License

MIT License

---

**Version:** v2.0.0-beta
**Status:** Pre-release
