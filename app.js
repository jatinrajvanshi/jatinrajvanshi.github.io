document.addEventListener('alpine:init', () => {
    Alpine.data('showcase', () => ({
        mobileMenuOpen: false,
        showModal: false,
        selectedProject: null,
        scrolled: false,
        projects: {
            'customer-service-ai': {
                title: 'Customer Service AI',
                problem: 'Customer support teams were overwhelmed with repetitive queries, leading to longer response times and reduced efficiency.',
                solution: 'Developed a production-ready chatbot with custom UI and RAG-based knowledge integration, capable of handling common customer inquiries automatically.',
                impact: 'Reduced response time by 60%, improved customer satisfaction scores by 35%, and allowed support staff to focus on complex issues.',
                links: {
                    docs: 'https://docs.google.com/document/d/customer-service-ai',
                    github: 'https://github.com/telus/customer-service-ai'
                },
                team: ['Alice Kim', 'Sarah Brown', 'David Chen']
            },
            'internal-knowledge-assistant': {
                title: 'Internal Knowledge Assistant',
                problem: 'Teams struggled to quickly access and utilize vast amounts of internal documentation and knowledge.',
                solution: 'Built a RAG-powered internal assistant that integrates with multiple knowledge bases and provides contextual responses.',
                impact: 'Reduced time spent searching for information by 45%, improved knowledge sharing across teams.',
                links: {
                    docs: 'https://docs.google.com/document/d/internal-knowledge-assistant',
                    github: 'https://github.com/telus/internal-knowledge-assistant'
                },
                team: ['Raj Patel', 'Maria Lopez', 'Mike Thompson']
            },
            'advanced-llm-research': {
                title: 'Advanced LLM Research',
                problem: 'Need to evaluate and implement cutting-edge language models for various TELUS services.',
                solution: 'Conducting systematic research on latest LLM developments, fine-tuning models, and creating evaluation frameworks.',
                impact: 'Identified 3 promising model architectures, reduced inference costs by 40%.',
                links: {
                    docs: 'https://docs.google.com/document/d/llm-research',
                    github: 'https://github.com/telus/llm-research'
                },
                team: ['David Chen', 'Alice Kim']
            },
            'framework-innovation': {
                title: 'Framework Innovation',
                problem: 'Existing AI frameworks were not optimized for TELUS specific use cases and scale.',
                solution: 'Developing custom AI frameworks and tools tailored to TELUS infrastructure and requirements.',
                impact: 'Reduced deployment time by 50%, improved model performance by 25%.',
                links: {
                    docs: 'https://docs.google.com/document/d/framework-innovation',
                    github: 'https://github.com/telus/ai-framework'
                },
                team: ['Raj Patel', 'Maria Lopez']
            },
            'mlops-framework': {
                title: 'MLOps Framework',
                problem: 'Inconsistent deployment and monitoring practices across ML projects.',
                solution: 'Created a standardized MLOps framework with automated testing, deployment, and monitoring.',
                impact: 'Reduced deployment errors by 75%, improved model monitoring coverage by 100%.',
                links: {
                    docs: 'https://docs.google.com/document/d/mlops-framework',
                    github: 'https://github.com/telus/mlops-framework'
                },
                team: ['Alice Kim', 'David Chen', 'Mike Thompson']
            },
            'llmops-platform': {
                title: 'LLMOps Platform',
                problem: 'Managing and deploying LLMs required significant manual effort and expertise.',
                solution: 'Building a comprehensive platform for LLM deployment, monitoring, and optimization.',
                impact: 'Beta testing shows 60% reduction in LLM deployment time, 30% cost optimization.',
                links: {
                    docs: 'https://docs.google.com/document/d/llmops-platform',
                    github: 'https://github.com/telus/llmops-platform'
                },
                team: ['Maria Lopez', 'Raj Patel', 'Sarah Brown']
            },
            'fraud-detection': {
                title: 'Fraud Detection System',
                problem: 'Rising fraud cases and manual review processes were causing significant financial losses.',
                solution: 'Implemented advanced ML models for real-time fraud detection and prevention.',
                impact: 'Reduced fraud losses by 65%, improved detection accuracy to 96%.',
                links: {
                    docs: 'https://docs.google.com/document/d/fraud-detection',
                    github: 'https://github.com/telus/fraud-detection'
                },
                team: ['David Chen', 'Alice Kim', 'John Smith']
            },
            'cash-flow-prediction': {
                title: 'Cash Flow Prediction',
                problem: 'Inaccurate cash flow forecasting led to suboptimal financial planning.',
                solution: 'Developed ML models for accurate cash flow prediction using historical data and market indicators.',
                impact: 'Improved forecast accuracy by 40%, archived due to system integration challenges.',
                links: {
                    docs: 'https://docs.google.com/document/d/cash-flow-prediction',
                    github: 'https://github.com/telus/cash-flow-prediction'
                },
                team: ['Maria Lopez', 'Sarah Brown']
            }
        },
        init() {
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
            });

            this.setupIntersectionObserver();
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
