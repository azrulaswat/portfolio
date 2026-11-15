(function () {
  "use strict";

  /* Theme toggle, email copy, PDF download */
  function ui() {
    var sv = document.querySelector(".scope svg");
    if (sv && sv.pauseAnimations && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) sv.pauseAnimations();
    var root = document.documentElement, btn = document.getElementById("tgl");
    try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}

    var toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.style.cssText = "position:fixed;left:50%;bottom:calc(1.5rem + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:.7rem 1.2rem;border-radius:.6rem;font-weight:600;z-index:20;display:none;max-width:90vw;text-align:center;overflow-wrap:anywhere";
    document.body.appendChild(toast);
    function say(s) { toast.textContent = s; toast.style.display = "block"; setTimeout(function () { toast.style.display = "none"; }, 3500); }

    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.addEventListener("click", function () {
        var m = a.getAttribute("href").slice(7);
        try {
          navigator.clipboard.writeText(m).then(function () { say("Email address copied: " + m); }, function () { say("Email: " + m); });
        } catch (e) { say("Email: " + m); }
      });
    });

    document.querySelectorAll(".pdfdl").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (!(window.claude && window.claude.use)) return; /* normal download link when self-hosted */
        e.preventDefault();
        window.claude.use("downloads").then(function (d) {
          if (!d || !window.PDF_B64) { say("PDF download is not available in this view."); return; }
          var b = atob(window.PDF_B64), u = new Uint8Array(b.length);
          for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
          return d.save({ filename: "Azrul_Aswat_Portfolio.pdf", data: new Blob([u], { type: "application/pdf" }) });
        }).catch(function (err) { if (!err || err.code !== "declined") say("Could not save the PDF."); });
      });
    });

    if (btn) btn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
      var n = dark ? "light" : "dark";
      root.setAttribute("data-theme", n);
      try { localStorage.setItem("theme", n); } catch (e) {}
    });
  }

  function init() {
    try { ui(); } catch (e) { if (window.console) console.error("ui:", e); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
