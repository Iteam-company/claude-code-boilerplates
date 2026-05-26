import { InferSelectModel } from 'drizzle-orm';
import { leadTable } from './lead.schema';

export type Lead = InferSelectModel<typeof leadTable>;

export interface AddEmailResult {
  alreadyExists: boolean;
  requiresPayment: boolean;
  hasGithub: boolean;
  githubUsername?: string;
  isPro?: boolean;
}

export interface AddGithubResult {
  requiresPayment: boolean;
  inviteSent: boolean;
}

export interface UpsertProLeadInput {
  email: string;
  githubUsername: string;
}
