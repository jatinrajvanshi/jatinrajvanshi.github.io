document.addEventListener('alpine:init', () => {
    Alpine.data('showcase', () => ({
        mobileMenuOpen: false,
        showModal: false,
        selectedProject: null,
        scrolled: false,
        projects: {},
        init() {
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
            });

            this.setupIntersectionObserver();
            this.loadProjects();
        },

        loadProjects() {
            const storedProjects = localStorage.getItem('telus-projects');
            if (storedProjects) {
                this.projects = JSON.parse(storedProjects);
            }

            // Listen for project updates from the admin page
            window.addEventListener('projectsUpdated', () => {
                this.refreshProjects();
            });

            // Listen for updates from other tabs
            if (window.BroadcastChannel) {
                const bc = new BroadcastChannel('telus-projects-channel');
                bc.onmessage = (event) => {
                    if (event.data.type === 'refresh') {
                        this.refreshProjects();
                    }
                };
            }
        },

        refreshProjects() {
            const updatedProjects = localStorage.getItem('telus-projects');
            if (updatedProjects) {
                this.projects = JSON.parse(updatedProjects);
                // If a project is currently selected, update its data
                if (this.selectedProject) {
                    const updatedProject = this.projects[this.selectedProject.id];
                    if (updatedProject) {
                        this.selectedProject = updatedProject;
                    } else {
                        // If the selected project no longer exists, close the modal
                        this.closeModal();
                    }
                }
            }
        },

        selectProject(projectId) {
            this.selectedProject = { ...this.projects[projectId], id: projectId };
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.selectedProject = null;
        },
        setupIntersectionObserver() {
            // Make elements visible by default
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.style.opacity = '1';
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        // Ensure children are visible
                        entry.target.querySelectorAll('.bg-white').forEach(child => {
                            child.style.opacity = '1';
                        });
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '50px'
            });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
    }))
})

// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop - 80 // Adjust for header height
        });
    }
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});
