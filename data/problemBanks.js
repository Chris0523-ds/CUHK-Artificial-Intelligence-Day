export const problemBanks = [
  {
    id: "ai-day-2026-main",
    name: "AI Day Main Problem Bank",
    description:
      "Core challenge set for Artificial Intelligence Day in CUHK-Shenzhen, covering theory, systems, and applications.",
    year: 2026,
    curator: "AI Day Academic Committee",
    problems: [
      {
        id: "AID-001",
        title: "Design a Lightweight Vision Transformer for Edge Devices",
        topic: "Computer Vision",
        difficulty: "Hard",
        status: "open",
        summary:
          "Propose architectural modifications that keep accuracy competitive while reducing latency on constrained hardware.",
      },
      {
        id: "AID-002",
        title: "Evaluate Robustness Under Distribution Shift",
        topic: "Model Evaluation",
        difficulty: "Medium",
        status: "open",
        summary:
          "Build an evaluation protocol to compare model behavior when the test distribution differs from the training distribution.",
      },
      {
        id: "AID-003",
        title: "Prompt Compression Without Performance Drop",
        topic: "Large Language Models",
        difficulty: "Medium",
        status: "solved",
        summary:
          "Find a strategy to shorten prompts while preserving task success across multiple benchmark categories.",
      },
      {
        id: "AID-004",
        title: "Low-Resource Speech Recognition for Cantonese",
        topic: "Speech and Audio",
        difficulty: "Hard",
        status: "open",
        summary:
          "Develop methods that improve recognition quality using limited labeled data and noisy real-world recordings.",
      },
      {
        id: "AID-005",
        title: "Human-in-the-Loop Safety Review Workflow",
        topic: "AI Safety",
        difficulty: "Easy",
        status: "solved",
        summary:
          "Define a review loop where human checks, model uncertainty, and policy constraints jointly reduce unsafe outputs.",
      },
    ],
  },
];

export function getBankById(bankId) {
  return problemBanks.find((bank) => bank.id === bankId) ?? null;
}

export function getDifficultyOptions(bank) {
  if (!bank) {
    return [];
  }

  return [...new Set(bank.problems.map((problem) => problem.difficulty))];
}
