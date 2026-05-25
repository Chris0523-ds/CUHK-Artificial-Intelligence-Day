export const problemBanks = [
  {
    id: "erdos-style-main",
    name: "Classic Open Problems Bank",
    description:
      "Sample mathematics problems inspired by Erdős Problems, with LaTeX statements and known progress.",
    year: 2026,
    curator: "AI Day Academic Committee",
    problems: [
      {
        id: "Erdős-1",
        title: "Distinct Subset Sums",
        topic: "Number Theory",
        difficulty: "Hard",
        status: "open",
        source: "https://www.erdosproblems.com/1",
        summary:
          "If subset sums of an $n$-set are all distinct, must $N$ grow at least like $2^n$?",
        question: `If $A \\subseteq \\{1,\\ldots,N\\}$ with $|A|=n$ is such that the subset sums
$$\\sum_{a \\in S} a$$
are distinct for all $S \\subseteq A$, prove that
$$N \\gg 2^n.$$`,
        answer: `This is **Erdős Problem #1** and remains open.

**Upper bound:** powers of $2$ give $N \\leq 2^{n-1}$.

**Lower bounds (known progress):**
- Trivial: $N \\gg 2^n / n$.
- Erdős and Moser (1956): $$N \\geq \\left(\\tfrac{1}{4}-o(1)\\right)\\frac{2^n}{\\sqrt{n}}.$$
- Current record (Dubroff, Fox, Xu, 2021): $$N \\geq \\binom{n}{\\lfloor n/2 \\rfloor}.$$`,
      },
      {
        id: "Erdős-2",
        title: "Infinitude of Primes",
        topic: "Number Theory",
        difficulty: "Easy",
        status: "solved",
        summary: "Show that there are infinitely many prime numbers.",
        question: `Prove that the set of prime numbers is infinite; equivalently, for every integer $N$, there exists a prime $p > N$.`,
        answer: `**Euclid's proof (classical):**

Assume there are only finitely many primes $p_1, p_2, \\ldots, p_k$. Consider
$$M = p_1 p_2 \\cdots p_k + 1.$$
Then $M > 1$ is not divisible by any $p_i$, so $M$ has a prime factor different from all $p_i$. Contradiction.

Hence there are infinitely many primes.`,
      },
      {
        id: "Erdős-3",
        title: "Twin Prime Conjecture",
        topic: "Analytic Number Theory",
        difficulty: "Hard",
        status: "open",
        summary: "Are there infinitely many pairs of primes differing by $2$?",
        question: `A **twin prime pair** is a pair $(p, p+2)$ where both numbers are prime. Prove or disprove:
$$\\text{there are infinitely many twin prime pairs.}$$`,
        answer: `This conjecture is still open.

**Known progress:**
- Hardy and Littlewood predicted the density of such pairs.
- Zhang (2013) proved that there are infinitely many pairs of consecutive primes with gap at most $70{,}000{,}000$.
- The Polymath project reduced this gap; subsequent work has shown gaps can be bounded by a constant (still much larger than $2$).

So bounded gaps between consecutive primes are known, but gap $2$ remains unproved infinitely often.`,
      },
      {
        id: "Erdős-4",
        title: "Sum of Reciprocals of Primes",
        topic: "Number Theory",
        difficulty: "Medium",
        status: "solved",
        summary: "Decide whether $\\sum_{p \\text{ prime}} \\frac{1}{p}$ converges or diverges.",
        question: `Let
$$S = \\sum_{p \\text{ prime}} \\frac{1}{p} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{5} + \\frac{1}{7} + \\cdots$$
Determine whether $S$ converges or diverges.`,
        answer: `**Answer:** the series **diverges**.

**Sketch (Euler-style idea):**
For primes $p$, compare with $\\log(1 - 1/p)^{-1}$ and use that
$$\\prod_{p \\leq x} \\left(1 - \\frac{1}{p}\\right)^{-1}$$
grows like a constant multiple of $x$ as $x \\to \\infty$. Taking logarithms shows the partial sum of $1/p$ grows without bound.`,
      },
      {
        id: "Erdős-5",
        title: "Perfect Square in Intervals",
        topic: "Combinatorics",
        difficulty: "Medium",
        status: "open",
        summary: "Can every long enough interval contain a perfect square?",
        question: `For integer $n \\geq 1$, let $I_n = [n^2, (n+1)^2]$. Determine whether there exists a constant $C$ such that for every integer $m$, the interval $[m, m+C]$ contains at least one perfect square $k^2$.`,
        answer: `This is a simplified illustrative open-style question for the bank.

**Heuristic:** consecutive squares satisfy $(n+1)^2 - n^2 = 2n+1$, so gaps between squares grow without bound. Therefore no fixed constant $C$ works for all $m$.

A formal proof can compare $m$ with nearby values of $n$ satisfying $n^2 \\leq m < (n+1)^2$ and analyze the distance to the next square.`,
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
