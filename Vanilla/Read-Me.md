<!-- # NEW FEATURES.

- ARCHIVE PLAYER:-

* this feature lets a player temporarily leave the game or skip out on the current round.

* players can get to re-enter the game later on when they are ready. they get to keep their records: scores and wins that they accumulated during their active phase.

* Players can also choose to permanently leave the games and their stored data will not affect the ranking of the active players.

- What is accomplished so far

* a status tag of active is added to the player's profile in the playerList object with the initial value of true.

* when the archive button is clicked, the player's active status tags turns false.

* if the player's active status tag is false, they get removed from the ui.

# FOR CORE STABILITY AND APP USABILITY:

- before the feature is fully function:

* archive-player is set to display none. -->

# ✨ New Features

### 🔹 Archive Player

The **Archive Player** feature allows players to temporarily leave the game or skip a round.

- Players who archive themselves:

  - Keep all their records (scores, wins) accumulated while active.
  - Are removed from the active game and leaderboard, so only active players influence rankings.

- Archived players can rejoin later.

  - Their past data will be restored automatically.
  - Any missed rounds will be shown as **hyphens (-)** in their record.

- Players can also choose to **permanently leave** the game.

  - In this case, their stored data will not affect the ranking of active players.

---

# ✅ Current Progress

- Added an `active` status flag to each player’s profile in the `playerList` object (`true` by default).
- Clicking the **Archive** button sets the player’s status to `false`.
- Archived players are hidden from the UI.

---

# 🔧 Work in Progress (Stability & Usability)

- Currently, the archive button (`archive-player`) is hidden (`display: none`) while the feature is being stabilized.
- Next steps:

  - Ensure seamless re-entry of archived players.
  - Handle permanent removal separately.
  - Update leaderboard/history views accordingly.
