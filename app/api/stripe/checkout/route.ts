import { stripe } from '@/lib/stripe';
import { getUserFromRequest } from '@/lib/auth';
import { handleError, HttpError } from '@/lib/errors';
import { checkoutSchema } from '@/modules/order/order.validation';
import { userRepo } from '@/modules/user/user.repo';

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    const { priceId, mode, quantity, type, credits } = parsed.data;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    const user = await userRepo.findById(userId);
    if (!user) throw new HttpError(404, 'User not found');

    const session = await stripe.checkout.sessions.create({
      mode,
      customer_email: user.email,
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        userId,
        type,
        ...(credits ? { credits: String(credits) } : {}),
      },
    });

    return Response.json({ url: session.url });
  } catch (error: unknown) {
    return handleError(error);
  }
}
