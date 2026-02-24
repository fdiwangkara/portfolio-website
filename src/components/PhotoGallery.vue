<template>
  <section id="gallery" class="gallery-section">
    <div class="section-container">
      <div class="section-header" ref="headerRef">
        <h2>Gallery</h2>
        <span class="header-rule"></span>
      </div>
    </div>

    <!-- 3 Stacked Carousels -->
    <div class="gallery-stack" ref="stackRef">
      <!-- Row 1: scroll RIGHT -->
      <div class="carousel-row" @mouseenter="pause(0)" @mouseleave="resume(0)">
        <div class="carousel-track track-0" ref="track0">
          <div
            v-for="(img, i) in row1"
            :key="'r1-' + i"
            class="carousel-item"
            @mouseenter="revealColor($event)"
            @mouseleave="hideColor($event)"
          >
            <img :src="img.src" :alt="img.caption" loading="lazy" />
            <div class="carousel-caption"><span>{{ img.caption }}</span></div>
          </div>
        </div>
      </div>

      <!-- Row 2: scroll LEFT -->
      <div class="carousel-row" @mouseenter="pause(1)" @mouseleave="resume(1)">
        <div class="carousel-track track-1" ref="track1">
          <div
            v-for="(img, i) in row2"
            :key="'r2-' + i"
            class="carousel-item"
            @mouseenter="revealColor($event)"
            @mouseleave="hideColor($event)"
          >
            <img :src="img.src" :alt="img.caption" loading="lazy" />
            <div class="carousel-caption"><span>{{ img.caption }}</span></div>
          </div>
        </div>
      </div>

      <!-- Row 3: scroll RIGHT -->
      <div class="carousel-row" @mouseenter="pause(2)" @mouseleave="resume(2)">
        <div class="carousel-track track-2" ref="track2">
          <div
            v-for="(img, i) in row3"
            :key="'r3-' + i"
            class="carousel-item"
            @mouseenter="revealColor($event)"
            @mouseleave="hideColor($event)"
          >
            <img :src="img.src" :alt="img.caption" loading="lazy" />
            <div class="carousel-caption"><span>{{ img.caption }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useContentStore } from '../stores/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useContentStore()
const gallery = computed(() => store.gallery)

// Distribute images across 3 rows + duplicate for infinite loop
const row1 = computed(() => {
  const items = gallery.value.filter((_, i) => i % 3 === 0)
  return [...items, ...items, ...items]
})
const row2 = computed(() => {
  const items = gallery.value.filter((_, i) => i % 3 === 1)
  return [...items, ...items, ...items]
})
const row3 = computed(() => {
  const items = gallery.value.filter((_, i) => i % 3 === 2)
  return [...items, ...items, ...items]
})

const headerRef = ref(null)
const stackRef = ref(null)
const track0 = ref(null)
const track1 = ref(null)
const track2 = ref(null)

const animations = []

function setupCarousel() {
  const tracks = [track0.value, track1.value, track2.value]
  const directions = [1, -1, 1] // right, left, right
  const speeds = [35, 28, 32]

  tracks.forEach((track, idx) => {
    if (!track) return

    const totalWidth = track.scrollWidth / 3

    // Set initial positions
    if (directions[idx] === -1) {
      gsap.set(track, { x: -totalWidth })
    }

    const anim = gsap.to(track, {
      x: directions[idx] === 1 ? -totalWidth : 0,
      duration: speeds[idx],
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x) % totalWidth
          return directions[idx] === -1 ? val - totalWidth : val
        }),
      },
    })

    animations.push(anim)
  })
}

function pause(index) {
  if (animations[index]) {
    gsap.to(animations[index], { timeScale: 0, duration: 0.5 })
  }
}

function resume(index) {
  if (animations[index]) {
    gsap.to(animations[index], { timeScale: 1, duration: 0.5 })
  }
}

function revealColor(event) {
  const img = event.currentTarget.querySelector('img')
  const caption = event.currentTarget.querySelector('.carousel-caption')
  gsap.to(img, { filter: 'grayscale(0%)', duration: 0.5, ease: 'power2.out' })
  gsap.to(caption, { opacity: 1, y: 0, duration: 0.3 })
}

function hideColor(event) {
  const img = event.currentTarget.querySelector('img')
  const caption = event.currentTarget.querySelector('.carousel-caption')
  gsap.to(img, { filter: 'grayscale(100%)', duration: 0.5, ease: 'power2.out' })
  gsap.to(caption, { opacity: 0, y: 10, duration: 0.3 })
}

onMounted(async () => {
  await nextTick()

  gsap.from(headerRef.value, {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: headerRef.value, start: 'top 85%' },
  })

  gsap.from(stackRef.value, {
    opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: stackRef.value, start: 'top 85%' },
  })

  setTimeout(setupCarousel, 300)
})

onBeforeUnmount(() => {
  animations.forEach((a) => a.kill())
})
</script>

<style scoped>
.gallery-section {
  padding: var(--space-4xl) 0 var(--space-2xl);
  overflow: hidden;
}

.gallery-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.carousel-row {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: var(--space-sm);
  width: max-content;
  will-change: transform;
}

.carousel-item {
  position: relative;
  flex-shrink: 0;
  width: 320px;
  height: 210px;
  overflow: hidden;
  cursor: pointer;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: transform 0.5s ease;
}

.carousel-item:hover img {
  transform: scale(1.06);
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-md);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  opacity: 0;
  transform: translateY(10px);
}

.carousel-caption span {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  color: var(--color-white);
  font-style: italic;
}

@media (max-width: 768px) {
  .carousel-item {
    width: 260px;
    height: 170px;
  }
}

@media (max-width: 480px) {
  .carousel-item {
    width: 200px;
    height: 135px;
  }

  .gallery-stack {
    gap: 4px;
  }
}
</style>
