import { getBankById, getDifficultyOptions, problemBanks } from "./data/problemBanks.js";

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
};

function applyFilters(problems) {
  return problems.filter((problem) => {
    const matchesSearch =
      state.search.length === 0 ||
      `${problem.id} ${problem.title} ${problem.topic} ${problem.summary}`
        .toLowerCase()
        .includes(state.search.toLowerCase());

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

function renderProblems(problems) {
  elements.problemList.innerHTML = "";

  if (problems.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No problems match your current filters.";
    elements.problemList.appendChild(emptyState);
    return;
  }

  const cards = problems.map((problem) => {
    const article = document.createElement("article");
    article.className = "problem-card";
    article.innerHTML = `
      <div class="problem-title-row">
        <h3 class="problem-title">${problem.id}: ${problem.title}</h3>
        <div class="badges">
          <span class="badge ${problem.status}">${problem.status.toUpperCase()}</span>
          <span class="badge difficulty">${problem.difficulty}</span>
        </div>
      </div>
      <p class="problem-meta"><strong>Topic:</strong> ${problem.topic}</p>
      <p class="problem-meta">${problem.summary}</p>
    `;
    return article;
  });

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
    renderProblems([]);
    return;
  }

  renderBankTabs();
  renderDifficultyOptions(activeBank);

  elements.difficultyFilter.value = state.difficulty;
  elements.title.textContent = activeBank.name;
  elements.description.textContent = `${activeBank.description} (${activeBank.year}, curated by ${activeBank.curator})`;

  const filteredProblems = applyFilters(activeBank.problems);
  renderStats(activeBank, filteredProblems);
  renderProblems(filteredProblems);
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

function init() {
  if (problemBanks.length === 0) {
    elements.title.textContent = "No problem bank available";
    elements.description.textContent = "Add one in data/problemBanks.js to get started.";
    renderProblems([]);
    return;
  }

  setupEventListeners();
  render();
}

init();
