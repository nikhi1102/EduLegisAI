export const faqs = [
    {
        category: 'General & Account',
        items: [
            {
                q: 'What is EduLegis AI',
                a: 'EduLegis AI is a Regulatory Intelligence Suite designed for Indian Higher Education institutions. Unlike a standard search engine, it uses specialized AI agents to Find policies, Audit compliance reports, Detect legal conflicts, and Design NEP-compliant curriculums.'
            },
            {
                q: 'Who is this platform for?',
                a: 'It is built for University Deans, Registrars, Accreditation Steering Committees, and Academic Council members who need to navigate complex regulations from UGC, AICTE, and State Governments.'
            },
            {
                q: 'Is my data secure?',
                a: 'Yes. We use enterprise-grade encryption. Reports uploaded to the Accreditation Auditor are processed in memory for scoring and are not stored permanently on our servers after the session ends.'
            }
        ]
    },
    {
        category: 'Policy Finder (Search)',
        items: [
            {
                q: 'How does the AI know the answer? Does it hallucinate?',
                a: 'The Policy Finder uses a RAG (Retrieval-Augmented Generation) architecture. It does not "guess" answers. It strictly retrieves text from our verified database of official PDFs (UGC Regulations, AICTE Handbooks) and generates an answer only based on those citations.'
            },
            {
                q: 'Can I search for State-specific acts?',
                a: 'Currently, our database includes all Central Acts (UGC, AICTE, MoE). We are beta-testing State University Acts for select regions (e.g., Tamil Nadu, Maharashtra).'
            }
        ]
    },
    {
        category: 'Accreditation Auditor (Verify)',
        items: [
            {
                q: 'How is the "Audit Score" calculated?',
                a: 'The AI adopts the persona of a strict NAAC/NBA peer team member. It scans your text for specific "evidence keywords" (e.g., "Solar Panel," "Geotagged Photos," "Feedback Action Report") required by the 2024 Manual. The score reflects the completeness of your claims, not just the quality.'
            },
            {
                q: 'My report got a low score. What should I do?',
                a: 'Check the "Critical Gaps" section in the results. The AI will list specific documents or data points (like "Missing Energy Audit Certificate") that are absent from your narrative. Adding these proofs will improve your score.'
            }
        ]
    },
    {
        category: 'Syllabus Architect (Build)',
        items: [
            {
                q: 'Is the generated syllabus actually compliant with NEP 2020?',
                a: 'Yes. The Architect is programmed with the National Higher Education Qualifications Framework (NHEQF) constraints. It ensures the total credits (e.g., 160 for a 4-year Honors degree) and the mix of Major/Minor/Skill courses mathematically align with NEP norms.'
            },
            {
                q: 'Can I export the syllabus?',
                a: 'Absolutely. You can download the structure as a JSON file for your LMS or a PDF grid for presentation to your Board of Studies.'
            }
        ]
    }
];
