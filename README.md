# 🍽️ World Kitchen

A dark-themed, interactive meal discovery app built with React + TypeScript. Browse globally inspired recipes, explore cuisines by category and origin, and dive into full cooking instructions — all from a single, beautiful UI.

## ✨ Features

- Browse paginated meal cards fetched from the [FreeAPI](https://freeapi.app) meals endpoint
- Click any card to open a split-panel modal with full cooking instructions
- Meal tags, cuisine origin badge, and category label on every card
- Smooth skeleton loading state while data fetches
- Pagination with a graceful end-of-results message after page 30
- Close modal via backdrop click or `Escape` key
- Fully keyboard accessible — cards are focusable and `Enter`-activatable

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🛠 Tech Stack

- **React** + **TypeScript** (Vite)
- **FreeAPI** — `https://api.freeapi.app/api/v1/public/meals`
- **Playfair Display** + **DM Sans** via Google Fonts
- Pure CSS — no UI library, no animation package

## 📁 Project Structure

```
src/
├── App.tsx       # Main component — card grid, modal, pagination
└── App.css       # Dark food-themed stylesheet
```

## 🖱️ How It Works

| Action | Result |
|---|---|
| Load page | Fetches 10 meals, shows skeleton shimmer |
| Click a card | Opens modal with image, tags, and full instructions |
| Click backdrop / press `Esc` | Closes modal |
| Click "View Recipe" link | Opens source URL in a new tab (doesn't open modal) |
| Prev / Next buttons | Fetches the next page of meals |
| Reach page 30 | Shows end-of-results message |

## 🎨 Design Notes

- Deep espresso dark theme with ember, saffron, and gold accents
- Cards lift and image zooms subtly on hover
- Modal occupies **55vw** on desktop, stacks vertically on mobile (< 768px)
- Instructions panel scrolls independently with a custom thin scrollbar
