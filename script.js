"use strict";

// ---------------------------------------------------------------------------
// Theme toggle, persisted in localStorage
// ---------------------------------------------------------------------------
(function initTheme() {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var stored = null;

  try {
    stored = localStorage.getItem("theme");
  } catch (err) {
    stored = null; // private mode or storage disabled
  }

  var prefersLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = stored || (prefersLight ? "light" : "dark");

  applyTheme(theme);

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next, true);
  });

  function applyTheme(next, save) {
    var isDark = next === "dark";
    root.setAttribute("data-theme", next);
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    if (save) {
      try {
        localStorage.setItem("theme", next);
      } catch (err) {
        // storage unavailable: the theme still applies for this session
      }
    }
  }
})();

// ---------------------------------------------------------------------------
// Counter demo
// ---------------------------------------------------------------------------
(function initCounter() {
  var button = document.getElementById("demoBtn");
  var output = document.getElementById("count");
  var count = 0;

  button.addEventListener("click", function () {
    count += 1;
    output.textContent = String(count);
  });
})();

// ---------------------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------------------
document.getElementById("year").textContent = String(new Date().getFullYear());

// ---------------------------------------------------------------------------
// Contact form: validate in the browser, then show a confirmation
// ---------------------------------------------------------------------------
(function initForm() {
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var rules = {
    name: function (value) {
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "That name looks a little short.";
      return "";
    },
    email: function (value) {
      if (!value) return "Please enter your email address.";
      if (!emailPattern.test(value)) return "That doesn't look like a valid email.";
      return "";
    },
    message: function (value) {
      if (!value) return "Please write a message.";
      if (value.length < 10) return "A little more detail, please (10+ characters).";
      return "";
    }
  };

  Object.keys(rules).forEach(function (key) {
    var input = form.elements[key];

    input.addEventListener("blur", function () {
      validateField(key, input.value.trim());
    });

    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("is-invalid")) {
        validateField(key, input.value.trim());
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    var data = {};

    Object.keys(rules).forEach(function (key) {
      var value = form.elements[key].value.trim();
      data[key] = value;
      if (!validateField(key, value) && !firstInvalid) {
        firstInvalid = form.elements[key];
      }
    });

    if (firstInvalid) {
      status.textContent = "Please fix the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    // No backend yet. Swap this for fetch("/api/contact", { ... }) when you have one.
    console.log("Form submitted:", data);
    status.textContent =
      "Thanks, " + data.name.split(" ")[0] + "! Your message is ready to send.";
    form.reset();
  });

  function validateField(key, value) {
    var input = form.elements[key];
    var message = rules[key](value);
    var field = input.closest(".field");
    var errorEl = field.querySelector("[data-error-for]");

    field.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    errorEl.textContent = message;

    return message === "";
  }
})();
