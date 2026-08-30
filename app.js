/**
 * 渲染与交互逻辑。正常情况下不需要改这个文件 —— 改内容请去 data.js。
 */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error("[portfolio] 未找到 data.js 中的 PORTFOLIO_DATA");
    return;
  }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** 转义用户数据，避免把内容当 HTML 解析 */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var KIND_LABEL = { work: "实习", project: "项目", opensource: "开源", education: "教育", research: "研究" };

  /* ── 主题 ──────────────────────────────────────────── */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = saved || (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);

    $(".theme-toggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ── 首屏文本 ──────────────────────────────────────── */
  function renderProfile() {
    var p = DATA.profile;
    var map = {
      brand: p.name,
      name: p.name,
      tagline: p.tagline,
      summary: p.summary,
      intro: p.intro,
      status: p.status,
      footer: "© " + new Date().getFullYear() + " " + p.name
    };
    Object.keys(map).forEach(function (key) {
      var el = $('[data-bind="' + key + '"]');
      if (el) el.textContent = map[key];
    });

    document.title = p.name + " · Agent 工程作品集";

    var jump = $('[data-bind="hero-jump"]');
    if (jump) {
      if (p.heroJump && p.heroJump.target) {
        $(".hero-jump-label", jump).textContent = p.heroJump.label;
        jump.setAttribute("href", "#entry-" + p.heroJump.target);
        jump.dataset.jump = p.heroJump.target;
      } else {
        jump.remove();
      }
    }
  }

  /* ── 成果卡片 ──────────────────────────────────────── */
  function renderProof() {
    var host = $('[data-render="proof"]');
    host.innerHTML = DATA.proof.map(function (item) {
      var tone = "var(--tone-" + (item.tone || "amber") + ")";
      return '<button class="proof-card" type="button" style="--tone:' + tone + '"' +
        (item.target ? ' data-open="' + esc(item.target) + '"' : "") + '>' +
        '<small>' + esc(item.label) + '</small>' +
        '<strong>' + esc(item.value) + '</strong>' +
        '<span class="proof-title">' + esc(item.title) + '</span>' +
        '<p>' + esc(item.note) + '</p>' +
        '</button>';
    }).join("");
  }

  /* ── 筛选 ──────────────────────────────────────────── */
  var activeFilter = "all";

  function renderFilters() {
    var host = $('[data-render="filters"]');
    host.innerHTML = DATA.filters.map(function (f) {
      return '<button class="filter-btn' + (f.id === activeFilter ? " is-active" : "") +
        '" type="button" role="tab" aria-selected="' + (f.id === activeFilter) +
        '" data-filter="' + esc(f.id) + '"' +
        (f.id === "all" ? "" : ' data-kind="' + esc(f.id) + '"') +
        '>' + esc(f.label) + '</button>';
    }).join("");

    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      $$(".filter-btn", host).forEach(function (b) {
        var on = b.dataset.filter === activeFilter;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      renderTimeline();
    });
  }

  /* ── 时间线 ────────────────────────────────────────── */
  function renderTimeline() {
    var host = $('[data-render="timeline"]');
    var empty = $('[data-render="empty"]');

    var items = DATA.timeline.filter(function (it) {
      return activeFilter === "all" || it.type === activeFilter;
    });

    empty.hidden = items.length > 0;

    host.innerHTML = items.map(function (it, i) {
      // 按可见顺序交替左右，而不是 :nth-child —— 筛选后条目数会变，
      // nth-child 的奇偶会错位，同一侧连排两张。
      var side = i % 2 === 0 ? "tl-left" : "tl-right";
      var hasDetail = !!(it.background || it.star ||
        (it.details && it.details.length) || (it.approach && it.approach.length));

      var metrics = (it.metrics || []).map(function (m) {
        return '<div class="tl-metric"><b>' + esc(m.value) + '</b><span>' + esc(m.label) + '</span></div>';
      }).join("");

      var tags = (it.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + '</span>';
      }).join("");

      return '<li class="tl-item reveal ' + side + '" id="entry-' + esc(it.id) + '"' +
        ' data-kind="' + esc(it.type) + '">' +
        '<button class="tl-card" type="button" data-static="' + (!hasDetail) + '"' +
          (hasDetail ? ' data-open="' + esc(it.id) + '"' : "") + '>' +
          '<div class="tl-meta">' +
            '<span class="tl-kind">' + esc(KIND_LABEL[it.type] || it.type) + '</span>' +
            '<span>' + esc(it.period) + '</span>' +
          '</div>' +
          '<h3>' + esc(it.title) + '</h3>' +
          '<p class="tl-org">' + esc(it.org) +
            (it.role ? ' <span class="tl-role">· ' + esc(it.role) + '</span>' : "") +
          '</p>' +
          (it.summary ? '<p class="tl-summary">' + esc(it.summary) + '</p>' : "") +
          (metrics ? '<div class="tl-metrics">' + metrics + '</div>' : "") +
          (tags ? '<div class="tl-tags">' + tags + '</div>' : "") +
          (hasDetail ? '<span class="tl-more">查看详细拆解 <span aria-hidden="true">→</span></span>' : "") +
        '</button>' +
      '</li>';
    }).join("");

    setupReveal();
  }

  /* ── 技能 / 荣誉 / 联系 ────────────────────────────── */
  /* 24×24 stroke 图标（Feather，MIT），内联避免额外请求 */
  var ICONS = {
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5.1 5.1 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5.1 5.1 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] + '</svg>';
  }

  function tone(t) { return "--tone: var(--tone-" + (t || "amber") + "); --tone-soft: var(--tone-" + (t || "amber") + "-soft)"; }

  function renderSkills() {
    $('[data-render="skills"]').innerHTML = DATA.skills.map(function (g, i) {
      return '<article class="skill-card reveal" style="' + tone(g.tone) + '">' +
        '<span class="skill-index" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</span>' +
        (g.kicker ? '<p class="skill-kicker">' + esc(g.kicker) + '</p>' : "") +
        '<h3>' + esc(g.title) + '</h3>' +
        '<ul class="skill-chips">' +
          g.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") +
        '</ul>' +
      '</article>';
    }).join("");
  }

  function renderAchievements() {
    $('[data-render="achievements"]').innerHTML = DATA.achievements.map(function (a) {
      return '<li class="honor-card reveal" style="' + tone(a.tone) + '">' +
        '<span class="honor-label">' + esc(a.label) + '</span>' +
        (a.value ? '<strong class="honor-value">' + esc(a.value) + '</strong>' : "") +
        '<p class="honor-text">' + esc(a.text) + '</p>' +
      '</li>';
    }).join("");
  }

  function renderContact() {
    var p = DATA.profile;
    var cards = [];
    if (p.email) cards.push({ icon: "mail", tone: "blue", tag: "Email", value: p.email, href: "mailto:" + p.email });
    if (p.phone) cards.push({ icon: "phone", tone: "teal", tag: "Phone", value: p.phone, href: "tel:+86" + p.phone });
    if (p.github) cards.push({ icon: "github", tone: "violet", tag: "GitHub", value: p.github.replace(/^https?:\/\//, ""), href: p.github });
    if (p.location) cards.push({ icon: "pin", tone: "coral", tag: "Location", value: p.location, href: null });

    $('[data-render="contact"]').innerHTML = cards.map(function (c) {
      var inner =
        '<span class="contact-icon">' + icon(c.icon) + '</span>' +
        '<span class="contact-body">' +
          '<small>' + esc(c.tag) + '</small>' +
          '<span class="contact-value">' + esc(c.value) + '</span>' +
        '</span>' +
        (c.href ? '<span class="contact-arrow" aria-hidden="true">↗</span>' : "");
      var attrs = 'class="contact-card reveal" style="' + tone(c.tone) + '"';
      return c.href
        ? '<a ' + attrs + ' href="' + esc(c.href) + '"' +
            (c.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + '>' + inner + '</a>'
        : '<div ' + attrs + '>' + inner + '</div>';
    }).join("");
  }

  /* ── 详情弹窗 ──────────────────────────────────────── */
  var modal = $("#modal");
  var modalBody = $("#modal-body");
  var lastFocused = null;

  /** 详情弹窗里的一个小节，内容为空就整节不渲染 */
  function section(title, html) {
    if (!html) return "";
    return '<section class="detail-section">' +
      '<h4>' + esc(title) + '</h4>' + html +
      '</section>';
  }

  function bulletList(arr) {
    if (!arr || !arr.length) return "";
    return '<ul class="detail-bullets">' + arr.map(function (t) {
      return "<li>" + esc(t) + "</li>";
    }).join("") + "</ul>";
  }

  function openModal(id) {
    var item = DATA.timeline.filter(function (t) { return t.id === id; })[0];
    if (!item) return;

    lastFocused = document.activeElement;

    var metrics = (item.metrics || []).map(function (m) {
      return '<div class="detail-metric"><b>' + esc(m.value) + '</b><span>' + esc(m.label) + '</span></div>';
    }).join("");

    var flow = (item.flow || []).map(function (f, i) {
      return '<div class="flow-step">' +
        '<span class="flow-num">' + String(i + 1).padStart(2, "0") + '</span>' +
        '<b>' + esc(f.title) + '</b><span class="flow-text">' + esc(f.text) + '</span>' +
        '</div>';
    }).join("");

    // details 是 { heading, text } 结构，比纯字符串更好读，所以单独渲染
    var contributions = (item.details || []).map(function (d, i) {
      return '<div class="detail-block">' +
        '<span class="detail-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</span>' +
        '<h5>' + esc(d.heading) + '</h5><p>' + esc(d.text) + '</p>' +
        '</div>';
    }).join("");

    var star = "";
    if (item.star) {
      var STAR_LABEL = { S: "情境 Situation", T: "任务 Task", A: "行动 Action", R: "结果 Result" };
      star = '<div class="star-grid">' + ["S", "T", "A", "R"].filter(function (k) {
        return item.star[k];
      }).map(function (k) {
        return '<div class="star-cell"><b>' + k + '</b>' +
          '<small>' + esc(STAR_LABEL[k]) + '</small>' +
          '<p>' + esc(item.star[k]) + '</p></div>';
      }).join("") + '</div>';
    }

    modalBody.innerHTML =
      '<header class="detail-header">' +
        '<div class="tl-meta">' +
          '<span class="tl-kind">' + esc(KIND_LABEL[item.type] || item.type) + '</span>' +
          '<span>' + esc(item.period) + '</span>' +
        '</div>' +
        '<h3 id="modal-title">' + esc(item.title) + '</h3>' +
        '<p class="tl-org">' + esc(item.org) + (item.role ? ' · ' + esc(item.role) : "") + '</p>' +
        (item.summary ? '<p class="detail-lead">' + esc(item.summary) + '</p>' : "") +
        (item.link ? '<a class="modal-link" href="' + esc(item.link.href) + '" target="_blank" rel="noopener">' +
          esc(item.link.label) + ' ↗</a>' : "") +
      '</header>' +
      (metrics ? '<div class="detail-metrics">' + metrics + '</div>' : "") +
      section("问题背景", item.background ? '<p>' + esc(item.background) + '</p>' : "") +
      section("实现链路", flow ? '<div class="flow-row">' + flow + '</div>' : "") +
      section("我的贡献", contributions) +
      section("关键设计", bulletList(item.approach)) +
      section("STAR 拆解", star) +
      section("取舍", item.tradeoff ? '<p class="detail-tradeoff">' + esc(item.tradeoff) + '</p>' : "");

    modal.setAttribute("data-kind", item.type);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalBody.parentNode.scrollTop = 0;
    $(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  /**
   * 首屏按钮跳到时间线上某一条。
   * 必须先把筛选复位成「全部」—— 否则当前筛选下目标条目可能根本没渲染出来，
   * 锚点会落空、页面纹丝不动。
   */
  function jumpToEntry(id) {
    if (activeFilter !== "all") {
      activeFilter = "all";
      $$(".filter-btn").forEach(function (b) {
        var on = b.dataset.filter === "all";
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      renderTimeline();
    }
    var target = document.getElementById("entry-" + id);
    if (!target) return;
    target.classList.add("is-in");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.remove("is-target");
    void target.offsetWidth;            // 强制回流，让动画能重复触发
    target.classList.add("is-target");
    setTimeout(function () { target.classList.remove("is-target"); }, 1800);
  }

  document.addEventListener("click", function (e) {
    var jumper = e.target.closest("[data-jump]");
    if (jumper) { e.preventDefault(); jumpToEntry(jumper.dataset.jump); return; }

    var opener = e.target.closest("[data-open]");
    if (opener) { openModal(opener.dataset.open); return; }
    if (e.target.closest("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ── 滚动：导航高亮 + 入场动画 ─────────────────────── */
  function initScrollSpy() {
    var header = $(".site-header");
    var links = $$(".nav-links a");
    var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);

    function onScroll() {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      var pos = window.scrollY + 140;
      var current = null;
      sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
      });
      refreshReveal();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /**
   * 入场动画。
   *
   * 单靠 IntersectionObserver 或 scroll 事件都不保险：页面被后台化 / 渲染进程被
   * 节流时两者都可能永远不回调，那样所有内容会永久停在 opacity:0 —— 对一个给别人
   * 看的作品集来说这是最糟的失败方式。所以这里三重保险：
   *   1. IntersectionObserver —— 主路径，不依赖滚动事件
   *   2. scroll / resize / load 上的几何判断 —— IO 失效时兜底
   *   3. 页面不可见时直接全部显示 —— 前两者都不跑时，宁可不要动画也要有内容
   */
  var revealIO = null;

  function revealAll() {
    $$(".reveal:not(.is-in)").forEach(function (el) { el.classList.add("is-in"); });
  }

  function refreshReveal() {
    if (document.visibilityState === "hidden") { revealAll(); return; }
    var vh = window.innerHeight || document.documentElement.clientHeight;
    $$(".reveal:not(.is-in)").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.94 && rect.bottom > 0) el.classList.add("is-in");
    });
  }

  function setupReveal() {
    if ("IntersectionObserver" in window) {
      if (!revealIO) {
        revealIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealIO.unobserve(entry.target);
            }
          });
        }, { rootMargin: "0px 0px -6% 0px", threshold: 0.02 });
      }
      $$(".reveal:not(.is-in)").forEach(function (el) { revealIO.observe(el); });
    }
    refreshReveal();
  }

  /* ── 启动 ──────────────────────────────────────────── */
  initTheme();
  renderProfile();
  renderProof();
  renderFilters();
  renderTimeline();
  renderSkills();
  renderAchievements();
  renderContact();
  initScrollSpy();
  setupReveal();
  window.addEventListener("resize", refreshReveal, { passive: true });
  window.addEventListener("load", refreshReveal);
  document.addEventListener("visibilitychange", refreshReveal);
})();
