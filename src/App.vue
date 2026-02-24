<template>
  <LoadingScreen v-if="showLoading" @complete="onLoadingComplete" />
  <div class="app-wrapper" :class="{ 'app-revealed': !showLoading }">
    <!-- Top thin bar -->
    <div v-if="!isAdminRoute" class="topbar">
      <div class="topbar-inner">
        <span class="topbar-date">{{ formattedDate }}</span>
        <span class="topbar-edition">Today's Paper</span>
      </div>
    </div>

    <!-- Main Navbar -->
    <nav v-if="!isAdminRoute" class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="navbar-inner">
        <button class="nav-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <span :class="{ open: mobileMenuOpen }"></span>
          <span :class="{ open: mobileMenuOpen }"></span>
          <span :class="{ open: mobileMenuOpen }"></span>
        </button>

        <div class="nav-center">
          <router-link to="/" class="logo">Fd</router-link>
        </div>

        <div class="nav-right-desktop">
          <a href="#projects" class="nav-link" @click.prevent="scrollTo('projects')">Works</a>
          <a href="#education" class="nav-link" @click.prevent="scrollTo('education')">Education</a>
          <a href="#experience" class="nav-link" @click.prevent="scrollTo('experience')">Experience</a>
          <a href="#gallery" class="nav-link" @click.prevent="scrollTo('gallery')">Gallery</a>
          <a href="#contact" class="nav-link" @click.prevent="scrollTo('contact')">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen && !isAdminRoute" class="mobile-menu-overlay" @click.self="mobileMenuOpen = false">
        <div class="mobile-menu">
          <div class="mobile-menu-header">
            <span class="mobile-menu-logo">Fd</span>
            <button class="mobile-menu-close" @click="mobileMenuOpen = false">×</button>
          </div>
          <nav class="mobile-menu-nav">
            <a href="#projects" class="mobile-link" @click.prevent="mobileNav('projects')">Selected Works</a>
            <a href="#education" class="mobile-link" @click.prevent="mobileNav('education')">Education</a>
            <a href="#experience" class="mobile-link" @click.prevent="mobileNav('experience')">Experience</a>
            <a href="#gallery" class="mobile-link" @click.prevent="mobileNav('gallery')">Gallery</a>
            <a href="#contact" class="mobile-link" @click.prevent="mobileNav('contact')">Contact</a>
          </nav>
        </div>
      </div>
    </Transition>

    <main>
      <router-view />
    </main>

    <ScrollProgress v-if="!isAdminRoute" />

    <footer v-if="!isAdminRoute" class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <span class="footer-logo">Fd</span>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-bottom">
          <div class="footer-links">
            <a href="#projects" @click.prevent="scrollTo('projects')">Works</a>
            <a href="#education" @click.prevent="scrollTo('education')">Education</a>
            <a href="#experience" @click.prevent="scrollTo('experience')">Experience</a>
            <a href="#contact" @click.prevent="scrollTo('contact')">Contact</a>
          </div>
          <span class="footer-copy">&copy; {{ currentYear }} Filemon Diwangkara</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import LoadingScreen from './components/LoadingScreen.vue'
import ScrollProgress from './components/ScrollProgress.vue'

const route = useRoute()
const showLoading = ref(true)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const isAdminRoute = computed(() => route.path.startsWith('/admin') || route.path === '/login')

const formattedDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const currentYear = computed(() => new Date().getFullYear())

function onLoadingComplete() {
  showLoading.value = false
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function mobileNav(id) {
  mobileMenuOpen.value = false
  setTimeout(() => scrollTo(id), 300)
}

function handleScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.app-revealed {
  opacity: 1;
}

/* ---- Top Bar ---- */
.topbar {
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.topbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 6px var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-date {
  font-family: var(--font-body);
  text-transform: uppercase;
}

.topbar-edition {
  font-family: var(--font-accent);
  font-style: italic;
  letter-spacing: 0.02em;
}

/* ---- Navbar ---- */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base), background var(--transition-base);
}

.navbar-scrolled {
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
}

.navbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md) var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 10;
}

.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  transition: all 0.3s ease;
  transform-origin: center;
}

.nav-hamburger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav-hamburger span.open:nth-child(2) {
  opacity: 0;
}

.nav-hamburger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo {
  font-family: var(--font-logo);
  font-size: 2rem;
  color: var(--color-text);
  line-height: 1;
  transition: color var(--transition-fast);
}

.logo:hover {
  color: var(--color-accent);
}

.nav-right-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  font-weight: 500;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-admin-btn {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  padding: 4px 12px;
  transition: all var(--transition-fast);
}

.nav-admin-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text);
}

/* ---- Mobile Menu ---- */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.mobile-menu {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: var(--color-bg);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.2);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-lg);
  border-bottom: 2px solid var(--color-text);
}

.mobile-menu-logo {
  font-family: var(--font-logo);
  font-size: 2rem;
  color: var(--color-text);
}

.mobile-menu-close {
  font-size: 1.8rem;
  color: var(--color-text);
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}

.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.mobile-link {
  font-family: var(--font-headline);
  font-size: 1.4rem;
  color: var(--color-text);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-fast);
}

.mobile-link:hover {
  color: var(--color-accent);
}

.mobile-menu-footer {
  margin-top: auto;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.mobile-admin {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
  transform: translateX(-100%);
}

/* ---- Footer ---- */
.site-footer {
  margin-top: auto;
  background: var(--color-text);
  color: var(--color-bg);
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-xl);
}

.footer-top {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.footer-logo {
  font-family: var(--font-logo);
  font-size: 2.5rem;
  color: var(--color-accent);
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: var(--space-xl);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-links {
  display: flex;
  gap: var(--space-lg);
}

.footer-links a {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-copy {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.4);
}

.footer-admin-link {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
  transition: color var(--transition-fast);
}

.footer-admin-link:hover {
  color: var(--color-accent);
}

main {
  flex: 1;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .nav-right-desktop {
    display: none;
  }

  .nav-hamburger {
    display: flex;
  }

  .navbar-inner {
    padding: var(--space-sm) var(--space-md);
  }

  .topbar-inner {
    padding: 5px var(--space-md);
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 2.2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
  }

  .footer-inner {
    padding: var(--space-2xl) var(--space-md);
  }
}
</style>
