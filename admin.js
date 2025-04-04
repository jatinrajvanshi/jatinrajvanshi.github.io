document.addEventListener('alpine:init', () => {
    Alpine.data('projectManager', () => ({
        showModal: false,
        projects: {},
        currentProject: null,
        formData: {
            title: '',
            problem: '',
            solution: '',
            impact: '',
            status: 'In Progress',
            teamInput: '',
            section: '',
            links: {
                github: '',
                docs: '',
                demo: ''
            }
        },

        init() {
            // Load projects from localStorage or use default projects
            const storedProjects = localStorage.getItem('telus-projects');
            if (storedProjects) {
                this.projects = JSON.parse(storedProjects);
            } else {
                // Initialize with existing projects from app.js
                fetch('app.js')
                    .then(response => response.text())
                    .then(text => {
                        const projectsMatch = text.match(/projects:\s*({[\s\S]*?}),\s*init/);
                        if (projectsMatch) {
                            // Extract and parse the projects object
                            const projectsStr = projectsMatch[1].replace(/'/g, '"');
                            try {
                                this.projects = JSON.parse(projectsStr);
                                this.saveToLocalStorage();
                            } catch (e) {
                                console.error('Error parsing projects:', e);
                                this.projects = {};
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error loading projects:', error);
                        this.projects = {};
                    });
            }
        },

        showProjectForm() {
            this.resetForm();
            this.showModal = true;
        },

        resetForm() {
            this.formData = {
                title: '',
                problem: '',
                solution: '',
                impact: '',
                status: 'In Progress',
                teamInput: '',
                section: '',
                links: {
                    github: '',
                    docs: '',
                    demo: ''
                }
            };
        },

        editProject(id) {
            this.currentProject = id;
            const project = this.projects[id];
            this.formData = {
                title: project.title,
                problem: project.problem,
                solution: project.solution,
                impact: project.impact,
                status: project.status || 'In Progress',
                teamInput: project.team.join(', '),
                section: project.section || '',
                links: {
                    github: project.links?.github || '',
                    docs: project.links?.docs || '',
                    demo: project.links?.demo || ''
                }
            };
            this.showModal = true;
        },

        deleteProject(id) {
            if (confirm('Are you sure you want to delete this project?')) {
                delete this.projects[id];
                this.saveToLocalStorage();
            }
        },

        saveProject() {
            const projectId = this.currentProject || this.generateProjectId(this.formData.title);
            
            this.projects[projectId] = {
                title: this.formData.title,
                problem: this.formData.problem,
                solution: this.formData.solution,
                impact: this.formData.impact,
                status: this.formData.status,
                section: this.formData.section,
                team: this.formData.teamInput.split(',').map(member => member.trim()).filter(Boolean),
                links: {
                    github: this.formData.links.github,
                    docs: this.formData.links.docs,
                    demo: this.formData.links.demo
                }
            };

            this.saveToLocalStorage();
            this.showModal = false;
            this.currentProject = null;
        },

        generateProjectId(title) {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        },

        saveToLocalStorage() {
            localStorage.setItem('telus-projects', JSON.stringify(this.projects));
        },

        publishChanges() {
            // Save current changes to localStorage
            this.saveToLocalStorage();

            // Create and dispatch a custom event that the main page will listen for
            const event = new CustomEvent('projectsUpdated', {
                detail: { timestamp: new Date().getTime() }
            });
            window.dispatchEvent(event);

            // If the main page is open in another tab, send it a message
            if (window.BroadcastChannel) {
                const bc = new BroadcastChannel('telus-projects-channel');
                bc.postMessage({ type: 'refresh', timestamp: new Date().getTime() });
            }

            // Show success message
            alert('Changes published successfully! The main page will be updated.');
        }
    }));
});
