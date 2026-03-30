import mermaid from 'mermaid';

document.addEventListener('DOMContentLoaded', () => {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
            fontFamily: '"Dank Mono", monospace',
        },
    });

    // Inject global classDefs so they work everywhere without Astro cache invalidation
    document.querySelectorAll('.mermaid').forEach((el) => {
        let content = el.textContent;
        if (
            content &&
            (content.includes('flowchart') || content.includes('graph'))
        ) {
            const lines = content.split('\n');
            lines.splice(
                1,
                0,
                `
    classDef primary fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff;
    classDef secondary fill:#4b5563,stroke:#374151,stroke-width:2px,color:#ffffff;
    classDef accent fill:#eab308,stroke:#ca8a04,stroke-width:2px,color:#000000;
    classDef info fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#000000;
    classDef success fill:#22c55e,stroke:#16a34a,stroke-width:2px,color:#000000;
    classDef warning fill:#f97316,stroke:#ea580c,stroke-width:2px,color:#000000;
    classDef danger fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff;
            `,
            );
            el.textContent = lines.join('\n');
        }
    });

    mermaid
        .run({ nodes: document.querySelectorAll('.mermaid') })
        .catch(() => { });
});
