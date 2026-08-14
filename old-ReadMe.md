# 🎱 Pool Master - Tournament Tracker

A web-based scoring and tournament management application for pool/billiards elimination games. Track player scores across multiple rounds and sessions with automatic leaderboard rankings and persistent game history.

---

## 📋 Features

### Player Management

- **Add Players**: Enter player names to create a game session
- **Score Tracking**: Input and update player scores for each round
- **Late Comer**: Add new players who arrive after the session has started
- **Archive Player**: Temporarily remove players while preserving their records (currently in development)

### Game Management

- **Multiple Rounds**: Play through unlimited rounds, with scores accumulating
- **Two-Player Special Handling**: When only 2 players remain, displays the score difference and current leader
- **Game Sessions**: Create new sessions to start fresh tournaments
- **Game Counter**: Automatically tracks total games played

### Game History & Leaderboard

- **Persistent Records**: All game data is saved in your browser's local storage
- **Game History View**: See all past games and player performance
- **Automatic Leaderboard**: Rankings update based on active players' scores

### Data Persistence

- Your game sessions are automatically saved—no data is lost if you refresh the page
- Game history persists across browser sessions
- Player scores are preserved when moving between rounds

---

## 🎮 How to Use

### Starting a New Game

1. **Click "Create Session"** to begin a new game session
2. **Add Players**:
   - Enter a player name in the text input field
   - Click "Add Player"
   - Repeat for all participants
3. **Confirm Players**: Click the "confirm" button once all players are added

### Playing the Game

1. **Enter Scores**:
   - Each player has a score input field
   - Enter the points earned in the current round
   - Click "add points" to record the score
2. **Move to Next Round**: Click "next round" to advance to the next round and reset inputs
3. **Add Late Comers**: Click "add late comer" if a new player joins mid-game
4. **End Session**: Click "end session" when the game is complete

### Viewing Game History

- **Game Records**: All completed games appear in the "Game Records" section at the bottom of the page
- **Leaderboard**: Active players are ranked based on accumulated points
- **No Records Message**: "No game records yet" appears when starting your first game

---

## ⚙️ Technical Details

### Browser Storage

- All data is stored in your browser's **localStorage**
- Data persists across page refreshes and browser sessions
- Clearing browser data will erase all game history

### Saved Data

- Player list and scores
- Game history and rounds
- Game number/session count
- Game status (active or ended)

### Special Features

#### Two-Player Mode

When exactly 2 players remain active, the display switches to a special format:

- Shows each player side-by-side
- Displays the point difference between players
- Highlights who's currently in the lead

---

## 🔧 Features in Development

### Archive Player

The Archive Player feature is currently being stabilized and is hidden from the UI.

**Planned Functionality:**

- Temporarily remove a player from the active game
- Archived players keep all accumulated scores and records
- Option to rejoin archived players later with data restored
- Permanent removal option for players who want to leave entirely
- Only active players affect tournament rankings

---

## 💡 Tips

- **Backup Important Records**: Consider taking screenshots of your game history before clearing browser data
- **Session Management**: Clearing cookies/local storage will erase all game history
- **Two-Player Games**: The app automatically detects when you have 2 players and adjusts the display accordingly
- **Multiple Games**: You can play multiple tournament sessions—each game is numbered and tracked

---

## 🐛 Known Limitations

- Archive Player button is currently hidden while the feature is being finalized
- Archived player re-entry functionality is not yet fully implemented
- Permanent player removal feature is under development

---

## 📱 Browser Compatibility

Works on any modern web browser that supports:

- HTML5 and CSS3
- JavaScript ES6+
- LocalStorage API

---

**Version**: 2.0 | **Last Updated**: May 2026
