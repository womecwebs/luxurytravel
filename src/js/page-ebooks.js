console.log("page-ebooks.js loaded");

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
    console.error("Missing ebook slug");
    return;
  }

  // Store slug
  localStorage.setItem("leadEbook", slug);
  console.log("Stored ebook slug:", slug);

  // Redirect to Beehiiv (FULL PAGE)
  const redirectUrl =
    "https://paradize.life/.netlify/functions/download?ebook=" +
    encodeURIComponent(slug);

  const beehiivUrl =
    "https://subscribe-forms.beehiiv.com/3b7a92f9-e06c-41c9-a6db-0868df2b13ef" +
    "?redirect_url=" +
    encodeURIComponent(redirectUrl);

  window.location.href = beehiivUrl;
});
