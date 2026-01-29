document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Not More Expensive.",
    "With Better Timing.",
    "With Real Strategy.",
    "Without Guesswork.",
  ];

  const el = document.querySelector(".pop-text");
  if (!el) return;

  let i = 0;

  setInterval(() => {
    el.classList.remove("pop-text");
    void el.offsetWidth; // restart animation
    el.textContent = phrases[(i = (i + 1) % phrases.length)];
    el.classList.add("pop-text");
  }, 4000);
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-lead]");
  if (!btn) return;

  const slug = btn.dataset.ebook;

  if (!slug) {
    console.warn("No ebook slug found on button");
    return;
  }

  // Store slug for Beehiiv → redirect
  localStorage.setItem("leadEbook", slug);

  // Debug confirmation
  console.log("Stored ebook slug:", slug);
});
