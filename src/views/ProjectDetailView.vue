<template>
  <div class="project-detail">
    <article class="detail-article section-container" v-if="project">
      <button class="back-btn" @click="goBack" ref="backRef">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16 10H4M4 10L10 4M4 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back to Portfolio</span>
      </button>

      <header class="detail-header" ref="headerRef">
        <div class="detail-meta">
          <span class="detail-duration">{{ project.duration }}</span>
          <span class="meta-sep">|</span>
          <span class="detail-collab">{{ project.collaborators }}</span>
        </div>
        <h1 class="detail-title">{{ project.name }}</h1>
        <hr class="double-rule" />
        <p class="detail-excerpt">{{ project.description }}</p>
      </header>

      <div class="detail-hero-image" ref="imageRef">
        <img :src="project.image" :alt="project.name" />
      </div>

      <div class="detail-tech-bar" ref="techRef">
        <span class="tech-label">Technologies:</span>
        <div class="tech-list">
          <span v-for="tech in project.techStack" :key="tech" class="tech-item">{{ tech }}</span>
        </div>
      </div>

      <div class="detail-content" ref="contentRef" v-html="project.detailContent"></div>

      <div class="detail-footer">
        <hr class="double-rule" />
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16 10H4M4 10L10 4M4 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Back to All Projects</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const store = useContentStore()

const project = computed(() =>
  store.projects.find((p) => p.id === route.params.id)
)

const backRef = ref(null)
const headerRef = ref(null)
const imageRef = ref(null)
const techRef = ref(null)
const contentRef = ref(null)

function goBack() {
  router.push('/')
}

onMounted(async () => {
  await nextTick()
  if (!project.value) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  gsap.set(backRef.value, { opacity: 0, x: -20 })
  gsap.set(headerRef.value, { opacity: 0, y: 30 })
  gsap.set(imageRef.value, { opacity: 0, y: 40 })
  gsap.set(techRef.value, { opacity: 0, y: 20 })
  gsap.set(contentRef.value, { opacity: 0, y: 30 })

  tl.to(backRef.value, { opacity: 1, x: 0, duration: 0.5 })
    .to(headerRef.value, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to(imageRef.value, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to(techRef.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
    .to(contentRef.value, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
})
</script>

<style scoped>
.project-detail {
  padding: var(--space-3xl) 0 var(--space-5xl);
}

.detail-article {
  max-width: var(--max-width-narrow);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-body);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  padding: var(--space-sm) 0;
  margin-bottom: var(--space-2xl);
  transition: color var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
}

.back-btn:hover {
  color: var(--color-text);
}

.detail-header {
  margin-bottom: var(--space-2xl);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.detail-duration,
.detail-collab {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.meta-sep {
  color: var(--color-border-dark);
}

.detail-title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
}

.detail-excerpt {
  font-family: var(--font-accent);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-top: var(--space-lg);
}

.detail-hero-image {
  margin-bottom: var(--space-2xl);
  overflow: hidden;
}

.detail-hero-image img {
  width: 100%;
  height: auto;
  display: block;
}

.detail-tech-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-2xl);
}

.tech-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.tech-item {
  font-size: 0.8rem;
  padding: 2px 12px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.detail-content {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.detail-content :deep(p) {
  margin-bottom: var(--space-lg);
}

.detail-content :deep(h3) {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.detail-footer {
  margin-top: var(--space-3xl);
}

@media (max-width: 768px) {
  .detail-tech-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
