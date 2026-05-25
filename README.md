# Artificial Intelligence Day in CUHK-Shenzhen

A modern, extensible problem-bank website (English content) built as a zero-dependency static project.

## Quick Start

Open `index.html` directly in your browser.

If you prefer a local server (recommended), run one of these commands in this folder:

- Python: `python -m http.server 8080`
- Node (if available): `npx serve .`

Then visit `http://localhost:8080`.

## Project Structure

- `index.html`: page structure and sections
- `styles.css`: modern UI style (glassmorphism-inspired cards and gradients)
- `script.js`: rendering + filters + state management
- `data/problemBanks.js`: all problem-bank data and helper functions

## Add More Problem Banks

Edit `data/problemBanks.js` and append a new object to `problemBanks`:

```js
{
  id: "your-bank-id",
  name: "Your New Problem Bank",
  description: "Short description",
  year: 2026,
  curator: "Your Team",
  problems: [
    {
      id: "NEW-001",
      title: "Problem title",
      topic: "Topic",
      difficulty: "Easy",
      status: "open",
      summary: "One-line summary"
    }
  ]
}
```

Supported values:

- `status`: `open` or `solved`
- `difficulty`: any text (for example `Easy`, `Medium`, `Hard`)
