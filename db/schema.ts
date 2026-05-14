import { userTable } from '@/modules/user/user.schema';
import { orderTable } from '@/modules/order/order.schema';
import { orderRelations } from '@/modules/order/order.relations';
import { subscriptionTable } from '@/modules/subscription/subscription.schema';
import { subscriptionRelations } from '@/modules/subscription/subscription.relations';
import { creditTransactionTable } from '@/modules/credit/credit.schema';
import { creditTransactionRelations } from '@/modules/credit/credit.relations';
import { organizationTable } from '@/modules/organization/organization.schema';
import { organizationRelations } from '@/modules/organization/organization.relations';
import {
  orgMemberTable,
  orgRoleEnum,
} from '@/modules/orgMember/orgMember.schema';
import { orgMemberRelations } from '@/modules/orgMember/orgMember.relations';
import {
  invitationTable,
  invitationStatusEnum,
} from '@/modules/invitation/invitation.schema';
import { invitationRelations } from '@/modules/invitation/invitation.relations';

export const schema = {
  userTable,
  orderTable,
  orderRelations,
  subscriptionTable,
  subscriptionRelations,
  creditTransactionTable,
  creditTransactionRelations,
  organizationTable,
  organizationRelations,
  orgMemberTable,
  orgRoleEnum,
  orgMemberRelations,
  invitationTable,
  invitationStatusEnum,
  invitationRelations,
};
