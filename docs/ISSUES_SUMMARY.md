# Issue Summary

## 1. React `key` misuse in `PastRound`

- `PastRound` previously accepted `key` as a prop and attempted to use it inside the component.
- React does not pass `key` to child components as a prop.
- The `key` belongs on the parent list item when rendering the component.

## 2. Form/button submission duplication in Add Player modal

- `PlayerNameInput` renders a `<form>` with `onSubmit={addPlayerToList}` and a button inside it.
- `AddPlayerBtn` uses a plain `<button>` without `type="button"` or `type="submit"` explicitly set.
- That can cause duplicate submission behavior and duplicate player additions if the button triggers both click and form submission.

## 3. Missing return value in `GameEngine.getAllBalls`

- `GameEngine.getAllBalls()` calls `this.currentSession.getAllBalls();` but does not return the result.
- This likely results in `undefined` being returned when `controller.getAllBalls()` is called and consumed.

## 4. Suspicious logic in `GameEngine`/`Session` methods

- `Session.getAllBalls()` also does not return `this.currentRound.balls`; it merely evaluates the expression.
- The `Session.startNewRound()` method creates a new `Round` and then calls `this.currentRound.setParticipants()` without verifying current session state.
- `GameEngine.addLatePlayer()` pushes a late player into `this.players` and then forwards it to `currentSession?.addLatePlayer(player)`; if session players are out of sync, duplicate or stale state may occur.

## 5. Console logs and debug code present

- Multiple components and logic files contain leftover `console.log()` statements (e.g. `PointsBtns`, `PastRounds`, `useGame.js`, `gameEngine.js`, `session.js`).
- These can clutter runtime output and make debugging harder.

## 6. List key generation issues

- `ActivePlayerCard` uses `key={id}` on the root `<li>` even though `key` should be passed by the parent list renderer, not inside the child component.
- `ActivePlayerCard` also uses `crypto.randomUUID()` for child ball list keys, which can break React reconciliation if keys change every render.

## 7. State initialization and derived state

- In `useGame`, `currentRoundExists` is derived once from initial `snapshot`, but not recomputed after `gameState` changes before `setGameOn` is used.
- There may be stale boolean state handling around `gameOn`, `currentRoundExists`, and session startup.

## 8. Inconsistent list semantics

- `PastRounds` renders `<ul>` containing `PastRound` as list children, but `PastRound` used a top-level `<div>` (now corrected). This was inconsistent with list markup.

## 9. Possible duplicate player filtering and session restore

- `GameEngine.restoreEngine` maps raw player objects and resets prototype, but does not deeply validate player IDs or session consistency.
- The current snapshot/save process relies on mutating engine state and may propagate stale data between `gameState` and engine internals.

## Notes

- These issues are observed from code patterns, not from runtime debugging.
- A follow-up fix pass should target the broken `getAllBalls` returns, explicit button types, and `key` usage hygiene.
