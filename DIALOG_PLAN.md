# Confirmation & Alert Dialogs Implementation Plan

**Date**: 2026-08-13  
**Priority**: 🔴 CRITICAL (MVP Blocker)  
**Estimated Effort**: 4-5 hours  

---

## Executive Overview

Currently, the Pool Master app lacks proper user feedback mechanisms for:
- ❌ Confirmation dialogs (destructive actions proceed without "Are you sure?")
- ❌ Error messages (validation failures shown via `alert()`)
- ❌ Success confirmations (actions complete silently)
- ❌ Structured dialog system (no centralized modal management)

This document specifies a complete implementation plan for a professional dialog system.

---

## 1. Dialog System Architecture

### 1.1 Dialog Types Required

| Type | Purpose | Examples |
|------|---------|----------|
| **Confirmation** | Confirm destructive action | Delete player, End session |
| **Alert/Info** | Informational message | "Player added", "Game ended" |
| **Error** | Error state & recovery options | "Game state corrupted, retry?" |
| **Warning** | Warning before action | "This will end the round" |
| **Success** | Action completed | "Session saved successfully" |

### 1.2 Architecture Pattern

```
┌─────────────────────────────────────────┐
│       DialogContext Provider            │
│  (Manages dialog state globally)         │
└────────────┬────────────────────────────┘
             │
     ┌───────┴────────┬───────────┬──────────┐
     ▼                ▼           ▼          ▼
DialogManager   useDialog    DialogComponent  Dialog Types
(Centralized)   (Custom Hook)  (Renderer)  (Specs)
```

### 1.3 Implementation Stack
- **State Management**: React Context API (DialogContext)
- **Component**: Modal overlay with Tailwind CSS
- **Hook**: `useDialog()` custom hook for easy access
- **Location**: `src/context/DialogContext.jsx` (new)
- **Styles**: `src/components/Dialog/` (new folder)

---

## 2. Dialog Types & Specifications

### 2.1 Confirmation Dialog

**Purpose**: Require user confirmation before destructive action

**Signature**:
```javascript
const { confirm } = useDialog();
const proceed = await confirm({
  title: "Delete Player?",
  message: "Are you sure you want to remove this player? This cannot be undone.",
  confirmText: "Delete",
  cancelText: "Cancel",
  isDangerous: true  // Makes confirm button red
});
if (proceed) {
  // Action confirmed
}
```

**Component Spec**:
```jsx
<ConfirmationDialog
  title="Delete Player?"
  message="Are you sure?"
  onConfirm={() => deletePlayer(id)}
  onCancel={() => closeDialog()}
  confirmText="Delete"
  cancelText="Cancel"
  isDangerous={true}  // Red button
/>
```

**UI Layout**:
```
┌──────────────────────────────────┐
│  Delete Player?                  │
├──────────────────────────────────┤
│  Are you sure you want to remove │
│  this player? This cannot be      │
│  undone.                          │
├──────────────────────────────────┤
│  [Cancel]  [Delete] (red button) │
└──────────────────────────────────┘
```

### 2.2 Alert Dialog

**Purpose**: Display informational message with single action

**Signature**:
```javascript
const { alert } = useDialog();
await alert({
  title: "Player Added",
  message: "John has been added to the game",
  type: "success",  // success | info | warning
  actionText: "OK"
});
```

**Component Spec**:
```jsx
<AlertDialog
  title="Player Added"
  message="John has been added to the game"
  type="success"  // Determines icon/color
  onAction={() => closeDialog()}
  actionText="OK"
/>
```

**UI Layout**:
```
┌──────────────────────────────────┐
│  ✓ Player Added                  │
├──────────────────────────────────┤
│  John has been added to the game │
├──────────────────────────────────┤
│           [OK]                   │
└──────────────────────────────────┘
```

### 2.3 Error Dialog

**Purpose**: Display error with recovery options

**Signature**:
```javascript
const { error } = useDialog();
await error({
  title: "Invalid Action",
  message: "You need at least 2 players to start a game",
  actions: [
    { label: "Add Player", onClick: () => goToAddPlayers() },
    { label: "OK", onClick: () => closeDialog() }
  ]
});
```

**Component Spec**:
```jsx
<ErrorDialog
  title="Invalid Action"
  message="You need at least 2 players to start a game"
  actions={[
    { label: "Add Player", onClick: handleAddPlayer },
    { label: "OK", onClick: handleClose }
  ]}
/>
```

**UI Layout**:
```
┌──────────────────────────────────┐
│  ✗ Invalid Action                │
├──────────────────────────────────┤
│  You need at least 2 players to  │
│  start a game                    │
├──────────────────────────────────┤
│  [Add Player]      [OK]          │
└──────────────────────────────────┘
```

### 2.4 Loading Dialog

**Purpose**: Show loading state during async operations

**Signature**:
```javascript
const { loading } = useDialog();
const hideLoading = loading({
  message: "Saving game..."
});
// ... do async work
hideLoading();
```

**Component Spec**:
```jsx
<LoadingDialog
  message="Saving game..."
  isOpen={isLoading}
/>
```

**UI Layout**:
```
┌──────────────────────────────────┐
│  ⟳ Saving game...                │
└──────────────────────────────────┘
```

---

## 3. File Structure

### New Files to Create

```
src/
├── context/
│   ├── DialogContext.jsx          (NEW - Dialog state management)
│   ├── useDialog.js               (NEW - Hook to access dialogs)
│   ├── useIsAddingPlayers/
│   └── ...
├── components/
│   ├── Dialog/                    (NEW - Dialog components)
│   │   ├── Dialog.jsx             (Base dialog wrapper)
│   │   ├── ConfirmationDialog.jsx (Confirm + Cancel)
│   │   ├── AlertDialog.jsx        (Single action)
│   │   ├── ErrorDialog.jsx        (Multiple actions)
│   │   ├── LoadingDialog.jsx      (Loading spinner)
│   │   └── Dialog.css             (Styling)
│   ├── Header.jsx
│   ├── ...
│   └── ...
├── App.jsx                        (MODIFY - Wrap with DialogProvider)
└── ...
```

---

## 4. Implementation Specifications

### 4.1 DialogContext.jsx

```javascript
// src/context/DialogContext.jsx
import { createContext, useState, useCallback } from 'react';

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const [queue, setQueue] = useState([]);

  const showDialog = useCallback((config) => {
    return new Promise((resolve) => {
      const dialogConfig = {
        ...config,
        resolve
      };
      setQueue(prev => [...prev, dialogConfig]);
    });
  }, []);

  const closeDialog = useCallback(() => {
    setQueue(prev => {
      if (prev.length === 0) return prev;
      const current = prev[0];
      current.resolve(false);
      return prev.slice(1);
    });
  }, []);

  // Show next dialog in queue
  useEffect(() => {
    if (queue.length > 0) {
      setDialog(queue[0]);
    } else {
      setDialog(null);
    }
  }, [queue]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog, dialog }}>
      {children}
      {dialog && <DialogRenderer dialog={dialog} onClose={closeDialog} />}
    </DialogContext.Provider>
  );
}
```

### 4.2 useDialog.js Hook

```javascript
// src/context/useDialog.js
import { useContext } from 'react';
import { DialogContext } from './DialogContext';

export function useDialog() {
  const context = useContext(DialogContext);
  
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  return {
    confirm: (config) => context.showDialog({
      type: 'confirm',
      ...config
    }),
    alert: (config) => context.showDialog({
      type: 'alert',
      ...config
    }),
    error: (config) => context.showDialog({
      type: 'error',
      ...config
    }),
    loading: (config) => {
      const { resolve } = context.showDialog({
        type: 'loading',
        ...config
      });
      return () => resolve();
    }
  };
}
```

### 4.3 Dialog Component

```javascript
// src/components/Dialog/Dialog.jsx
import './Dialog.css';

export function Dialog({
  isOpen,
  title,
  message,
  children,
  onClose,
  size = 'md'
}) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div 
        className={`dialog-content dialog-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="dialog-title">{title}</h2>}
        {message && <p className="dialog-message">{message}</p>}
        {children}
      </div>
    </div>
  );
}
```

### 4.4 ConfirmationDialog Component

```javascript
// src/components/Dialog/ConfirmationDialog.jsx
import { Dialog } from './Dialog';

export function ConfirmationDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = false,
  isOpen
}) {
  return (
    <Dialog isOpen={isOpen} title={title} message={message}>
      <div className="dialog-actions">
        <button 
          onClick={onCancel}
          className="btn btn-secondary"
        >
          {cancelText}
        </button>
        <button 
          onClick={onConfirm}
          className={`btn ${isDangerous ? 'btn-danger' : 'btn-primary'}`}
        >
          {confirmText}
        </button>
      </div>
    </Dialog>
  );
}
```

### 4.5 Dialog CSS

```css
/* src/components/Dialog/Dialog.css */

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  max-width: 90vw;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
}

.dialog-md {
  width: 100%;
  max-width: 400px;
}

.dialog-sm {
  width: 100%;
  max-width: 300px;
}

.dialog-lg {
  width: 100%;
  max-width: 500px;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}

.dialog-message {
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 24px;
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
}

.btn-primary:hover {
  background-color: #f0f0f0;
}

.btn-secondary {
  background-color: #333333;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #444444;
}

.btn-danger {
  background-color: #ff4444;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #cc0000;
}

.dialog-loading {
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #333;
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 5. Integration Points (What to Replace)

### 5.1 DeleteBtn.jsx

**Before**:
```jsx
function DeleteBtn({ deletePlayer, id }) {
  return (
    <button onClick={() => deletePlayer(id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
```

**After**:
```jsx
function DeleteBtn({ deletePlayer, id, playerName }) {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Player?',
      message: `Remove ${playerName} from this game? This cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    });
    
    if (confirmed) {
      deletePlayer(id);
      // Optional: show success
      // await alert({
      //   title: 'Player Removed',
      //   message: `${playerName} has been removed`,
      //   type: 'success'
      // });
    }
  };

  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
```

### 5.2 BottomRowContainer.jsx

**Before**:
```jsx
function BottomRowContainer({ setAdditionType, setGameOn, setIsAddingPlayers }) {
  const { startNewRound, endSession } = useGameContext();
  
  return (
    <div className="flex items-center justify-around">
      <button
        onClick={() => {
          endSession();
          setAdditionType("regular");
          setGameOn(false);
          setIsAddingPlayers(false);
        }}
        className="rounded-2xl bg-black p-2 px-4"
      >
        End Session
      </button>
      ...
    </div>
  );
}
```

**After**:
```jsx
function BottomRowContainer({ setAdditionType, setGameOn, setIsAddingPlayers }) {
  const { startNewRound, endSession } = useGameContext();
  const { confirm } = useDialog();

  const handleEndSession = async () => {
    const confirmed = await confirm({
      title: 'End Session?',
      message: 'Are you sure you want to end this session? The session will be saved to history.',
      confirmText: 'End Session',
      cancelText: 'Continue Playing',
      isDangerous: true
    });

    if (confirmed) {
      endSession();
      setAdditionType("regular");
      setGameOn(false);
      setIsAddingPlayers(false);
    }
  };

  return (
    <div className="flex items-center justify-around">
      <button
        onClick={handleEndSession}
        className="rounded-2xl bg-black p-2 px-4"
      >
        End Session
      </button>
      ...
    </div>
  );
}
```

### 5.3 AddPlayerModal.jsx

**Before**:
```jsx
if (playerList.length > 1) {
  startNewGame();
} else {
  alert(`Add more than ${playerList.length} Players to Proceed`);
}
```

**After**:
```jsx
const { confirm, error } = useDialog();

const handleContinue = async () => {
  if (playerList.length < 2) {
    await error({
      title: 'Not Enough Players',
      message: `You need at least 2 players. Currently added: ${playerList.length}`,
      actions: [
        { label: 'Add Player', onClick: () => {} },
        { label: 'OK', onClick: () => {} }
      ]
    });
    return;
  }

  startNewGame();
};
```

### 5.4 Settings Tab - Clear Data

**Implementation**:
```jsx
function SettingsTab({ setView }) {
  const { confirm, alert } = useDialog();
  const { clearAllData } = useGameContext();

  const handleClearData = async () => {
    const confirmed = await confirm({
      title: 'Clear All Data?',
      message: 'This will permanently delete all game history. This cannot be undone.',
      confirmText: 'Clear All Data',
      cancelText: 'Cancel',
      isDangerous: true
    });

    if (confirmed) {
      clearAllData();
      await alert({
        title: 'Data Cleared',
        message: 'All game history has been removed.',
        type: 'success'
      });
      setView('home');
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <button onClick={handleClearData} className="btn btn-danger">
        Clear All Data
      </button>
    </div>
  );
}
```

---

## 6. Integration Checklist

### Phase 1: Setup (1 hour)

- [ ] Create `src/context/DialogContext.jsx`
- [ ] Create `src/context/useDialog.js`
- [ ] Create `src/components/Dialog/` folder
- [ ] Create `Dialog.jsx`, `ConfirmationDialog.jsx`, `AlertDialog.jsx`, `ErrorDialog.jsx`
- [ ] Create `Dialog.css` with all styling
- [ ] Update `App.jsx` to wrap with `<DialogProvider>`
- [ ] Test that `useDialog()` hook works

### Phase 2: Replace Destructive Actions (1.5 hours)

- [ ] Update `DeleteBtn.jsx` to show confirmation
- [ ] Update `BottomRowContainer.jsx` (End Session confirmation)
- [ ] Update `AddPlayerModal.jsx` (show error instead of alert)
- [ ] Add confirmation to "End Round" button (if exists)
- [ ] Test each deletion/end action

### Phase 3: Complete Settings Tab (1 hour)

- [ ] Create complete `SettingsTab.jsx`
- [ ] Add Reset/Clear Data with confirmation
- [ ] Add About section with version
- [ ] Add feedback/contact link
- [ ] Add storage usage display (optional)

### Phase 4: Error Boundaries (1 hour)

- [ ] Create `ErrorBoundary.jsx` component
- [ ] Wrap App with ErrorBoundary
- [ ] Show error dialog on component crash
- [ ] Add recovery button (Retry/Home)

### Phase 5: Testing & Polish (30 mins)

- [ ] Test all dialogs on mobile
- [ ] Test dialog stacking (multiple dialogs in queue)
- [ ] Test accessibility (keyboard navigation)
- [ ] Test performance (no lag on open/close)
- [ ] Polish animations and styling

---

## 7. Destructive Actions Requiring Confirmation

| Action | Component | Confirmation Message |
|--------|-----------|----------------------|
| **Delete Player** | DeleteBtn.jsx | "Remove [Name] from this game?" |
| **End Session** | BottomRowContainer.jsx | "End this session? It will be saved to history." |
| **End Round** | (verify if exists) | "Are you sure you want to end this round?" |
| **Clear All Data** | SettingsTab.jsx | "Permanently delete all game history?" |
| **Add Duplicate Player** | (new validation) | "[Name] is already in this game" |

---

## 8. Validation Errors Requiring Dialogs

| Error | Component | Error Message |
|-------|-----------|----------------|
| **Not Enough Players** | AddPlayerModal.jsx | "You need at least 2 players" |
| **Duplicate Player Name** | AddPlayerModal.jsx | "[Name] is already added" |
| **Invalid Game State** | GameTab.jsx | "Game state error. Reload app?" |
| **localStorage Full** | (global) | "Storage full. Clear history?" |
| **Service Worker Error** | (on load) | "Offline features unavailable" |

---

## 9. Success Messages (Optional but Recommended)

| Action | Message |
|--------|---------|
| Add Player | "Player added successfully" |
| End Round | "Round ended, [Winner] wins!" |
| End Session | "Session saved to history" |
| Clear Data | "All data has been cleared" |

---

## 10. Code Examples - Complete Implementation

### Example 1: Complete DeleteBtn.jsx

```jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDialog } from "../../context/useDialog";

function DeleteBtn({ deletePlayer, id, playerName }) {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Player?",
      message: `Remove ${playerName} from this game? This cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      isDangerous: true
    });
    
    if (confirmed) {
      deletePlayer(id);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      title={`Remove ${playerName}`}
      className="text-red-500 hover:text-red-400"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteBtn;
```

### Example 2: Complete BottomRowContainer.jsx

```jsx
import { useGameContext } from "../../context/useGameContext";
import { useDialog } from "../../context/useDialog";

function BottomRowContainer({
  setAdditionType,
  setGameOn,
  setIsAddingPlayers,
}) {
  const { startNewRound, endSession } = useGameContext();
  const { confirm } = useDialog();

  const handleEndSession = async () => {
    const confirmed = await confirm({
      title: "End Session?",
      message:
        "Are you sure you want to end this session? The session will be saved to history.",
      confirmText: "End Session",
      cancelText: "Continue Playing",
      isDangerous: true,
    });

    if (confirmed) {
      endSession();
      setAdditionType("regular");
      setGameOn(false);
      setIsAddingPlayers(false);
    }
  };

  return (
    <div className="flex items-center justify-around">
      <button
        onClick={handleEndSession}
        className="rounded-2xl bg-black p-2 px-4"
      >
        End Session
      </button>
      <button
        onClick={() => startNewRound()}
        className="rounded-2xl bg-white px-4 py-2 text-black"
      >
        Next Round
      </button>
    </div>
  );
}

export default BottomRowContainer;
```

### Example 3: App.jsx with DialogProvider

```jsx
import { useState } from "react";
import { DialogProvider } from "./context/DialogContext";
import Header from "./components/Header";
import Navbar from "./components/NavBar/Navbar";
import "./css/App.css";
import GameTab from "./tabs/GameTab";
import HistoryTab from "./tabs/HistoryTab";
import RankingsTab from "./tabs/RankingsTab";
import SettingsTab from "./tabs/SettingsTab";

function App() {
  const [view, setView] = useState("home");
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);

  return (
    <DialogProvider>
      <>
        <Header />
        {view == "home" && (
          <GameTab
            setView={setView}
            setIsAddingPlayers={setIsAddingPlayers}
            isAddingPlayers={isAddingPlayers}
            setView={setView}
          />
        )}
        {view == "history" && (
          <HistoryTab setIsAddingPlayers={setIsAddingPlayers} setView={setView} />
        )}
        {view === "ranking" && <RankingsTab />}
        {view === "settings" && <SettingsTab setView={setView} />}
        <Navbar setView={setView} view={view} />
      </>
    </DialogProvider>
  );
}

export default App;
```

---

## 11. Testing Checklist

### Dialog Functionality Tests

- [ ] Confirmation dialog shows correct title/message
- [ ] Confirmation dialog returns true when "Confirm" clicked
- [ ] Confirmation dialog returns false when "Cancel" clicked
- [ ] Alert dialog shows single action button
- [ ] Error dialog shows multiple action options
- [ ] Loading dialog shows spinner and message
- [ ] Dialog overlay closes on button click
- [ ] Dialog closes on action
- [ ] Dialog queue works (multiple dialogs)

### Integration Tests

- [ ] Delete player shows confirmation dialog
- [ ] Delete player completes after confirmation
- [ ] Delete player is cancelled with cancel button
- [ ] End session shows confirmation dialog
- [ ] End session completes after confirmation
- [ ] Add player validation shows error dialog
- [ ] Duplicate player shows error dialog
- [ ] Clear data shows confirmation dialog

### UX Tests

- [ ] Dialogs are keyboard navigable (Tab to buttons)
- [ ] Dialogs are centered on all screen sizes
- [ ] Dialogs are visible on small phones (375px)
- [ ] Dialogs overlay is semi-transparent
- [ ] Dialog animations are smooth
- [ ] Dialogs don't cause scroll on mobile
- [ ] Button colors are appropriate (danger = red)
- [ ] Text is readable (good contrast)

### Mobile Tests

- [ ] Dialogs work on iOS Safari
- [ ] Dialogs work on Android Chrome
- [ ] Virtual keyboard doesn't cover dialog
- [ ] Dialog buttons are touch-friendly (min 44x44px)
- [ ] Landscape orientation works
- [ ] Dialog doesn't scroll the page behind it

---

## 12. Implementation Timeline

| Phase | Task | Time | Owner |
|-------|------|------|-------|
| 1 | Create Dialog Context & Components | 1h | Dev |
| 2 | Integrate DeleteBtn confirmation | 30m | Dev |
| 2 | Integrate EndSession confirmation | 30m | Dev |
| 2 | Integrate AddPlayer validation errors | 30m | Dev |
| 3 | Complete Settings tab | 1h | Dev |
| 4 | Add Error Boundaries | 1h | Dev |
| 5 | Test all dialogs (mobile + desktop) | 1.5h | QA/Dev |
| **Total** | | **5-6h** | |

**Expected Completion**: 1 full day (6-8 hours with breaks)

---

## 13. Post-MVP Enhancements

- [ ] Toast notifications (quick feedback, no modal)
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts (Enter to confirm, Escape to cancel)
- [ ] Customizable dialog themes
- [ ] Dialog animations (scale, fade, slide)
- [ ] Accessibility improvements (ARIA labels, focus management)
- [ ] Dialog history/logging for debugging

---

## 14. Notes

1. **Dialog Queue**: Implement queue to handle multiple dialogs stacked properly
2. **Accessibility**: Ensure Tab/Enter/Escape work for keyboard users
3. **Mobile First**: Test heavily on actual mobile devices
4. **Performance**: Dialogs should not cause layout shift or jank
5. **Animation**: Keep animations quick (200-300ms) and smooth
6. **Styling**: Use existing dark theme colors (#1e1e1e, #ffffff)
7. **Error Messages**: Always provide action items, not just errors

---

## 15. Success Criteria

✅ **MVP Ready When**:
- All destructive actions have confirmation dialogs
- All errors show proper error dialogs (not browser alert)
- Dialog system is centralized and reusable
- Settings tab is complete with data clear option
- All dialogs work on mobile (iOS + Android)
- No browser alert() or confirm() calls remain in app
- Error boundaries prevent white-screen crashes
- All tests in Testing Checklist pass

---

**Document Status**: Ready for Implementation ✅  
**Next Step**: Begin Phase 1 (Create Dialog Context & Components)
