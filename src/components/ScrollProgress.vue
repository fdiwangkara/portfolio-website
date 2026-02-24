<template>
  <div
    class="scroll-progress"
    :class="{ visible: scrollPercent > 0 }"
    @click="scrollToTop"
    :title="`${Math.round(scrollPercent)}% — Click to return to top`"
  >
    <div class="scroll-progress-fill" :style="{ height: scrollPercent + '%' }"></div>
    <span class="scroll-progress-label">↑</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollPercent = ref(0)

function updateScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true })
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 80px;
  background: var(--color-border);
  z-index: 999;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 2px;
}

.scroll-progress.visible {
  opacity: 1;
}

.scroll-progress-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--color-text);
  border-radius: 2px;
  transition: height 0.1s linear;
}

.scroll-progress-label {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-text-muted);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.scroll-progress:hover .scroll-progress-label {
  opacity: 1;
}

.scroll-progress:hover {
  width: 4px;
  background: var(--color-border-dark, var(--color-border));
}

@media (max-width: 768px) {
  .scroll-progress {
    right: 10px;
    height: 60px;
  }
}
</style>
