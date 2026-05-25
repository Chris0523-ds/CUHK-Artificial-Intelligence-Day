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

## Problem Data Fields

Each problem supports:

- `question`: LaTeX-friendly statement (use `$...$` inline, `$$...$$` display)
- `answer`: solution, proof sketch, or known progress
- `source`: optional reference URL (for example an Erdős Problems page)

Example:

```js
{
  id: "Erdős-1",
  title: "Distinct Subset Sums",
  topic: "Number Theory",
  difficulty: "Hard",
  status: "open",
  source: "https://www.erdosproblems.com/1",
  summary: "Short preview shown in the collapsed card.",
  question: "If $A \\subseteq \\{1,\\ldots,N\\}$ ... then $$N \\gg 2^n.$$",
  answer: "Known progress with LaTeX formulas..."
}
```
