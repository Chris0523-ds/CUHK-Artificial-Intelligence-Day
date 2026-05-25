const KATEX_OPTIONS = {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ],
  throwOnError: false,
};

export function waitForKaTeX(timeoutMs = 8000) {
  return new Promise((resolve) => {
    if (typeof window.renderMathInElement === "function") {
      resolve(true);
      return;
    }

    const deadline = Date.now() + timeoutMs;

    const check = () => {
      if (typeof window.renderMathInElement === "function") {
        resolve(true);
        return;
      }

      if (Date.now() > deadline) {
        resolve(false);
        return;
      }

      window.setTimeout(check, 50);
    };

    check();
  });
}

export async function renderLatexInElement(element) {
  if (!element) {
    return;
  }

  const ready = await waitForKaTeX();
  if (!ready) {
    return;
  }

  window.renderMathInElement(element, KATEX_OPTIONS);
}

export async function renderLatexInElements(elements) {
  await waitForKaTeX();

  for (const element of elements) {
    await renderLatexInElement(element);
  }
}
