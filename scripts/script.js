document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".naver");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Hamburger menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Handle dropdowns for mobile only
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".dropdown-toggle");

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle("active");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
      if (window.innerWidth <= 768) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
      //   nav.classList.remove("active");
      //   hamburger.classList.remove("active");
    }
  });
});

// // slider...............................................
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".team-container");
  const cards = document.querySelectorAll(".team-card-container");

  // Add navigation buttons
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  prevBtn.className = "slider-nav prev";
  nextBtn.className = "slider-nav next";
  sliderWrapper.appendChild(prevBtn);
  sliderWrapper.appendChild(nextBtn);

  // Add scroll indicators
  const indicators = document.createElement("div");
  indicators.className = "scroll-indicators";
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "scroll-indicator";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => scrollToCard(index));
    indicators.appendChild(dot);
  });
  sliderWrapper.appendChild(indicators);

  // Navigation functions
  function scrollToCard(index) {
    const card = cards[index];
    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
    updateIndicators(index);
  }

  function updateIndicators(activeIndex) {
    document.querySelectorAll(".scroll-indicator").forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    const scrollAmount = container.scrollLeft;
    const cardWidth = cards[0].offsetWidth;
    const prevScrollPosition = scrollAmount - cardWidth - 16; // 16 is the gap
    container.scrollTo({
      left: prevScrollPosition,
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", () => {
    const scrollAmount = container.scrollLeft;
    const cardWidth = cards[0].offsetWidth;
    const nextScrollPosition = scrollAmount + cardWidth + 16; // 16 is the gap
    container.scrollTo({
      left: nextScrollPosition,
      behavior: "smooth",
    });
  });

  // Update indicators on scroll
  let debounceTimer;
  container.addEventListener("scroll", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = cards[0].offsetWidth;
      const activeIndex = Math.round(scrollPosition / cardWidth);
      updateIndicators(activeIndex);
    }, 100);
  });
});
