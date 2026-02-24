<template>
  <section id="experience" class="exp-section">
    <div class="section-container">
      <div class="section-header" ref="headerRef">
        <h2>Experience</h2>
        <span class="header-rule"></span>
      </div>
      <div class="exp-timeline" ref="timelineRef">
        <div class="exp-line" ref="lineRef"></div>
        <div
          v-for="(exp, i) in experiences"
          :key="exp.id"
          class="exp-entry"
          :class="{ 'exp-entry--right': i % 2 !== 0 }"
        >
          <div class="exp-dot"></div>
          <div class="exp-card">
            <div class="exp-card-accent" :class="exp.type === 'Full-time' ? 'accent-dark' : 'accent-gold'"></div>
            <div class="exp-card-top">
              <div class="exp-logo-wrap" v-if="!exp.logo">
                {{ exp.company.charAt(0) }}
              </div>
              <img v-else :src="exp.logo" :alt="exp.company" class="exp-logo-img" />
              <div class="exp-card-top-info">
                <span class="exp-type-badge" :class="exp.type === 'Full-time' ? 'badge-dark' : 'badge-gold'">
                  {{ exp.type }}
                </span>
                <span class="exp-dur">{{ exp.duration }}</span>
              </div>
            </div>
            <h3 class="exp-company-name">{{ exp.company }}</h3>
            <h4 class="exp-pos">{{ exp.position }}</h4>
            <p class="exp-desc-text">{{ exp.description }}</p>

            <div class="exp-section-group" v-if="exp.learnings && exp.learnings.length">
              <span class="exp-section-label">Key Learnings</span>
              <div class="exp-tags">
                <span v-for="(item, j) in exp.learnings" :key="j" class="exp-tag">{{ item }}</span>
              </div>
            </div>

            <div class="exp-section-group" v-if="exp.projects && exp.projects.length">
              <span class="exp-section-label">Projects</span>
              <div class="exp-project-list">
                <span v-for="(proj, j) in exp.projects" :key="j" class="exp-project-item">{{ proj }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import { useContentStore } from '../stores/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useContentStore()
const experiences = computed(() => store.experiences)
const headerRef = ref(null)
const timelineRef = ref(null)
const lineRef = ref(null)

onMounted(async () => {
  await nextTick()

  gsap.from(headerRef.value, {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: headerRef.value, start: 'top 85%' },
  })

  gsap.from(lineRef.value, {
    scaleY: 0, transformOrigin: 'top center', ease: 'none',
    scrollTrigger: { trigger: timelineRef.value, start: 'top 80%', end: 'bottom 50%', scrub: 1 },
  })

  document.querySelectorAll('.exp-section .exp-dot').forEach((dot) => {
    gsap.from(dot, {
      scale: 0, duration: 0.5, ease: 'back.out(3)',
      scrollTrigger: { trigger: dot, start: 'top 82%' },
    })
  })

  document.querySelectorAll('.exp-section .exp-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 40, x: i % 2 !== 0 ? 30 : -30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
    })
  })
})
</script>

<style scoped>
.exp-section {
  padding: var(--space-4xl) 0;
}

.exp-timeline {
  position: relative;
  max-width: 950px;
  margin: 0 auto;
  padding: var(--space-xl) 0;
}

.exp-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--color-border-dark);
  transform: translateX(-50%);
}

.exp-entry {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 50px);
  margin-bottom: var(--space-3xl);
}

.exp-entry--right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 50px);
}

.exp-dot {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 12px;
  height: 12px;
  background: var(--color-bg);
  border: 2px solid var(--color-red);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.exp-card {
  position: relative;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: var(--space-lg) var(--space-xl);
  overflow: hidden;
  transition: box-shadow var(--transition-base);
}

.exp-card:hover {
  box-shadow: var(--shadow-md);
}

.exp-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.accent-dark { background: var(--color-text); }
.accent-gold { background: var(--color-accent); }

.exp-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.exp-logo-wrap {
  width: 42px;
  height: 42px;
  background: var(--color-text);
  color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-headline);
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.exp-logo-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  flex-shrink: 0;
}

.exp-card-top-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.exp-type-badge {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 2px 10px;
  font-weight: 700;
}

.badge-dark { background: var(--color-text); color: var(--color-bg); }
.badge-gold { background: var(--color-accent); color: var(--color-white); }

.exp-dur {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.exp-company-name {
  font-family: var(--font-headline);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 2px;
}

.exp-pos {
  font-family: var(--font-accent);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-text-secondary);
  font-weight: 400;
  margin-bottom: var(--space-sm);
}

.exp-desc-text {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.exp-section-group {
  margin-bottom: var(--space-sm);
}

.exp-section-label {
  display: block;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  font-weight: 700;
  margin-bottom: 6px;
}

.exp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.exp-tag {
  font-size: 0.7rem;
  padding: 3px 10px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.exp-project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.exp-project-item {
  font-family: var(--font-accent);
  font-size: 0.8rem;
  font-style: italic;
  color: var(--color-text-secondary);
}

.exp-project-item:not(:last-child)::after {
  content: ',';
  margin-right: 4px;
}

@media (max-width: 768px) {
  .exp-line { left: 16px; }
  .exp-entry,
  .exp-entry--right {
    padding-left: 45px;
    padding-right: 0;
    justify-content: flex-start;
  }
  .exp-dot { left: 16px; }
}

@media (max-width: 480px) {
  .exp-card {
    padding: var(--space-md);
  }
  .exp-card-top {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  .exp-card-top-info {
    flex-direction: row;
    align-items: center;
    gap: var(--space-sm);
  }
}
</style>
