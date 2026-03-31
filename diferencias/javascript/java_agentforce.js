const treeData = {
    start: {
        q: "¿El problema principal involucra interacción/atención con clientes?",
        options: [{ t: "No", next: "agentforce_int" }, { t: "Sí", next: "step2" }]
    },
    agentforce_int: {
        title: "Agentforce",
        desc: "Ideal para automatización interna y flujos de CRM que no buscan intenciones con el cliente.",
        isFinal: true
    },
    step2: {
        q: "¿Hay atención en tiempo real con agentes humanos?",
        options: [{ t: "No", next: "agentforce_auto" }, { t: "Sí", next: "step3" }]
    },
    agentforce_auto: {
        title: "Genesys Cloud",
        desc: "Sus capacidades de IA estan optimizadas para apoyar en el autoservicio y acciones automáticas.",
        isFinal: true
    },
    step3: {
        q: "¿Hay múltiples canales (Voz, WhatsApp, Email, etc.)?",
        options: [{ t: "No", next: "roadmap" }, { t: "Sí", next: "step4" }]
    },
    roadmap: {
        title: "Depende del Roadmap",
        desc: "Genesys para escalamiento y omnicanalidad",
        isFinal: true
    },
    step4: {
        q: "¿Existen SLAs, colas, routing, WFM o QA?",
        options: [{ t: "Sí", next: "genesys" }, { t: "No", next: "step5" }]
    },
    genesys: {
        title: "Genesys Cloud CX",
        desc: "La solución indiscutible para operaciones complejas de Costumer Experiencie.",
        isFinal: true
    },
    step5: {
        q: "¿El cliente es Salesforce-first?",
        options: [{ t: "Sí", next: "both" }, { t: "No", next: "genesys_pure" }]
    },
    both: {
        title: "Genesys Cloud + Agentforce",
        desc: "Arquitectura híbrida: Orquestación de CX líder + Automatización nativa de CRM.",
        isFinal: true
    },
    genesys_pure: {
        title: "Genesys Cloud CX",
        desc: "Enfoque CRM-agnóstico centrado en la excelencia del Customer Journey.",
        isFinal: true
    }
};

function renderNode(id) {
    const node = treeData[id];
    const container = document.getElementById('tree-container');

    if (node.isFinal) {
        showModal(node.title, node.desc);
        return;
    }

    const div = document.createElement('div');
    div.className = 'step-node';
    div.innerHTML = `<h2>${node.q}</h2><div class="btn-group" id="group-${id}"></div>`;
    container.appendChild(div);

    const btnGroup = div.querySelector('.btn-group');
    node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.t;
        btn.onclick = function() {
            // Desactivar otros botones del mismo grupo
            Array.from(btnGroup.children).forEach(b => b.disabled = true);
            btn.classList.add('selected');
            renderNode(opt.next);
        };
        btnGroup.appendChild(btn);
    });

    // Scroll automático hacia abajo para ver el nuevo nodo
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function showModal(title, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

// Iniciar el árbol
renderNode('start');