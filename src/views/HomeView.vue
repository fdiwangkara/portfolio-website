<template>
  <div class="home">
    <HeroSection />
    <ProjectList />
    <hr class="section-rule" />
    <StudyTimeline />
    <hr class="section-rule" />
    <ExperienceTimeline />
    <hr class="section-rule" />
    <PhotoGallery />
    <hr class="section-rule" />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import ProjectList from '../components/ProjectList.vue'
import StudyTimeline from '../components/StudyTimeline.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import PhotoGallery from '../components/PhotoGallery.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.section-rule {
  border: none;
  height: 2px;
  background: var(--color-text);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
}
</style>
