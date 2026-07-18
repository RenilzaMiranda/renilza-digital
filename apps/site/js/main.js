(function () {
  "use strict";

  var STORAGE_KEY = "renilza_site_lang";
  var SUPPORTED = ["pt", "en"];

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var nav = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "pt"];

    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).toLowerCase();
      if (code.indexOf("pt") === 0) return "pt";
      if (code.indexOf("en") === 0) return "en";
    }
    return "pt";
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "pt";
    var blockPt = document.getElementById("block-pt");
    var blockEn = document.getElementById("block-en");
    if (lang === "pt") {
      blockPt.hidden = false;
      blockEn.hidden = true;
    } else {
      blockPt.hidden = true;
      blockEn.hidden = false;
    }
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLangToggle() {
    document.querySelectorAll("[data-setlang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-setlang"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    setLang(detectLang());
  }

  function encodeForm(formEl) {
    var data = new FormData(formEl);
    var pairs = [];
    data.forEach(function (value, key) {
      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    });
    return pairs.join("&");
  }

  function initForms() {
    document.querySelectorAll(".apply-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector("button[type=submit]");
        var note = form.querySelector(".form-note");
        var success = form.querySelector(".form-success");

        if (submitBtn) { submitBtn.disabled = true; }

        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeForm(form)
        })
          .then(function () {
            Array.prototype.forEach.call(form.elements, function (el) {
              if (el.type !== "hidden") el.style.display = "none";
            });
            if (note) note.hidden = true;
            if (success) success.hidden = false;
          })
          .catch(function (err) {
            console.error("Form submission failed", err);
            if (submitBtn) { submitBtn.disabled = false; }
            alert("Não foi possível enviar agora. Tente novamente em instantes ou chame no WhatsApp / Instagram.");
          });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangToggle();
    initForms();
  });
})();
