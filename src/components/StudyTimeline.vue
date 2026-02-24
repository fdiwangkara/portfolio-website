<template>
  <section id="education" class="study-section">
    <div class="section-container">
      <div class="section-header" ref="headerRef">
        <h2>Education</h2>
        <span class="header-rule"></span>
      </div>
      <div class="timeline" ref="timelineRef">
        <div class="timeline-line" ref="lineRef"></div>
        <div
          v-for="(edu, i) in education"
          :key="edu.id"
          class="timeline-entry"
          :class="{ 'timeline-entry--right': i % 2 !== 0 }"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="card-top-rule"></div>
            <span class="card-period">{{ edu.period }}</span>
            <h3 class="card-title">{{ edu.school }}</h3>
            <h4 class="card-subtitle">{{ edu.degree }}</h4>
            <p class="card-desc">{{ edu.description }}</p>
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
const education = computed(() => store.education)
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

  document.querySelectorAll('.study-section .timeline-dot').forEach((dot) => {
    gsap.from(dot, {
      scale: 0, duration: 0.5, ease: 'back.out(3)',
      scrollTrigger: { trigger: dot, start: 'top 82%' },
    })
  })

  document.querySelectorAll('.study-section .timeline-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 40, x: i % 2 !== 0 ? 30 : -30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
    })
  })
})
</script>

<style scoped>
.study-section {
  padding: var(--space-4xl) 0;
}

.timeline {
  position: relative;
  max-width: 950px;
  margin: 0 auto;
  padding: var(--space-xl) 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--color-border-dark);
  transform: translateX(-50%);
}

.timeline-entry {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 50px);
  margin-bottom: var(--space-3xl);
}

.timeline-entry--right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 50px);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 12px;
  height: 12px;
  background: var(--color-bg);
  border: 2px solid var(--color-text);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.timeline-card {
  position: relative;
  padding: var(--space-lg) var(--space-xl);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base);
}

.timeline-card:hover {
  box-shadow: var(--shadow-md);
}

.card-top-rule {
  position: absolute;
  top: 0;
  left: var(--space-xl);
  right: var(--space-xl);
  height: 3px;
  background: var(--color-text);
}

.card-period {
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-red);
  font-weight: 700;
  display: block;
  margin-bottom: var(--space-sm);
  margin-top: var(--space-xs);
}

.card-title {
  font-family: var(--font-headline);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 4px;
}

.card-subtitle {
  font-family: var(--font-accent);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-text-secondary);
  font-weight: 400;
  margin-bottom: var(--space-sm);
}

.card-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline-line { left: 16px; }
  .timeline-entry,
  .timeline-entry--right {
    padding-left: 45px;
    padding-right: 0;
    justify-content: flex-start;
  }
  .timeline-dot { left: 16px; }
}

@media (max-width: 480px) {
  .timeline-card {
    padding: var(--space-md);
  }
  .card-top-rule {
    left: var(--space-md);
    right: var(--space-md);
  }
}
</style>
