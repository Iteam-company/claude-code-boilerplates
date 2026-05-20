import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { waitlistTable } from './waitlist.schema';

export type WaitlistEntry = InferSelectModel<typeof waitlistTable>;
export type NewWaitlistEntry = InferInsertModel<typeof waitlistTable>;
