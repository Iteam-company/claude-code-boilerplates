import { userTable } from '@/modules/user/user.schema';
import { orderTable } from '@/modules/order/order.schema';
import { orderRelations } from '@/modules/order/order.relations';
import { subscriptionTable } from '@/modules/subscription/subscription.schema';
import { subscriptionRelations } from '@/modules/subscription/subscription.relations';
import { creditTransactionTable } from '@/modules/credit/credit.schema';
import { creditTransactionRelations } from '@/modules/credit/credit.relations';

export const schema = {
  userTable,
  orderTable,
  orderRelations,
  subscriptionTable,
  subscriptionRelations,
  creditTransactionTable,
  creditTransactionRelations,
};
