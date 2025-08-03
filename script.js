document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles.js
  const particleConfig = {
    particles: {
      number: { value: window.innerWidth <= 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
      color: { value: "#FFD700" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: { enable: true, speed: 2, random: true }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  };

  // Fallback if particles.js fails to load
  if (typeof particlesJS === "undefined") {
    console.error("particles.js failed to load");
    document.getElementById("particles-js").style.background = "linear-gradient(45deg, #1a1a1a, #000)";
  } else {
    particlesJS("particles-js", particleConfig);
  }

  // Hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const dropdown = document.querySelector(".dropdown");

  hamburger.addEventListener("click", () => {
    const isExpanded = navLinks.classList.toggle("active");
    navLinks.style.display = isExpanded ? "flex" : "none";
    hamburger.setAttribute("aria-expanded", isExpanded);
    navLinks.setAttribute("aria-hidden", !isExpanded);
  });

  // Dropdown toggle on mobile
  dropdown.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const isExpanded = dropdown.classList.toggle("active");
      dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", isExpanded);
    }
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        navLinks.style.display = "none";
        hamburger.setAttribute("aria-expanded", false);
        navLinks.setAttribute("aria-hidden", true);
        dropdown.classList.remove("active");
        dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", false);
      }
    });
  });

  // Set footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});