export interface ConceptMode {
  tag: string;
  title: string;
  desc: string;
  points: string[];
}

export interface GpwsAlert {
  label: string;
  desc: string;
}

export interface ScreenShotMeta {
  key: string;
  label: string;
}

export interface ArchTab {
  id: "actor" | "phase" | "mirroring";
  label: string;
  eyebrow: string;
}

export interface StackItem {
  label: string;
  role: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type TroubleshootStatus = "RESOLVED" | "KNOWN LIMITATION";

export interface TroubleshootStep {
  tag: string;
  title: string;
  body: string;
}

export interface TroubleshootCase {
  id: string;
  number: string;
  title: string;
  status: TroubleshootStatus;
  squawk: string;
  steps: TroubleshootStep[];
  verdict?: string;
}

export interface SupportCategory {
  id: "bug" | "feature" | "other";
  label: string;
}

export interface SiteDictionary {
  nav: {
    concept: string;
    screens: string;
    architecture: string;
    privacy: string;
    support: string;
    maintenanceLog: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Accent: string;
    description: string[];
    badgeOs: string;
    badgeStack: string;
  };
  concept: {
    eyebrow: string;
    title: string;
    description: string[];
    modes: ConceptMode[];
    gpwsEyebrow: string;
    gpwsAlerts: GpwsAlert[];
  };
  screens: {
    eyebrow: string;
    title: string;
    description: string[];
    phoneLabel: string;
    watchLabel: string;
    phoneShots: ScreenShotMeta[];
    watchShots: ScreenShotMeta[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    description: string[];
    quoteLabel: string;
    tabs: ArchTab[];
    actor: { quote: string };
    phase: { quote: string[] };
    mirroring: {
      leadingLabel: string;
      followingLabel: string;
      payloadLabel: string;
      quote: string[];
    };
    stack: StackItem[];
  };
  footer: {
    tagline: string;
    description: string[];
    githubLabel: string;
    blogLabel: string;
    bottomLine: string;
  };
  troubleshootingPage: {
    backLabel: string;
    eyebrow: string;
    title: string;
    description: string[];
    resolvedLabel: string;
    limitationLabel: string;
    verdictLabel: string;
  };
  supportPage: {
    backLabel: string;
    eyebrow: string;
    title: string;
    description: string[];
    successTitle: string;
    successBody: string;
    categoryLabel: string;
    categories: SupportCategory[];
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    notConfiguredMsg: string;
    submitErrorMsg: string;
    submitting: string;
    submitLabel: string;
    directEmailPrefix: string;
    faqTitle: string;
    faqFooterPrefix: string;
    faqFooterLinkLabel: string;
    faqFooterSuffix: string;
    subjectNewInquiry: string;
    subjectFromNameSuffix: string;
  };
  faq: FaqItem[];
  troubleshooting: TroubleshootCase[];
}
