/* =========================================================
   CG Asesores Contables y Tributarios — Interacciones
   Sin dependencias externas. Funciona en GitHub Pages.
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CG_CONFIG || {
    whatsapp: "573144288780",
    email: "camilagranadoscontadora@gmail.com",
    mensajes: {}
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function waUrl(text) {
    return "https://wa.me/" + CFG.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  /* ---------- Año del pie de página ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Enlaces de WhatsApp con mensaje predeterminado ---------- */
  $all("[data-wa]").forEach(function (a) {
    var key = a.getAttribute("data-wa");
    var service = a.getAttribute("data-service") || "";
    var tpl = (CFG.mensajes && CFG.mensajes[key]) || CFG.mensajes.asesoria || "";
    a.href = waUrl(tpl.replace("{servicio}", service));
  });

  /* ---------- Encabezado: sombra al desplazar ---------- */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = $(".menu-toggle");
  var nav = $("#menu-principal");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });

  /* ---------- Vistas independientes (navegación por secciones) ----------
     Cada opción del menú muestra solo su sección. La dirección cambia a
     #nuestra-firma, #servicios, etc., así que los enlaces se pueden
     compartir y los botones Atrás/Adelante del navegador funcionan. */
  var navLinks = $all("[data-nav]");
  var views = $all("[data-view]");
  var currentView = null;
  var baseTitle = "CG Asesores Contables y Tributarios";
  var viewTitles = {
    "inicio": baseTitle + " | Camila Granados, Contadora Pública",
    "nuestra-firma": "Nuestra firma | " + baseTitle,
    "que-hacemos": "Qué hacemos | " + baseTitle,
    "servicios": "Servicios | " + baseTitle,
    "contactanos": "Contáctanos | " + baseTitle
  };

  function setActive(id) {
    navLinks.forEach(function (l) {
      if (l.getAttribute("data-nav") === id) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
  }

  function viewFor(hash) {
    var id = (hash || "").replace(/^#/, "");
    if (!id) return { view: views[0], target: null };
    var el = document.getElementById(id);
    if (!el) return { view: views[0], target: null };
    if (el.hasAttribute("data-view")) return { view: el, target: null };
    var parent = el.closest("[data-view]");
    return { view: parent || views[0], target: parent ? el : null };
  }

  function showView(hash, opts) {
    opts = opts || {};
    var r = viewFor(hash);
    var changed = r.view !== currentView;
    views.forEach(function (v) { v.hidden = v !== r.view; });
    if (changed && !opts.initial && !reduceMotion) {
      r.view.classList.remove("is-entering"); void r.view.offsetWidth; r.view.classList.add("is-entering");
    }
    currentView = r.view;
    setActive(r.view.id);
    document.title = viewTitles[r.view.id] || baseTitle;

    // Video de fondo: solo se reproduce cuando Inicio está visible
    if (video) {
      if (r.view.id === "inicio" && !userPaused) { var pp = video.play(); if (pp && pp.catch) pp.catch(function () {}); }
      else if (r.view.id !== "inicio" && !video.paused) video.pause();
    }

    if (r.target) {
      requestAnimationFrame(function () { r.target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); });
      if (r.target.classList.contains("what-card")) {
        r.target.classList.add("is-highlight");
        setTimeout(function () { r.target.classList.remove("is-highlight"); }, 2200);
      }
    } else if (!opts.initial) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    if (!opts.initial && changed) {
      var h = $("h1, h2", r.view);
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
  }

  // Enlaces internos (#seccion): cambian de vista
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains("skip-link")) return;
    var hash = a.getAttribute("href");
    if (hash.length < 2) return;
    e.preventDefault();
    if (location.hash === hash) showView(hash);
    else history.pushState(null, "", hash), showView(hash);
  });
  window.addEventListener("popstate", function () { showView(location.hash); });
  window.addEventListener("hashchange", function () { showView(location.hash); });

  /* ---------- Video introductorio ---------- */
  var video = $("#intro-video");
  var fallback = $(".video-fallback");
  var btnPlay = $("#vc-play");
  var btnSound = $("#vc-sound");
  var userPaused = false;

  function showFallback() {
    if (!video) return;
    video.hidden = true;
    fallback.hidden = false;
    $(".video-controls").hidden = true;
  }
  function syncPlay() {
    var paused = video.paused;
    btnPlay.classList.toggle("is-paused", paused);
    btnPlay.setAttribute("aria-label", paused ? "Reproducir video" : "Pausar video");
  }

  if (video) {
    var source = $("source", video);
    if (source) source.addEventListener("error", showFallback);
    video.addEventListener("error", showFallback);
    video.addEventListener("play", syncPlay);
    video.addEventListener("pause", syncPlay);

    if (reduceMotion) {
      userPaused = true;
      syncPlay();
    } else {
      var p = video.play();
      if (p && p.catch) p.catch(function () { syncPlay(); });
    }

    btnPlay.addEventListener("click", function () {
      if (video.paused) { userPaused = false; video.play(); }
      else { userPaused = true; video.pause(); }
    });

    btnSound.addEventListener("click", function () {
      var on = video.muted;
      video.muted = !on;
      btnSound.setAttribute("aria-pressed", on ? "true" : "false");
      btnSound.setAttribute("aria-label", on ? "Silenciar video" : "Activar sonido");
      if (on && video.paused) { userPaused = false; video.play(); }
    });

    // Pausa automática fuera de pantalla (ahorra batería y datos)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting && !video.paused) video.pause();
          else if (en.isIntersecting && video.paused && !userPaused) {
            var pp = video.play(); if (pp && pp.catch) pp.catch(function () {});
          }
        });
      }, { threshold: 0.2 }).observe(video);
    }
    syncPlay();
  }

  // Mostrar la vista inicial según la dirección (después de preparar el video)
  showView(location.hash, { initial: true });
  if (location.hash && viewFor(location.hash).view.id !== "inicio") window.scrollTo(0, 0);

  /* ---------- Ventanas modales ---------- */
  var lastTrigger = null;
  function openModal(id, trigger) {
    var dlg = document.getElementById(id);
    if (!dlg) return;
    lastTrigger = trigger || null;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    document.body.classList.add("modal-open");
    var closeBtn = $(".modal-close", dlg);
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  }
  $all("[data-open]").forEach(function (b) {
    b.addEventListener("click", function () { openModal(b.getAttribute("data-open"), b); });
  });
  $all("dialog.modal").forEach(function (dlg) {
    dlg.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    });
    // Cerrar al hacer clic fuera del contenido
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeModal(dlg); });
    $all("[data-close]", dlg).forEach(function (c) {
      c.addEventListener("click", function () { lastTrigger = null; closeModal(dlg); });
    });
  });

  /* ---------- Filtros del catálogo de servicios ---------- */
  var chips = $all(".chip");
  var cards = $all(".svc");
  var status = $("#filter-status");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(" ");
        var show = f === "todos" || cats.indexOf(f) !== -1;
        card.hidden = !show;
        card.classList.remove("is-entering");
        if (show) {
          shown++;
          if (!reduceMotion) { void card.offsetWidth; card.classList.add("is-entering"); }
        }
      });
      if (status) status.textContent = shown + (shown === 1 ? " servicio visible" : " servicios visibles");
    });
  });

  /* ---------- Cotizar: precarga el servicio en el formulario ---------- */
  var form = $("#contact-form");
  var selService = $("#f-servicio");
  function preselect(name) {
    if (!selService || !name) return;
    var n = name.toLowerCase();
    var opts = Array.prototype.slice.call(selService.options);
    var match = opts.filter(function (o) { return o.text.toLowerCase() === n; })[0] ||
                opts.filter(function (o) { return o.value && n.indexOf(o.text.toLowerCase().split(" ")[0]) === 0; })[0];
    if (match) {
      selService.value = match.value || match.text;
      selService.dispatchEvent(new Event("change"));
    }
  }
  $all("[data-quote]").forEach(function (a) {
    a.addEventListener("click", function () {
      preselect(a.getAttribute("data-quote"));
      setTimeout(function () { var n = $("#f-nombre"); if (n) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 650);
    });
  });

  /* ---------- Formulario de contacto ---------- */
  if (form) {
    var msg = $("#f-mensaje");
    var count = $("#f-count");
    var formStatus = $("#form-status");
    var via = "whatsapp";

    msg.addEventListener("input", function () { count.textContent = String(msg.value.length); });
    $all("button[type=submit]", form).forEach(function (b) {
      b.addEventListener("click", function () { via = b.getAttribute("data-via"); });
    });

    function clean(v, max) {
      return String(v || "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .replace(/[<>]/g, "")
        .replace(/[ \t]+/g, " ")
        .trim()
        .slice(0, max);
    }
    function setError(id, text) {
      var el = $("#e-" + id);
      var field = el ? el.closest(".field") : null;
      if (el) el.textContent = text || "";
      if (field) field.classList.toggle("has-error", !!text);
      var input = $("#f-" + id);
      if (input) {
        if (text) { input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", "e-" + id); }
        else { input.removeAttribute("aria-invalid"); input.removeAttribute("aria-describedby"); }
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (e.submitter && e.submitter.getAttribute("data-via")) via = e.submitter.getAttribute("data-via");

      // Campo trampa: si un bot lo llena, se descarta en silencio
      if ($("#f-web").value) return;

      var data = {
        nombre: clean(form.nombre.value, 90),
        email: clean(form.email.value, 120).toLowerCase(),
        telefono: clean(form.telefono.value, 20),
        tipo: clean(form.tipo.value, 60),
        ciudad: clean(form.ciudad.value, 60),
        servicio: clean(form.servicio.value, 90),
        mensaje: clean(form.mensaje.value, 800),
        datos: form.datos.checked
      };

      var ok = true, first = null;
      function check(id, cond, text) {
        if (!cond) { setError(id, text); ok = false; if (!first) first = id; }
        else setError(id, "");
      }
      check("nombre", data.nombre.length >= 3, "Escribe tu nombre o la razón social.");
      check("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email), "Escribe un correo válido, por ejemplo nombre@correo.com.");
      var digits = data.telefono.replace(/\D/g, "");
      check("telefono", /^[+\d\s().-]+$/.test(data.telefono) && digits.length >= 7 && digits.length <= 15, "Escribe un teléfono válido (solo números, mínimo 7 dígitos).");
      check("tipo", !!data.tipo, "Selecciona el tipo de cliente.");
      check("servicio", !!data.servicio, "Selecciona el servicio que te interesa.");
      check("mensaje", data.mensaje.length >= 10, "Cuéntanos tu necesidad en al menos 10 caracteres.");
      check("datos", data.datos, "Necesitamos tu autorización para atender la solicitud.");

      if (!ok) {
        formStatus.textContent = "Revisa los campos marcados.";
        formStatus.classList.add("is-error");
        var f = $("#f-" + first); if (f) f.focus();
        return;
      }

      var lines = [
        "Hola, CG Asesores. Solicito una cotización.",
        "",
        "• Nombre: " + data.nombre,
        "• Correo: " + data.email,
        "• Teléfono: " + data.telefono,
        "• Tipo de cliente: " + data.tipo
      ];
      if (data.ciudad) lines.push("• Ciudad: " + data.ciudad);
      lines.push("• Servicio: " + data.servicio, "", "Necesidad: " + data.mensaje, "", "Autorizo el tratamiento de mis datos para atender esta solicitud.");
      var text = lines.join("\n");

      if (via === "email") {
        var subject = "Solicitud de cotización – " + data.servicio;
        window.location.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
        formStatus.textContent = "Abrimos tu aplicación de correo con el mensaje listo. Revísalo y pulsa Enviar. Si no se abrió, escríbenos a " + CFG.email + ".";
      } else {
        var w = window.open(waUrl(text), "_blank");
        if (w) w.opener = null;
        else window.location.href = waUrl(text);
        formStatus.textContent = "Abrimos WhatsApp con tu mensaje listo. Revísalo y pulsa Enviar para completar la solicitud.";
      }
      formStatus.classList.remove("is-error");
    });
  }
})();
