# Portfolio Project

This is a small React portfolio "desktop" app built with Vite, Tailwind and some helper libraries. It emulates a macOS-like desktop with windows, a dock, and a finder. This README documents the project structure, main concepts, and how pieces interact.

---

## Table of Contents

- Project Overview
- How to run
- Folder structure and key files
- Key concepts
  - Windows system
  - Window wrapper
  - Stores
  - Finder and files
  - Themes
- Styling and utilities
- Libraries used
- Extending the project
- Troubleshooting

---

## Project Overview

The app provides a small interactive portfolio where "apps" (windows) can be opened from the dock or finder. Each window is a React component wrapped in a `WindowWrapper` HOC that provides the draggable behavior, show/hide logic, and z-index management.

The UI uses Tailwind and a handful of custom utilities (see `src/index.css`) to produce a polished desktop-like look.

## How to run

Prerequisites: Node.js (>= 16), npm.

Install:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Folder structure and key files

- `index.html` — app entry html.
- `src/main.jsx` — React entry mounting the app.
- `src/App.jsx` — Root layout: renders `Navbar`, `Welcome`, `Dock` and all windows.
- `src/components/` — Reusable presentational components.
  - `Navbar.jsx` — top bar with icons, time and theme menu.
  - `Dock.jsx` — bottom dock with app icons.
  - `WindowControls.jsx` — window close/minimize/maximize controls.
- `src/hoc/WindowWrapper.jsx` — HOC to wrap every window component to handle display, GSAP animation, and draggable behavior.
- `src/windows/` — Each window is a component here. Examples:
  - `Finder.jsx` — file browser; clicking files opens windows (text, images, URLs, resume pdfs).
  - `Resume.jsx` — renders an embedded PDF.
  - `Text.jsx` — displays `.txt`-type files (name, optional image/subtitle, and paragraphs).
  - `Image.jsx` — displays image files.
- `src/store/` — Zustand stores for app state.
  - `window.js` — global window state (open/close, z-index, data payload for windows).
  - `location.js` — finder location state.
- `src/constants/index.js` — all constant data (app icons, locations, sample files, and the `WINDOW_CONFIG` that defines available windows and initial state).
- `src/index.css` — Tailwind imports and project-wide CSS, including utilities and dark-mode overrides.
- `public/` — static assets such as images and icons.

---

## Key concepts

### Windows system

- Windows are configured via `WINDOW_CONFIG` in `src/constants/index.js`. Each key (e.g., `finder`, `safari`, `txtfile`, `imgfile`) has an object with `isOpen`, `zIndex`, and `data`.
- To open a window, components call `openWindow(windowKey, data)` from the window store. The `data` payload is passed to the window component via the store and used to render file contents.

### Window wrapper (`src/hoc/WindowWrapper.jsx`)

- This HOC accepts a component and a `windowKey`. It reads the `windows` state from the `window` store to decide whether to render the window and what `zIndex` to apply.
- It also sets up GSAP animations (on open) and GSAP Draggable to allow dragging the window.

### Stores

- `src/store/window.js` uses `zustand` and `immer` middleware to maintain simple mutable-style updates for windows.
- `openWindow` sets `isOpen=true`, assigns a z-index and optionally attaches `data`.
- `closeWindow` hides a window and clears data.

### Finder and files

- Finder lists `locations` defined in `src/constants/index.js`.
- Each file entry has a `kind` (folder/file), `fileType` (`txt`, `img`, `url`, `pdf`, `fig`), `name`, icons and optional fields like `imageUrl`, `href`, and `description`.
- Clicking a file typically calls `openWindow` with the appropriate `windowKey` (for example: `openWindow('txtfile', fileItem)` or `openWindow('imgfile', fileItem)`).

### Themes

- Theme selection is managed in the `Navbar` component. The chosen theme is saved to `localStorage` under `theme` and the app toggles a `dark` class on both `<html>` and `<body>` so CSS can respond.
- Dark-mode styles live in `src/index.css`. The `html.dark` selector switches the background wallpaper from `day.jpg` to `night.jpg` and overrides many component colors for a pleasant dark appearance.

---

## Styling and utilities

- Tailwind is used with custom `@utility` and `@layer` directives inside `src/index.css` for convenient macros.
- The project also uses a few custom utilities (e.g., `.icon`, `#window-header`) to keep consistency across windows.
- Dark-mode styles are applied via `html.dark` selectors.

---

## Libraries used

- React — UI library.
- Vite — fast development server / build tool.
- Tailwind CSS — utility-first CSS framework.
- Zustand — tiny, fast state management for windows and locations.
- Immer — used with Zustand to allow mutable-style updates.
- GSAP + Draggable — for smooth opening animations and dragging windows.
- react-pdf — rendering PDFs in the resume window.
- lucide-react — icon set used throughout.
- dayjs — formatting and updating the clock in the `Navbar`.

---

## Extending the project

- Add a new window:
  1. Create `src/windows/MyWindow.jsx` exporting a component wrapped with `WindowWrapper(Component, 'mywindow')`.
  2. Add an entry in `WINDOW_CONFIG` (in `src/constants/index.js`) for `mywindow: { isOpen:false, zIndex: INITIAL_Z_INDEX, data: null }`.
  3. Export your window from `src/windows/index.js` and import into `App.jsx`.
  4. Open the window from anywhere with `openWindow('mywindow', optionalData)`.

- Add a new file type in Finder:
  1. Add file metadata to one of the locations in `src/constants/index.js` under `children`.
  2. Update `Finder.jsx`'s `openItem` logic if you need custom behavior for a new `fileType`.

---

## Troubleshooting

- Wallpaper not changing: The theme system toggles a `dark` class on `<html>` and `<body>`. If the background does not change, confirm that `localStorage.theme` is set and that both `html` and `body` have/removed the `dark` class.
- Menu not showing: The theme menu is a simple absolute-positioned list. If it appears off-screen on small screens, adjust the `right`/`left` positioning in `src/index.css` under `.theme-menu`.

---

## Notes and design decisions

- The `WindowWrapper` keeps window behavior consistent. Individual windows only focus on rendering their content.
- Theme toggling uses a top-level class to make it easy to override colors across the whole app with CSS.
- The Finder uses sample data inside `src/constants/index.js` so the app can run without external APIs.

