export type CellValue = true | false | 'partial' | string;

export interface FeatureRow {
  key: string;
  free: CellValue;
  pro: CellValue;
  shipfast: CellValue;
  makerkit: CellValue;
  supa: CellValue;
}

export function buildMainRows(isFreeProPlan: boolean): FeatureRow[] {
  return [
    {
      key: 'price',
      free: '$0',
      pro: isFreeProPlan ? '$0–$149' : '$149',
      shipfast: '$199',
      makerkit: '$299–$599',
      supa: '$261–$1,124',
    },
    {
      key: 'openSource',
      free: true,
      pro: 'partial',
      shipfast: false,
      makerkit: false,
      supa: false,
    },
    {
      key: 'stripeCheckout',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'customerPortal',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'auth',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'emailTemplates',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'fileUploads',
      free: true,
      pro: true,
      shipfast: 'partial',
      makerkit: true,
      supa: true,
    },
    {
      key: 'multiTenancy',
      free: false,
      pro: true,
      shipfast: false,
      makerkit: 'Top tier',
      supa: 'Top tier',
    },
  ];
}

export const WORKFLOW_ROWS: FeatureRow[] = [
  {
    key: 'claudeSkills',
    free: '10 core',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'customAgents',
    free: false,
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'mcpConfigs',
    free: 'Basic',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'aiIntegration',
    free: false,
    pro: true,
    shipfast: 'Mentioned',
    makerkit: 'Mentioned',
    supa: 'Mentioned',
  },
];

export const DETAIL_ROWS: FeatureRow[] = [
  {
    key: 'drizzle',
    free: true,
    pro: true,
    shipfast: false,
    makerkit: true,
    supa: true,
  },
  {
    key: 'lifetimeUpdates',
    free: false,
    pro: true,
    shipfast: true,
    makerkit: 'Limited',
    supa: 'Top tier',
  },
  {
    key: 'refundWindow',
    free: 'n/a',
    pro: '14 days',
    shipfast: '14 days',
    makerkit: '30 days',
    supa: '30 days',
  },
  {
    key: 'bestFor',
    free: 'Anyone',
    pro: 'Claude Code users',
    shipfast: 'Indie hackers',
    makerkit: 'Modular stack',
    supa: 'Serious founders',
  },
];

export interface CompetitorNarrativeData {
  narrativeKey: 'shipfast' | 'makerkit' | 'supastarter';
  price: string;
  href: string;
}

export const NARRATIVE_DATA: CompetitorNarrativeData[] = [
  { narrativeKey: 'shipfast', price: '$199', href: '/vs/shipfast' },
  { narrativeKey: 'makerkit', price: '$299–$599', href: '/vs/makerkit' },
  {
    narrativeKey: 'supastarter',
    price: '$261–$1,124',
    href: '/vs/supastarter',
  },
];
