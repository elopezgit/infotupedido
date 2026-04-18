window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  if (!splash) return;

  setTimeout(() => {
    splash.classList.add("splash-out");

    setTimeout(() => {
      splash.style.display = "none";
    }, 1000);
  }, 1800);
});