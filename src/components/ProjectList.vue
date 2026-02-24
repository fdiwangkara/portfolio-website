<template>
  <section id="projects" class="projects-section">
    <div class="section-container">
      <div class="section-header" ref="headerRef">
        <h2>Selected Works</h2>
        <span class="header-rule"></span>
      </div>

      <!-- NYT-style article grid -->
      <div class="nyt-grid">
        <!-- Featured / Lead story -->
        <article
          class="nyt-article nyt-article--lead"
          @click="goToProject(projects[0]?.id)"
          ref="leadRef"
          v-if="projects.length"
        >
          <div class="nyt-article-image">
            <img :src="projects[0].image" :alt="projects[0].name" />
            <span class="read-more-overlay">Read More →</span>
          </div>
          <div class="nyt-article-body">
            <div class="nyt-article-meta">
              <span class="nyt-category">Featured Project</span>
              <span class="nyt-reading">{{ projects[0].duration }}</span>
            </div>
            <h3 class="nyt-headline nyt-headline--large">{{ projects[0].name }}</h3>
            <p class="nyt-summary">{{ projects[0].description }}</p>
            <div class="nyt-byline">
              <span>{{ projects[0].collaborators }}</span>
              <span class="nyt-tech-inline">
                <span v-for="tech in projects[0].techStack.slice(0, 3)" :key="tech">{{ tech }}</span>
              </span>
            </div>
          </div>
        </article>

        <!-- Side stories column -->
        <div class="nyt-side-column">
          <article
            v-for="(project, i) in projects.slice(1)"
            :key="project.id"
            class="nyt-article nyt-article--side"
            @click="goToProject(project.id)"
          >
            <div class="nyt-article-body">
              <div class="nyt-article-meta">
                <span class="nyt-category">{{ project.collaborators }}</span>
                <span class="nyt-reading">{{ project.duration }}</span>
              </div>
              <h3 class="nyt-headline">{{ project.name }}</h3>
              <p class="nyt-summary nyt-summary--short">{{ project.description }}</p>
              <div class="nyt-tech-row">
                <span v-for="tech in project.techStack" :key="tech" class="nyt-tech-tag">{{ tech }}</span>
              </div>
            </div>
            <div class="nyt-article-thumb">
              <img :src="project.image" :alt="project.name" />
              <span class="read-more-overlay read-more-overlay--small">Read →</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useContentStore()
const router = useRouter()
const projects = computed(() => store.projects)
const headerRef = ref(null)
const leadRef = ref(null)

function goToProject(id) {
  router.push(`/project/${id}`)
}

onMounted(async () => {
  await nextTick()

  gsap.from(headerRef.value, {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: headerRef.value, start: 'top 85%' },
  })

  if (leadRef.value) {
    gsap.from(leadRef.value, {
      opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: leadRef.value, start: 'top 85%' },
    })
  }

  const sideArticles = document.querySelectorAll('.nyt-article--side')
  sideArticles.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: 40, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  })
})
</script>

<style scoped>
.projects-section {
  padding: var(--space-4xl) 0;
}

/* NYT Grid Layout */
.nyt-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  border-top: 3px solid var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

/* Lead Article */
.nyt-article {
  cursor: pointer;
  transition: background var(--transition-base);
}

.nyt-article:hover {
  background: rgba(0, 0, 0, 0.015);
}

/* Read More overlay */
.read-more-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 18, 18, 0.75);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.read-more-overlay--small {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
}

.nyt-article:hover .read-more-overlay {
  opacity: 1;
}

.nyt-article--lead {
  border-right: 1px solid var(--color-border);
  padding: var(--space-xl) var(--space-xl) var(--space-xl) 0;
}

.nyt-article-image {
  width: 100%;
  overflow: hidden;
  margin-bottom: var(--space-lg);
  position: relative;
}

.nyt-article-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.nyt-article:hover .nyt-article-image img {
  transform: scale(1.03);
}

.nyt-article-body {
  flex: 1;
}

.nyt-article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.nyt-category {
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-red);
  font-weight: 700;
}

.nyt-reading {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.nyt-headline {
  font-family: var(--font-headline);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.nyt-headline--large {
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
}

.nyt-article:hover .nyt-headline {
  color: var(--color-text-secondary);
}

.nyt-summary {
  font-family: var(--font-accent);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.nyt-summary--short {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nyt-byline {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nyt-tech-inline {
  display: flex;
  gap: var(--space-xs);
}

.nyt-tech-inline span {
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  font-size: 0.65rem;
}

/* Side Column */
.nyt-side-column {
  display: flex;
  flex-direction: column;
}

.nyt-article--side {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg) 0 var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  align-items: flex-start;
}

.nyt-article--side:last-child {
  border-bottom: none;
}

.nyt-article-thumb {
  width: 140px;
  height: 100px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.nyt-article-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.nyt-article--side:hover .nyt-article-thumb img {
  transform: scale(1.05);
}

.nyt-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.nyt-tech-tag {
  font-family: var(--font-body);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .nyt-grid {
    grid-template-columns: 1fr;
  }

  .nyt-article--lead {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-lg) 0;
  }

  .nyt-article--side {
    padding: var(--space-md) 0;
  }
}

@media (max-width: 480px) {
  .nyt-article-image img {
    height: 220px;
  }

  .nyt-article-thumb {
    width: 100px;
    height: 75px;
  }

  .nyt-headline--large {
    font-size: 1.4rem;
  }
}
</style>
