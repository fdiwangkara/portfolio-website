<template>
  <section class="hero" ref="heroRef">
    <div class="hero-inner section-container">
      <!-- Top double rule -->
      <div class="hero-rule hero-rule--double" ref="topRuleRef"></div>

      <!-- Masthead name — NYT style -->
      <div class="hero-masthead" ref="mastheadRef">
        <h1 class="hero-name" v-html="styledName"></h1>
      </div>

      <!-- Thin rule under name -->
      <div class="hero-rule hero-rule--thin" ref="midRuleRef"></div>

      <!-- Three-column editorial content -->
      <div class="hero-columns" ref="columnsRef">
        <!-- Left: Date & tagline -->
        <div class="hero-col hero-col--left">
          <span class="hero-date">{{ formattedDate }}</span>
          <h2 class="hero-tagline">{{ hero.tagline }}</h2>
        </div>

        <!-- Center: Drop-cap lead paragraph -->
        <div class="hero-col hero-col--center">
          <p class="hero-lead">
            A creative developer building digital experiences at the
            intersection of design and technology—crafting interfaces that
            inform, delight, and endure.
          </p>
        </div>

        <!-- Right: Socials & CTA -->
        <div class="hero-col hero-col--right">
          <div class="hero-socials">
            <a
              v-for="(social, i) in hero.socials"
              :key="i"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <svg
                class="social-icon"
                viewBox="0 0 24 24"
                v-html="getSocialIcon(social.icon)"
              ></svg>
            </a>
          </div>
          <button class="read-more-cta" @click="scrollToProjects">
            Read more ↓
          </button>
        </div>
      </div>

      <!-- Bottom heavy rule -->
      <div class="hero-rule hero-rule--heavy" ref="btmRuleRef"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useContentStore } from "../stores/content";
import gsap from "gsap";

const store = useContentStore();
const hero = computed(() => store.hero);

const styledName = computed(() => {
  const name = hero.value.name || "";
  // Wrap each word's first letter in a span for Blackletter styling
  return name
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      const first = word[0];
      const rest = word.slice(1);
      return `<span class="initial">${first}</span>${rest}`;
    })
    .join(" ");
});

const heroRef = ref(null);
const topRuleRef = ref(null);
const mastheadRef = ref(null);
const midRuleRef = ref(null);
const columnsRef = ref(null);
const btmRuleRef = ref(null);

const formattedDate = computed(() => {
  const d = new Date();
  return d
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
});

function getSocialIcon(icon) {
  const icons = {
    github:
      '<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>',
    linkedin:
      '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>',
    instagram:
      '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>',
    twitter:
      '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>',
  };
  return icons[icon] || "";
}

function scrollToProjects() {
  const el = document.getElementById("projects");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set([topRuleRef.value, midRuleRef.value, btmRuleRef.value], {
      scaleX: 0,
      transformOrigin: "center",
    });
    gsap.set(mastheadRef.value, { opacity: 0 });
    gsap.set(columnsRef.value, { opacity: 0, y: 18 });

    tl.to(topRuleRef.value, { scaleX: 1, duration: 0.7, ease: "power2.inOut" })
      .to(mastheadRef.value, { opacity: 1, duration: 0.6 }, "-=0.3")
      .to(
        midRuleRef.value,
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.2",
      )
      .to(columnsRef.value, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
      .to(
        btmRuleRef.value,
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.2",
      );
  }, 200);
});
</script>

<style scoped>
/* ---- Hero as compact header, NOT full screen ---- */
.hero {
  padding-top: var(--space-xl);
}

/* ---- Rules ---- */
.hero-rule--double {
  height: 5px;
  border-top: 2px solid var(--color-text);
  border-bottom: 1px solid var(--color-text);
}

.hero-rule--thin {
  height: 1px;
  background: var(--color-border);
}

.hero-rule--heavy {
  height: 2px;
  background: var(--color-text);
}

/* ---- Masthead — Blackletter like NYT ---- */
.hero-masthead {
  text-align: center;
  padding: var(--space-lg) 0;
}

.hero-name {
  font-family: var(--font-headline);
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 900;
  line-height: 1.15;
  color: var(--color-text);
  letter-spacing: 0.03em;
}

.hero-name :deep(.initial) {
  font-family: var(--font-logo);
  font-size: 1.5em;
  font-weight: 400;
  line-height: 1;
  vertical-align: baseline;
  margin-right: -0.02em;
}

/* ---- Three-column layout ---- */
.hero-columns {
  display: grid;
  grid-template-columns: 1fr 1.6fr 1fr;
  padding: var(--space-lg) 0;
}

.hero-col {
  padding: 0 var(--space-xl);
}

.hero-col--left {
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.hero-col--center {
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

.hero-col--right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 0;
}

/* Left column */
.hero-date {
  font-family: var(--font-body);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
  font-weight: 600;
}

.hero-tagline {
  font-family: var(--font-headline);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  margin-top: var(--space-xs);
}

/* Center column — drop cap */
.hero-lead {
  font-family: var(--font-accent);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  text-align: justify;
}

.hero-lead::first-letter {
  font-family: var(--font-headline);
  font-size: 3.6rem;
  float: left;
  line-height: 0.8;
  color: var(--color-red, #a1252b);
  margin-right: 8px;
  margin-top: 4px;
  font-weight: 700;
}

/* Right column */
.hero-socials {
  display: flex;
  gap: var(--space-sm);
}

.social-link {
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all 0.25s ease;
}

.social-link:hover {
  color: var(--color-text);
  border-color: var(--color-text);
}

.social-icon {
  width: 15px;
  height: 15px;
}

.read-more-cta {
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-accent);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.read-more-cta:hover {
  opacity: 0.7;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .hero-columns {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .hero-col {
    padding: 0;
  }

  .hero-col--center {
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-lg) 0;
  }

  .hero-col--right {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .hero-tagline {
    font-size: 1.1rem;
  }

  .hero-lead {
    font-size: 0.9rem;
  }

  .hero-lead::first-letter {
    font-size: 2.8rem;
  }
}
</style>
