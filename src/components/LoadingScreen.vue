<template>
  <div class="loading-screen" ref="screenRef">
    <div class="loading-content" ref="contentRef">
      <div class="loading-logo" ref="logoRef">Fd</div>
      <div class="loading-line-top" ref="lineTopRef"></div>
      <div class="loading-tagline" ref="taglineRef">Portfolio — Today's Edition</div>
      <div class="loading-line-bottom" ref="lineBottomRef"></div>
      <div class="loading-bar-container" ref="barContainerRef">
        <div class="loading-bar" ref="barRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['complete'])

const screenRef = ref(null)
const contentRef = ref(null)
const logoRef = ref(null)
const lineTopRef = ref(null)
const taglineRef = ref(null)
const lineBottomRef = ref(null)
const barContainerRef = ref(null)
const barRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('complete')
    },
  })

  // Initial state
  gsap.set([logoRef.value, taglineRef.value, barContainerRef.value], { opacity: 0 })
  gsap.set(logoRef.value, { scale: 0.8, y: 20 })
  gsap.set(taglineRef.value, { y: 10 })
  gsap.set(lineTopRef.value, { scaleX: 0, transformOrigin: 'center' })
  gsap.set(lineBottomRef.value, { scaleX: 0, transformOrigin: 'center' })
  gsap.set(barRef.value, { scaleX: 0, transformOrigin: 'left center' })

  // Animation — refined and smooth
  tl.to(logoRef.value, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  })
    .to(lineTopRef.value, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
    .to(taglineRef.value, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to(lineBottomRef.value, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
    .to(barContainerRef.value, { opacity: 1, duration: 0.2 }, '-=0.1')
    .to(barRef.value, { scaleX: 1, duration: 1, ease: 'power1.inOut' })
    .to(contentRef.value, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power3.in',
      delay: 0.15,
    })
    .to(screenRef.value, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
    })
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: inset(0 0 0 0);
}

.loading-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.loading-logo {
  font-family: var(--font-logo);
  font-size: 6rem;
  color: var(--color-bg);
  line-height: 1;
  margin-bottom: var(--space-sm);
}

.loading-line-top,
.loading-line-bottom {
  width: 180px;
  height: 1px;
  background: var(--color-accent);
}

.loading-tagline {
  font-family: var(--font-accent);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  letter-spacing: 0.08em;
  padding: var(--space-sm) 0;
}

.loading-bar-container {
  width: 120px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  margin-top: var(--space-md);
  overflow: hidden;
}

.loading-bar {
  width: 100%;
  height: 100%;
  background: var(--color-accent);
}

@media (max-width: 480px) {
  .loading-logo {
    font-size: 4rem;
  }
}
</style>
