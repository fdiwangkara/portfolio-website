<template>
  <div class="admin">
    <!-- Admin top bar mimicking the newspaper topbar -->
    <header class="admin-topbar">
      <div class="admin-topbar-inner">
        <span class="admin-topbar-date">{{ formattedDate }}</span>
        <span class="admin-topbar-edition">Editor's Dashboard</span>
      </div>
    </header>

    <!-- Admin navbar -->
    <nav class="admin-navbar">
      <div class="admin-navbar-inner">
        <router-link to="/" class="admin-back">← Back to Site</router-link>
        <span class="admin-logo">Fd</span>
        <div class="admin-nav-actions">
          <button class="admin-save-btn" @click="saveAll">Save All</button>
          <button class="admin-logout-btn" @click="handleLogout">Logout</button>
        </div>
      </div>
    </nav>

    <!-- Section tabs -->
    <div class="admin-tabs">
      <div class="admin-tabs-inner">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="admin-tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Main content -->
    <main class="admin-main">
      <div class="admin-content-wrap">
        <!-- Header -->
        <div class="admin-page-header">
          <h1 class="admin-page-title">{{ currentTabLabel }}</h1>
          <div v-if="toast" class="admin-toast" :class="toast.type">{{ toast.message }}</div>
          <button class="admin-reset-btn" @click="resetAll">Reset to Defaults</button>
        </div>

        <div class="admin-rule admin-rule--double"></div>

        <!-- HERO TAB -->
        <div v-if="activeTab === 'hero'" class="admin-section">
          <div class="form-row-2col">
            <div class="form-group">
              <label>Name</label>
              <input v-model="store.hero.name" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Tagline</label>
              <input v-model="store.hero.tagline" type="text" class="form-input" />
            </div>
          </div>
          <div class="admin-rule admin-rule--thin"></div>
          <h3 class="form-section-title">Social Links</h3>
          <div v-for="(social, i) in store.hero.socials" :key="i" class="form-inline-row">
            <input v-model="social.platform" placeholder="Platform" class="form-input form-input--sm" />
            <input v-model="social.url" placeholder="URL" class="form-input" />
            <select v-model="social.icon" class="form-select">
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
            </select>
            <button class="form-delete-btn" @click="store.hero.socials.splice(i, 1)">×</button>
          </div>
          <button class="form-add-btn" @click="store.hero.socials.push({ platform: '', url: '', icon: 'github' })">
            + Add Social Link
          </button>
        </div>

        <!-- PROJECTS TAB -->
        <div v-if="activeTab === 'projects'" class="admin-section">
          <div v-for="(proj, i) in store.projects" :key="proj.id" class="admin-article-card">
            <div class="article-card-header">
              <h3>{{ proj.name || 'Untitled Project' }}</h3>
              <button class="form-delete-btn" @click="store.projects.splice(i, 1)">Delete</button>
            </div>
            <div class="form-row-2col">
              <div class="form-group">
                <label>Name</label>
                <input v-model="proj.name" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input v-model="proj.image" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Duration</label>
                <input v-model="proj.duration" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Collaborators</label>
                <input v-model="proj.collaborators" type="text" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="proj.description" class="form-textarea" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Tech Stack (comma-separated)</label>
              <input :value="proj.techStack.join(', ')" @input="proj.techStack = $event.target.value.split(',').map(s => s.trim()).filter(Boolean)" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Detail Content (HTML)</label>
              <textarea v-model="proj.detailContent" class="form-textarea" rows="4"></textarea>
            </div>
          </div>
          <button class="form-add-btn" @click="addProject">+ Add Project</button>
        </div>

        <!-- EDUCATION TAB -->
        <div v-if="activeTab === 'education'" class="admin-section">
          <div v-for="(edu, i) in store.education" :key="edu.id" class="admin-article-card">
            <div class="article-card-header">
              <h3>{{ edu.school || 'Untitled' }}</h3>
              <button class="form-delete-btn" @click="store.education.splice(i, 1)">Delete</button>
            </div>
            <div class="form-row-2col">
              <div class="form-group">
                <label>School</label>
                <input v-model="edu.school" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Degree</label>
                <input v-model="edu.degree" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Period</label>
                <input v-model="edu.period" type="text" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="edu.description" class="form-textarea" rows="3"></textarea>
            </div>
          </div>
          <button class="form-add-btn" @click="addEducation">+ Add Education</button>
        </div>

        <!-- EXPERIENCES TAB -->
        <div v-if="activeTab === 'experiences'" class="admin-section">
          <div v-for="(exp, i) in store.experiences" :key="exp.id" class="admin-article-card">
            <div class="article-card-header">
              <h3>{{ exp.company || 'Untitled' }}</h3>
              <button class="form-delete-btn" @click="store.experiences.splice(i, 1)">Delete</button>
            </div>
            <div class="form-row-2col">
              <div class="form-group">
                <label>Company</label>
                <input v-model="exp.company" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Logo URL</label>
                <input v-model="exp.logo" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Position</label>
                <input v-model="exp.position" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Type</label>
                <select v-model="exp.type" class="form-select">
                  <option value="Full-time">Full-time</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <div class="form-group">
                <label>Duration</label>
                <input v-model="exp.duration" type="text" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="exp.description" class="form-textarea" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Learnings (comma-separated)</label>
              <input :value="exp.learnings.join(', ')" @input="exp.learnings = $event.target.value.split(',').map(s => s.trim()).filter(Boolean)" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Projects (comma-separated)</label>
              <input :value="exp.projects.join(', ')" @input="exp.projects = $event.target.value.split(',').map(s => s.trim()).filter(Boolean)" type="text" class="form-input" />
            </div>
          </div>
          <button class="form-add-btn" @click="addExperience">+ Add Experience</button>
        </div>

        <!-- GALLERY TAB -->
        <div v-if="activeTab === 'gallery'" class="admin-section">
          <div class="gallery-grid-admin">
            <div v-for="(img, i) in store.gallery" :key="img.id" class="admin-gallery-card">
              <div class="admin-gallery-preview">
                <img :src="img.src" :alt="img.caption" />
              </div>
              <input v-model="img.src" placeholder="Image URL" class="form-input" />
              <input v-model="img.caption" placeholder="Caption" class="form-input" />
              <button class="form-delete-btn" @click="store.gallery.splice(i, 1)">Delete</button>
            </div>
          </div>
          <button class="form-add-btn" @click="addGalleryImage">+ Add Image</button>
        </div>

        <!-- CONTACT TAB -->
        <div v-if="activeTab === 'contact'" class="admin-section">
          <div class="form-row-2col">
            <div class="form-group">
              <label>Headline</label>
              <input v-model="store.contact.headline" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="store.contact.email" type="email" class="form-input" />
            </div>
          </div>
        </div>

        <div class="admin-rule admin-rule--heavy"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import { useAuthStore } from '../stores/auth'

const store = useContentStore()
const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref('hero')
const toast = ref(null)

const tabs = [
  { key: 'hero', label: 'Hero' },
  { key: 'projects', label: 'Projects' },
  { key: 'education', label: 'Education' },
  { key: 'experiences', label: 'Experiences' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'contact', label: 'Contact' },
]

const currentTabLabel = computed(() => tabs.find((t) => t.key === activeTab.value)?.label || '')

const formattedDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

function showToast(message, type = 'success') {
  toast.value = { message, type }
  setTimeout(() => (toast.value = null), 3000)
}

function saveAll() {
  store.saveToLocalStorage()
  showToast('All changes saved successfully!')
}

function resetAll() {
  if (confirm('Are you sure? This will reset all content to defaults.')) {
    store.resetToDefaults()
    showToast('Content reset to defaults', 'info')
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

function addProject() {
  store.projects.push({
    id: `project-${Date.now()}`,
    image: '',
    name: '',
    description: '',
    duration: '',
    collaborators: '',
    techStack: [],
    detailContent: '',
  })
}

function addEducation() {
  store.education.push({
    id: `edu-${Date.now()}`,
    school: '',
    degree: '',
    period: '',
    description: '',
  })
}

function addExperience() {
  store.experiences.push({
    id: `exp-${Date.now()}`,
    company: '',
    logo: '',
    position: '',
    type: 'Full-time',
    duration: '',
    learnings: [],
    projects: [],
    description: '',
  })
}

function addGalleryImage() {
  store.gallery.push({
    id: `gal-${Date.now()}`,
    src: '',
    caption: '',
  })
}
</script>

<style scoped>
.admin {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text);
}

/* ---- Topbar (mirrors site) ---- */
.admin-topbar {
  background: var(--color-admin-text);
  color: var(--color-admin-bg);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.admin-topbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 6px var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-topbar-date {
  font-family: var(--font-body);
  text-transform: uppercase;
}

.admin-topbar-edition {
  font-family: var(--font-accent);
  font-style: italic;
  letter-spacing: 0.02em;
}

/* ---- Navbar ---- */
.admin-navbar {
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-surface);
}

.admin-navbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md) var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-back {
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.admin-back:hover {
  color: var(--color-admin-text);
}

.admin-logo {
  font-family: var(--font-logo);
  font-size: 2rem;
  color: var(--color-admin-text);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.admin-nav-actions {
  display: flex;
  gap: var(--space-sm);
}

.admin-save-btn {
  padding: 6px 18px;
  background: var(--color-admin-text);
  color: var(--color-admin-surface);
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  border: none;
  transition: opacity var(--transition-fast);
}

.admin-save-btn:hover {
  opacity: 0.85;
}

.admin-logout-btn {
  padding: 6px 18px;
  border: 1px solid var(--color-admin-border);
  color: var(--color-admin-danger);
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  background: none;
  transition: all var(--transition-fast);
}

.admin-logout-btn:hover {
  background: rgba(161, 37, 43, 0.06);
  border-color: var(--color-admin-danger);
}

/* ---- Section tabs ---- */
.admin-tabs {
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-surface);
}

.admin-tabs-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: flex;
  gap: 0;
}

.admin-tab {
  font-family: var(--font-body);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: var(--space-md) var(--space-lg);
  color: var(--color-text-muted);
  border: none;
  background: none;
  transition: all var(--transition-fast);
  position: relative;
  font-weight: 500;
}

.admin-tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-admin-accent);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.admin-tab:hover {
  color: var(--color-admin-text);
}

.admin-tab.active {
  color: var(--color-admin-text);
  font-weight: 700;
}

.admin-tab.active::after {
  transform: scaleX(1);
}

/* ---- Main content ---- */
.admin-main {
  padding: var(--space-2xl) 0;
}

.admin-content-wrap {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.admin-page-header {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.admin-page-title {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-admin-text);
  flex: 1;
}

.admin-toast {
  padding: 6px 18px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid;
  animation: toastIn 0.3s ease;
}

.admin-toast.success {
  background: rgba(50, 104, 145, 0.08);
  color: var(--color-admin-accent);
  border-color: rgba(50, 104, 145, 0.2);
}

.admin-toast.info {
  background: rgba(50, 104, 145, 0.08);
  color: var(--color-admin-accent);
  border-color: rgba(50, 104, 145, 0.2);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.admin-reset-btn {
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-admin-danger);
  border: 1px solid var(--color-admin-border);
  padding: 6px 14px;
  background: none;
  transition: all var(--transition-fast);
}

.admin-reset-btn:hover {
  border-color: var(--color-admin-danger);
  background: rgba(161, 37, 43, 0.04);
}

/* ---- Rules ---- */
.admin-rule--double {
  height: 4px;
  border-top: 2px solid var(--color-admin-text);
  border-bottom: 1px solid var(--color-admin-text);
  margin-bottom: var(--space-2xl);
}

.admin-rule--thin {
  height: 1px;
  background: var(--color-admin-border);
  margin: var(--space-xl) 0;
}

.admin-rule--heavy {
  height: 2px;
  background: var(--color-admin-text);
  margin-top: var(--space-3xl);
}

/* ---- Article cards ---- */
.admin-article-card {
  background: var(--color-admin-surface);
  border: 1px solid var(--color-admin-border);
  padding: var(--space-xl);
  margin-bottom: var(--space-lg);
}

.article-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-admin-border);
}

.article-card-header h3 {
  font-family: var(--font-headline);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-admin-text);
}

/* ---- Form Elements ---- */
.admin-section {
  max-width: 900px;
}

.form-group {
  margin-bottom: var(--space-md);
}

.form-group label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 14px;
  background: var(--color-admin-bg);
  border: 1px solid var(--color-admin-border);
  color: var(--color-admin-text);
  font-size: 0.9rem;
  font-family: var(--font-body);
  transition: border-color var(--transition-fast);
  outline: none;
}

.form-input:focus,
.form-select:focus {
  border-color: var(--color-admin-text);
}

.form-input--sm {
  max-width: 160px;
}

.form-textarea {
  width: 100%;
  padding: 10px 14px;
  background: var(--color-admin-bg);
  border: 1px solid var(--color-admin-border);
  color: var(--color-admin-text);
  font-size: 0.9rem;
  font-family: var(--font-body);
  resize: vertical;
  transition: border-color var(--transition-fast);
  outline: none;
}

.form-textarea:focus {
  border-color: var(--color-admin-text);
}

.form-row-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-inline-row {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  margin-bottom: var(--space-sm);
}

.form-section-title {
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
  font-weight: 700;
}

.form-add-btn {
  padding: 10px var(--space-lg);
  border: 1px dashed var(--color-admin-border);
  color: var(--color-admin-accent);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  background: none;
  transition: all var(--transition-fast);
  width: 100%;
  margin-top: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.form-add-btn:hover {
  background: rgba(50, 104, 145, 0.05);
  border-color: var(--color-admin-accent);
}

.form-delete-btn {
  padding: 4px 12px;
  color: var(--color-admin-danger);
  font-size: 0.8rem;
  transition: background var(--transition-fast);
  white-space: nowrap;
  background: none;
  border: 1px solid transparent;
}

.form-delete-btn:hover {
  background: rgba(161, 37, 43, 0.06);
  border-color: var(--color-admin-danger);
}

/* ---- Gallery Admin ---- */
.gallery-grid-admin {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-md);
}

.admin-gallery-card {
  background: var(--color-admin-surface);
  border: 1px solid var(--color-admin-border);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.admin-gallery-preview {
  width: 100%;
  height: 150px;
  background: var(--color-admin-bg);
  overflow: hidden;
}

.admin-gallery-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .admin-topbar-inner,
  .admin-navbar-inner,
  .admin-tabs-inner,
  .admin-content-wrap {
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }

  .admin-logo {
    display: none;
  }

  .admin-tabs-inner {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .admin-tab {
    white-space: nowrap;
    padding: var(--space-sm) var(--space-md);
    font-size: 0.7rem;
  }

  .form-row-2col {
    grid-template-columns: 1fr;
  }

  .form-inline-row {
    flex-wrap: wrap;
  }

  .admin-page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
}
</style>
