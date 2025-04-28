// Initial initiatives data
const INITIAL_INITIATIVES = [
    {
        "id": "init1",
        "name": "AIGT Website",
        "intendedOutcome": "PoC / new technologies documentation on website / template and best practices sharing"
    },
    {
        "id": "init2",
        "name": "Translations - New Language",
        "intendedOutcome": "More than French on Translations Copilot"
    },
    {
        "id": "init3",
        "name": "Translations - Front-end",
        "intendedOutcome": "A new UI for Translations"
    },
    {
        "id": "init4",
        "name": "Multi-model - Voice",
        "intendedOutcome": "Next Steps on Voice POC"
    },
    {
        "id": "init5",
        "name": "Multi-model - Video",
        "intendedOutcome": "Next Steps on Video POC"
    },
    {
        "id": "init6",
        "name": "Multi-model - Image",
        "intendedOutcome": "Next Steps on Image POC"
    },
    {
        "id": "init7",
        "name": "CSV Analysis",
        "intendedOutcome": "Code generation or other techniques to analyze CSVs better/ related to add-on as well"
    },
    {
        "id": "init8",
        "name": "TELUS Branded Slides",
        "intendedOutcome": "A way to generate Google Slides with TELUS branding"
    },
    {
        "id": "init9",
        "name": "Google New Embedding Model Eval",
        "intendedOutcome": "Is this a goof replcamenet/or fallback to current embedding model"
    },
    {
        "id": "init10",
        "name": "Chatbot Analytics",
        "intendedOutcome": "Working with FueliX team to help on Copilot analytics idea"
    },
    {
        "id": "init11",
        "name": "Google Sheet's Add-on",
        "intendedOutcome": "Further improvment vs Pause"
    },
    {
        "id": "init12",
        "name": "A2A",
        "intendedOutcome": "Research on if agent 2 agenet protocal is useful and how it compares with MCP"
    },
    {
        "id": "init13",
        "name": "Agent Development Kit",
        "intendedOutcome": "Test it out and create agents and see how it works"
    },
    {
        "id": "init14",
        "name": "Tcom 2.0",
        "intendedOutcome": "beyond support, improved user experience across all channels"
    },
    {
        "id": "init15",
        "name": "On-edge AI",
        "intendedOutcome": "Test a POC for on-device AI"
    },
    {
        "id": "init16",
        "name": "GenAI Envrioment",
        "intendedOutcome": "Getting all steps done for setting up the enviorement"
    },
    {
        "id": "init17",
        "name": "Arize",
        "intendedOutcome": "Complete the onboarding"
    },
    {
        "id": "init18",
        "name": "MLOps Components",
        "intendedOutcome": "Updating the components and its maintainacne"
    },
    {
        "id": "init19",
        "name": "Unicorn Maintainance",
        "intendedOutcome": "Making sure unicorn is up and running"
    },
    {
        "id": "init20",
        "name": "UI New Hire",
        "intendedOutcome": "For Comms, Pulsecheck, CRTC, etc."
    },
    {
        "id": "init21",
        "name": "MLOps Deployment Manage",
        "intendedOutcome": "Manage model deployments"
    },
    {
        "id": "init22",
        "name": "Migration to GenAI Enviorement",
        "intendedOutcome": "Migration of use-cases to new enviorement seutp"
    },
    {
        "id": "init23",
        "name": "GenAI Enviorement scale",
        "intendedOutcome": "Work with Alex R's team to grow envs at scale"
    },
    {
        "id": "init24",
        "name": "MDM POC",
        "intendedOutcome": "classify databases using the existing Metadata (descriptions, relations, ...)"
    },
    {
        "id": "init25",
        "name": "RAG Enhancement - Crossencoder",
        "intendedOutcome": "Crossencoder"
    },
    {
        "id": "init26",
        "name": "RAG Enhancement - RAPTOR",
        "intendedOutcome": "RAPTOR"
    },
    {
        "id": "init27",
        "name": "RAG Enhancement - CRAG",
        "intendedOutcome": "CRAG"
    },
    {
        "id": "init28",
        "name": "CRTC",
        "intendedOutcome": "Make changes to start rollout in production"
    },
    {
        "id": "init29",
        "name": "Habitat",
        "intendedOutcome": "Make changes to start rollout in production"
    },
    {
        "id": "init30",
        "name": "Legal Amendement",
        "intendedOutcome": "Further research possibility check"
    },
    {
        "id": "init31",
        "name": "Story Mining Copilot",
        "intendedOutcome": "Formatting changes in endpoint"
    },
    {
        "id": "init32",
        "name": "PM/Koodo",
        "intendedOutcome": "Make data ingestion changes and work with FueliX for migration to Customer assistant"
    },
    {
        "id": "init33",
        "name": "Embedding fallback",
        "intendedOutcome": "Identifying the fallback mechanism use-cases specific for embedding"
    },
    {
        "id": "init34",
        "name": "Inference Model fallback",
        "intendedOutcome": "Identifying the fallback mechanism use-cases specific for inference"
    },
    {
        "id": "init35",
        "name": "Koodo/PM Handover",
        "intendedOutcome": "Handover plan and execution"
    },
    {
        "id": "init36",
        "name": "MILO Handover",
        "intendedOutcome": "Handover plan and execution"
    },
    {
        "id": "init37",
        "name": "Cohere Compass",
        "intendedOutcome": "Research and Evaluate"
    },
    {
        "id": "init38",
        "name": "Cohere Embedding Model",
        "intendedOutcome": "Research and Evaluate"
    }
];

// Load initiatives
function loadInitiatives() {
    return INITIAL_INITIATIVES;
}

// Create initiative card element
function createInitiativeCard(initiative) {
    const card = document.createElement('div');
    card.className = 'initiative-card';
    card.draggable = true;
    card.id = initiative.id;
    card.innerHTML = `
        <h3>${initiative.name}</h3>
        <p>${initiative.intendedOutcome}</p>
    `;

    // Add drag event listeners
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Initialize the board
function initializeBoard() {
    const initiatives = loadInitiatives();
    const initiativesList = document.getElementById('initiatives-list');
    
    // Load saved state from localStorage
    const savedState = JSON.parse(localStorage.getItem('boardState')) || {};
    
    // Create cards for each initiative
    initiatives.forEach(initiative => {
        const card = createInitiativeCard(initiative);
        
        // Check if this initiative has a saved position
        if (savedState[initiative.id]) {
            const { team, quarter } = savedState[initiative.id];
            const targetDropzone = document.querySelector(
                `.quarter[data-team="${team}"][data-quarter="${quarter}"] .dropzone`
            );
            if (targetDropzone) {
                targetDropzone.appendChild(card);
                return;
            }
        }
        
        // If no saved position or target not found, add to initiatives list
        initiativesList.appendChild(card);
    });

    // Initialize dropzones
    setupDropzones();
}

// Drag and Drop Handlers
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.dropzone').forEach(dropzone => {
        dropzone.classList.remove('dragover');
        dropzone.classList.remove('valid-target');
        dropzone.classList.remove('invalid-target');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const dropzone = e.target.closest('.dropzone');
    if (dropzone) {
        dropzone.classList.add('dragover');
    }
}

function handleDragEnter(e) {
    const dropzone = e.target.closest('.dropzone');
    if (dropzone) {
        dropzone.classList.add('valid-target');
    }
}

function handleDragLeave(e) {
    const dropzone = e.target.closest('.dropzone');
    if (dropzone) {
        dropzone.classList.remove('dragover');
        dropzone.classList.remove('valid-target');
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    const dropzone = e.target.closest('.dropzone');
    if (!dropzone) return;
    
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Add card to dropzone
    dropzone.appendChild(card);
    
    // Save state to localStorage only if dropped in a quarter dropzone
    const quarterDiv = dropzone.closest('.quarter');
    if (quarterDiv) {
        const team = quarterDiv.dataset.team;
        const quarter = quarterDiv.dataset.quarter;
        
        // Update state with new position
        const state = JSON.parse(localStorage.getItem('boardState')) || {};
        state[cardId] = { team, quarter };
        localStorage.setItem('boardState', JSON.stringify(state));
    } else {
        // If dropped back to initiatives list, remove from state
        const state = JSON.parse(localStorage.getItem('boardState')) || {};
        delete state[cardId];
        localStorage.setItem('boardState', JSON.stringify(state));
    }
    
    // Clean up
    dropzone.classList.remove('dragover');
    dropzone.classList.remove('valid-target');
}

function setupDropzones() {
    document.querySelectorAll('.dropzone').forEach(dropzone => {
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('dragenter', handleDragEnter);
        dropzone.addEventListener('dragleave', handleDragLeave);
        dropzone.addEventListener('drop', handleDrop);
    });
}

function saveState() {
    const state = {};
    document.querySelectorAll('.initiative-card').forEach(card => {
        const dropzone = card.closest('.dropzone');
        if (dropzone) {
            const quarterDiv = dropzone.closest('.quarter');
            state[card.id] = {
                team: quarterDiv.dataset.team,
                quarter: quarterDiv.dataset.quarter
            };
        }
    });
    localStorage.setItem('boardState', JSON.stringify(state));
}

// Initialize the board when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    setupPdfDownload();
    setupGuidelinesPopup();
});

function setupGuidelinesPopup() {
    const helpBtn = document.getElementById('helpBtn');
    const popup = document.getElementById('guidelinesPopup');
    const closeBtn = document.getElementById('closePopup');

    helpBtn.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            popup.style.display = 'none';
        }
    });
}

function setupPdfDownload() {
    const downloadBtn = document.getElementById('downloadPdf');
    downloadBtn.addEventListener('click', generatePdf);
}

function generatePdf() {
    const element = document.body;
    const opt = {
        margin: 10,
        filename: 'TELUS_Prioritization_Board.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save();
}
