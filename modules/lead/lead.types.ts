import { InferSelectModel } from 'drizzle-orm';
import { leadTable } from './lead.schema';

export type Lead = InferSelectModel<typeof leadTable>;

export interface CreateLeadInput {
  email: string;
  tierInterest: 'free' | 'pro';
  signupSource?: string | null;
}

export interface UpsertProLeadInput {
  email: string;
  githubUsername: string;
  signupSource?: string | null;
}
