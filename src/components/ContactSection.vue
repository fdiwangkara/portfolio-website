<template>
  <section id="contact" class="contact-section" ref="sectionRef">
    <div class="section-container">
      <div class="contact-ornament" ref="ornamentRef">✦ ✦ ✦</div>
      <h2 class="contact-headline" ref="headlineRef">{{ contact.headline }}</h2>
      <hr class="contact-rule" ref="ruleRef" />
      <p class="contact-sub" ref="subRef">Have an exciting project in mind? Let's build something extraordinary together.</p>
      <a :href="`mailto:${contact.email}`" class="contact-btn" ref="btnRef">
        <span>Send me an email</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4H16V15H4V4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M4 4L10 10L16 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <span class="contact-email" ref="emailRef">{{ contact.email }}</span>
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
const contact = computed(() => store.contact)

const sectionRef = ref(null)
const ornamentRef = ref(null)
const headlineRef = ref(null)
const ruleRef = ref(null)
const subRef = ref(null)
const btnRef = ref(null)
const emailRef = ref(null)

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
    },
    defaults: { ease: 'power3.out' },
  })

  gsap.set([ornamentRef.value, headlineRef.value, ruleRef.value, subRef.value, btnRef.value, emailRef.value], {
    opacity: 0,
    y: 30,
  })
  gsap.set(ruleRef.value, { scaleX: 0, transformOrigin: 'center' })

  tl.to(ornamentRef.value, { opacity: 1, y: 0, duration: 0.5 })
    .to(headlineRef.value, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
    .to(ruleRef.value, { opacity: 1, scaleX: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to(subRef.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to(btnRef.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to(emailRef.value, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
})
</script>

<style scoped>
.contact-section {
  padding: var(--space-5xl) 0;
  text-align: center;
}

.contact-ornament {
  font-size: 1rem;
  letter-spacing: 0.5em;
  color: var(--color-accent);
  margin-bottom: var(--space-xl);
}

.contact-headline {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: var(--space-lg);
}

.contact-rule {
  border: none;
  height: 3px;
  background: var(--color-accent);
  width: 80px;
  margin: 0 auto var(--space-xl);
}

.contact-sub {
  font-family: var(--font-accent);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto var(--space-2xl);
  line-height: 1.6;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-bg);
  background: var(--color-text);
  padding: var(--space-md) var(--space-2xl);
  transition: all var(--transition-base);
  margin-bottom: var(--space-lg);
}

.contact-btn:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.contact-email {
  display: block;
  font-family: var(--font-accent);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
