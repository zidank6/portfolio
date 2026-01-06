export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  bullets: string[];
};

export const projects: Project[] = [
  {
    title: 'zilean',
    description: 'precision scheduling and alerting for distributed teams',
    tags: ['next.js', 'edge', 'observability', 'postgres'],
    links: [
      { label: 'github', href: 'https://github.com/placeholder/zilean' },
      { label: 'demo', href: 'https://example.com/zilean' }
    ],
    bullets: [
      'latency-aware job orchestration with per-region fallbacks',
      'timeline ui with audit trails and instant rollback',
      'alert routing tuned for on-call signal over noise'
    ]
  },
  {
    title: 'beatrix',
    description: 'design review platform for high-velocity product teams',
    tags: ['react', 'collaboration', 'design systems'],
    links: [
      { label: 'github', href: 'https://github.com/placeholder/beatrix' },
      { label: 'demo', href: 'https://example.com/beatrix' }
    ],
    bullets: [
      'comment threading with visual diff overlays',
      'role-based approvals and structured feedback capture',
      'lightweight snapshots for async stakeholder review'
    ]
  },
  {
    title: 'henley predictor',
    description: 'sports analytics engine for outcome and form forecasting',
    tags: ['typescript', 'ml ops', 'data viz'],
    links: [
      { label: 'github', href: 'https://github.com/placeholder/henley-predictor' },
      { label: 'demo', href: 'https://example.com/henley' }
    ],
    bullets: [
      'ensemble scoring across historical form and matchup data',
      'interactive confidence curves and season overlays',
      'auto-refresh pipeline for matchweek updates'
    ]
  }
];
