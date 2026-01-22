export const modules = [
    {
        id: 'policy-finder',
        title: 'AI Assistant – Policy Finder',
        tagline: 'The Shift: From “Ctrl+F” to “Contextual Retrieval”',
        description: 'This is a Hybrid RAG-powered legal search engine for Indian Higher Education.',
        howItWorks: [
            'The engine ingests and indexes: UGC Regulations, AICTE Handbooks, Ministry of Education Circulars',
            'It retrieves exact clauses from official PDFs and answers queries only from verified citations.'
        ],
        impact: [
            'Eliminates hallucinations',
            'Produces 100% citation-backed answers',
            'Provides jurisdiction logic, e.g. "Central UGC regulation likely supersedes State Act here"',
            'Creates a shift: From Ambiguity → Legal Clarity'
        ]
    },
    {
        id: 'verification-engine',
        title: 'Verification Engine – Accreditation Auditor',
        tagline: 'The Shift: From Manual Mapping to AI Auditing',
        description: 'The AI adopts the persona of a strict NAAC peer team auditor (2024 norms).',
        howItWorks: [
            'Users upload: NAAC SSRs, AQARs, NBA reports',
            'Scores the report, detects missing evidence, and flags compliance risks'
        ],
        impact: [
            'Converts a 6-month accreditation review into an instant compliance health check'
        ]
    },
    {
        id: 'creation-engine',
        title: 'Creation Engine – Syllabus Architect',
        tagline: 'The Shift: From Policy Paralysis to Generative Design',
        description: 'Auto-generates credit frameworks, curriculum structures, and exit-award compliant programs.',
        howItWorks: [
            'The AI takes: NEP 2020, NHEQF, Multiple entry/exit rules',
            'And auto-generates compliant program structures'
        ],
        impact: [
            'Moves institutions from “reading policy” to “building policy-compliant programs”'
        ]
    },
    {
        id: 'repository',
        title: 'Repository',
        tagline: 'Regulatory Knowledge Base',
        description: 'A continuously updated Regulatory Knowledge Base.',
        howItWorks: [
            'Contains: UGC Regulations, AICTE Norms, MoE Circulars, University Acts, Accreditation manuals'
        ],
        impact: []
    }
];
