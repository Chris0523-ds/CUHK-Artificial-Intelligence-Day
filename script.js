import { getBankById, getDifficultyOptions, problemBanks } from "./data/problemBanks.js";
import { renderLatexInElement, waitForKaTeX } from "./utils/latex.js";

const elements = {
  bankTabs: document.querySelector("#bank-tabs"),
  searchInput: document.querySelector("#search-input"),
  statusFilter: document.querySelector("#status-filter"),
  difficultyFilter: document.querySelector("#difficulty-filter"),
  title: document.querySelector("#active-bank-title"),
  description: document.querySelector("#active-bank-description"),
  stats: document.querySelector("#stats"),
  problemList: document.querySelector("#problem-list"),
};

const state = {
  activeBankId: problemBanks[0]?.id ?? null,
  search: "",
  status: "all",
  difficulty: "all",
  expandedProblemIds: new Set(),
};

function applyFilters(problems) {
  return problems.filter((problem) => {
    const searchable = [
      problem.id,
      problem.title,
      problem.topic,
      problem.summary,
      problem.question,
      problem.answer,
    ]
      .filter(Boolean)
      .join(" ");

    const matchesSearch =
      state.search.length === 0 || searchable.toLowerCase().includes(state.search.toLowerCase());

    const matchesStatus = state.status === "all" || problem.status === state.status;
    const matchesDifficulty = state.difficulty === "all" || problem.difficulty === state.difficulty;

    return matchesSearch && matchesStatus && matchesDifficulty;
  });
}

function createStatCard(label, value) {
  const card = document.createElement("article");
  card.className = "stat-card";
  card.innerHTML = `<span class="label">${label}</span><span class="value">${value}</span>`;
  return card;
}

function renderStats(bank, visibleProblems) {
  const solvedCount = bank.problems.filter((problem) => problem.status === "solved").length;
  const openCount = bank.problems.length - solvedCount;

  elements.stats.innerHTML = "";
  elements.stats.append(
    createStatCard("Total Problems", bank.problems.length),
    createStatCard("Open", openCount),
    createStatCard("Solved", solvedCount),
    createStatCard("Showing", visibleProblems.length)
  );
}

function formatMarkdownLite(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`)
    .join("");
}

function toggleProblem(problemId) {
  if (state.expandedProblemIds.has(problemId)) {
    state.expandedProblemIds.delete(problemId);
  } else {
    state.expandedProblemIds.add(problemId);
  }

  renderProblemCards(getActiveFilteredProblems());
}

function getActiveFilteredProblems() {
  const activeBank = getBankById(state.activeBankId);
  if (!activeBank) {
    return [];
  }

  return applyFilters(activeBank.problems);
}

function createProblemCard(problem) {
  const isExpanded = state.expandedProblemIds.has(problem.id);
  const article = document.createElement("article");
  article.className = `problem-card${isExpanded ? " is-expanded" : ""}`;
  article.dataset.problemId = problem.id;

  const sourceLink = problem.source
    ? `<a class="problem-source" href="${problem.source}" target="_blank" rel="noopener noreferrer">View source</a>`
    : "";

  article.innerHTML = `
    <button
      class="problem-header"
      type="button"
      aria-expanded="${isExpanded ? "true" : "false"}"
      aria-controls="details-${problem.id}"
    >
      <span class="problem-header-main">
        <span class="problem-title">${problem.id}: ${problem.title}</span>
        <span class="problem-meta"><strong>Topic:</strong> ${problem.topic}</span>
        <span class="problem-meta problem-summary">${problem.summary}</span>
      </span>
      <span class="problem-header-side">
        <span class="badges">
          <span class="badge ${problem.status}">${problem.status.toUpperCase()}</span>
          <span class="badge difficulty">${problem.difficulty}</span>
        </span>
        <span class="expand-icon" aria-hidden="true">${isExpanded ? "▾" : "▸"}</span>
      </span>
    </button>
    <div
      id="details-${problem.id}"
      class="problem-details${isExpanded ? " is-open" : ""}"
      ${isExpanded ? "" : "hidden"}
    >
      <section class="problem-section">
        <h4>Question</h4>
        <div class="latex-content question-content"></div>
      </section>
      <section class="problem-section">
        <h4>Answer</h4>
        <div class="latex-content answer-content"></div>
      </section>
      ${sourceLink}
    </div>
  `;

  const header = article.querySelector(".problem-header");
  const questionContent = article.querySelector(".question-content");
  const answerContent = article.querySelector(".answer-content");
  const summaryContent = article.querySelector(".problem-summary");

  questionContent.innerHTML = formatMarkdownLite(problem.question);
  answerContent.innerHTML = formatMarkdownLite(problem.answer);

  header.addEventListener("click", () => {
    toggleProblem(problem.id);
  });

  void renderProblemCardLatex(summaryContent, questionContent, answerContent, isExpanded);

  return article;
}

async function renderProblemCardLatex(summaryContent, questionContent, answerContent, isExpanded) {
  await renderLatexInElement(summaryContent);

  if (isExpanded) {
    await renderLatexInElement(questionContent);
    await renderLatexInElement(answerContent);
  }
}

function renderProblemCards(problems) {
  elements.problemList.innerHTML = "";

  if (problems.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No problems match your current filters.";
    elements.problemList.appendChild(emptyState);
    return;
  }

  const cards = problems.map((problem) => createProblemCard(problem));
  elements.problemList.append(...cards);
}

function renderDifficultyOptions(bank) {
  const options = getDifficultyOptions(bank);
  elements.difficultyFilter.innerHTML = '<option value="all">All</option>';

  options.forEach((difficulty) => {
    const option = document.createElement("option");
    option.value = difficulty;
    option.textContent = difficulty;
    elements.difficultyFilter.appendChild(option);
  });

  if (state.difficulty !== "all" && !options.includes(state.difficulty)) {
    state.difficulty = "all";
  }
}

function renderBankTabs() {
  elements.bankTabs.innerHTML = "";

  problemBanks.forEach((bank) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `bank-tab${state.activeBankId === bank.id ? " active" : ""}`;
    button.role = "tab";
    button.ariaSelected = state.activeBankId === bank.id ? "true" : "false";
    button.textContent = bank.name;

    button.addEventListener("click", () => {
      state.activeBankId = bank.id;
      state.search = "";
      state.status = "all";
      state.difficulty = "all";
      state.expandedProblemIds.clear();
      elements.searchInput.value = "";
      elements.statusFilter.value = "all";
      render();
    });

    elements.bankTabs.appendChild(button);
  });
}

function render() {
  const activeBank = getBankById(state.activeBankId);
  if (!activeBank) {
    elements.title.textContent = "No problem bank selected";
    elements.description.textContent = "";
    elements.stats.innerHTML = "";
    renderProblemCards([]);
    return;
  }

  renderBankTabs();
  renderDifficultyOptions(activeBank);

  elements.difficultyFilter.value = state.difficulty;
  elements.title.textContent = activeBank.name;
  elements.description.textContent = `${activeBank.description} (${activeBank.year}, curated by ${activeBank.curator})`;

  const filteredProblems = applyFilters(activeBank.problems);
  renderStats(activeBank, filteredProblems);
  renderProblemCards(filteredProblems);
}

function setupEventListeners() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    render();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });

  elements.difficultyFilter.addEventListener("change", (event) => {
    state.difficulty = event.target.value;
    render();
  });
}

async function init() {
  if (problemBanks.length === 0) {
    elements.title.textContent = "No problem bank available";
    elements.description.textContent = "Add one in data/problemBanks.js to get started.";
    renderProblemCards([]);
    return;
  }

  await waitForKaTeX();
  setupEventListeners();
  render();
}

init();
