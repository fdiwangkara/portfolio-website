import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultData = {
    hero: {
        name: 'FELIX DIWANGKARA',
        tagline: 'Creative Developer & Visual Storyteller',
        socials: [
            { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
            { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
            { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
            { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        ],
    },

    projects: [
        {
            id: 'project-1',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            name: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and an intuitive admin dashboard. Built for scalability and performance.',
            duration: '3 months',
            collaborators: 'Solo Project',
            techStack: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
            detailContent: '<p>This e-commerce platform was designed to handle thousands of concurrent users with real-time inventory updates. The front-end leverages Vue.js for a reactive user experience, while the Node.js backend ensures fast API responses.</p><p>Key features include a customizable product catalog, secure checkout with Stripe integration, order tracking, and a comprehensive admin dashboard for managing products, orders, and analytics.</p><h3>Challenges & Solutions</h3><p>One of the biggest challenges was implementing real-time inventory synchronization across multiple user sessions. I solved this using WebSocket connections that broadcast inventory changes instantly.</p>',
        },
        {
            id: 'project-2',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            name: 'AI Content Generator',
            description: 'An AI-powered content generation tool that helps writers create articles, blog posts, and social media content using advanced language models.',
            duration: '2 months',
            collaborators: 'Team of 3',
            techStack: ['React', 'Python', 'OpenAI', 'FastAPI'],
            detailContent: '<p>This project integrates OpenAI\'s GPT models to help content creators generate high-quality written content. The React front-end provides an intuitive writing interface with real-time AI suggestions.</p><p>Features include template-based content generation, tone adjustment, SEO optimization suggestions, and export to multiple formats.</p>',
        },
        {
            id: 'project-3',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            name: 'Analytics Dashboard',
            description: 'A real-time analytics dashboard that visualizes complex data sets with interactive charts, filterable tables, and automated report generation.',
            duration: '4 months',
            collaborators: 'Team of 5',
            techStack: ['Vue.js', 'D3.js', 'PostgreSQL', 'Docker'],
            detailContent: '<p>Built for a fintech startup, this analytics dashboard processes millions of data points to provide actionable insights. The visualization layer uses D3.js for custom, interactive charts that update in real-time.</p><p>The dashboard supports custom date ranges, drill-down analysis, automated PDF report generation, and role-based access control.</p>',
        },
        {
            id: 'project-4',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
            name: 'Social Media App',
            description: 'A mobile-first social media application with stories, real-time messaging, and a recommendation engine for content discovery.',
            duration: '6 months',
            collaborators: 'Team of 4',
            techStack: ['React Native', 'Firebase', 'Redis', 'TensorFlow'],
            detailContent: '<p>This social media app was built from the ground up with a focus on user engagement and content discovery. The recommendation engine uses TensorFlow to suggest relevant content based on user behavior.</p><p>Key features include ephemeral stories, real-time messaging with read receipts, content moderation using AI, and push notifications.</p>',
        },
    ],

    education: [
        {
            id: 'edu-1',
            school: 'University of Technology',
            degree: 'Bachelor of Computer Science',
            period: '2020 — 2024',
            description: 'Focused on software engineering, data structures, and web technologies. Graduated with honors.',
        },
        {
            id: 'edu-2',
            school: 'Digital Academy',
            degree: 'Full-Stack Web Development Bootcamp',
            period: '2019 — 2020',
            description: 'Intensive 6-month program covering modern web technologies, agile methodologies, and real-world project development.',
        },
        {
            id: 'edu-3',
            school: 'High School of Science',
            degree: 'Science Major',
            period: '2017 — 2020',
            description: 'Academic excellence with focus on mathematics and physics. Active in programming club and science olympiad.',
        },
    ],

    experiences: [
        {
            id: 'exp-1',
            company: 'TechCorp Solutions',
            logo: '',
            position: 'Frontend Developer',
            type: 'Full-time',
            duration: 'Jan 2024 — Present',
            learnings: ['Advanced Vue.js patterns', 'Micro-frontend architecture', 'Performance optimization', 'Team leadership'],
            projects: ['Enterprise Dashboard', 'Client Portal Redesign'],
            description: 'Leading frontend development for enterprise applications, implementing modern UI patterns and optimizing performance.',
        },
        {
            id: 'exp-2',
            company: 'StartupHub',
            logo: '',
            position: 'Full Stack Developer Intern',
            type: 'Intern',
            duration: 'Jun 2023 — Dec 2023',
            learnings: ['REST API design', 'Database optimization', 'Agile workflow', 'CI/CD pipelines'],
            projects: ['Inventory Management System', 'Customer Analytics Tool'],
            description: 'Developed full-stack features for SaaS products, from database design to frontend implementation.',
        },
        {
            id: 'exp-3',
            company: 'Creative Digital Agency',
            logo: '',
            position: 'Web Developer Intern',
            type: 'Intern',
            duration: 'Jan 2023 — May 2023',
            learnings: ['Responsive design', 'Animation libraries', 'Client communication', 'WordPress development'],
            projects: ['Agency Website Redesign', 'E-commerce Client Sites'],
            description: 'Built responsive websites for agency clients, focusing on animation and interactive user experiences.',
        },
    ],

    gallery: [
        { id: 'gal-1', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop', caption: 'Mountain Sunrise' },
        { id: 'gal-2', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', caption: 'Forest Path' },
        { id: 'gal-3', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop', caption: 'Waterfall' },
        { id: 'gal-4', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop', caption: 'Lake Reflection' },
        { id: 'gal-5', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop', caption: 'Misty Valley' },
        { id: 'gal-6', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop', caption: 'Deep Forest' },
        { id: 'gal-7', src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop', caption: 'Ocean Waves' },
        { id: 'gal-8', src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&h=400&fit=crop', caption: 'Sunset Silhouette' },
    ],

    contact: {
        headline: "LET'S COLLABORATE",
        email: 'hello@felixdiwangkara.com',
    },
}

export const useContentStore = defineStore('content', () => {
    const hero = ref({ ...defaultData.hero })
    const projects = ref([...defaultData.projects])
    const education = ref([...defaultData.education])
    const experiences = ref([...defaultData.experiences])
    const gallery = ref([...defaultData.gallery])
    const contact = ref({ ...defaultData.contact })

    function loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('portfolio-content')
            if (saved) {
                const data = JSON.parse(saved)
                if (data.hero) hero.value = data.hero
                if (data.projects) projects.value = data.projects
                if (data.education) education.value = data.education
                if (data.experiences) experiences.value = data.experiences
                if (data.gallery) gallery.value = data.gallery
                if (data.contact) contact.value = data.contact
            }
        } catch (e) {
            console.warn('Failed to load from localStorage:', e)
        }
    }

    function saveToLocalStorage() {
        try {
            const data = {
                hero: hero.value,
                projects: projects.value,
                education: education.value,
                experiences: experiences.value,
                gallery: gallery.value,
                contact: contact.value,
            }
            localStorage.setItem('portfolio-content', JSON.stringify(data))
        } catch (e) {
            console.warn('Failed to save to localStorage:', e)
        }
    }

    function resetToDefaults() {
        hero.value = JSON.parse(JSON.stringify(defaultData.hero))
        projects.value = JSON.parse(JSON.stringify(defaultData.projects))
        education.value = JSON.parse(JSON.stringify(defaultData.education))
        experiences.value = JSON.parse(JSON.stringify(defaultData.experiences))
        gallery.value = JSON.parse(JSON.stringify(defaultData.gallery))
        contact.value = JSON.parse(JSON.stringify(defaultData.contact))
        localStorage.removeItem('portfolio-content')
    }

    // Auto-load on store creation
    loadFromLocalStorage()

    return {
        hero,
        projects,
        education,
        experiences,
        gallery,
        contact,
        loadFromLocalStorage,
        saveToLocalStorage,
        resetToDefaults,
    }
})
