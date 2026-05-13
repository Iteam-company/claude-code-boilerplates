import crypto from 'crypto';
import React from 'react';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { invitationRepo } from './invitation.repo';
import { orgMemberRepo } from '@/modules/orgMember/orgMember.repo';
import { OrgRole } from '@/modules/orgMember/orgMember.schema';
import { userRepo } from '@/modules/user/user.repo';
import { HttpError } from '@/lib/errors/http-error';
import { emailService, APP_NAME, BASE_URL } from '@/lib/email';
import { InvitationEmail } from '@/emails/invitation-email';
import { InvitationDetails } from './invitation.types';

const JWT_SECRET = process.env.JWT_SECRET!;

export const invitationService = {
  send: async (
    orgId: string,
    email: string,
    role: OrgRole,
    invitedByUserId: string,
  ) => {
    const requester = await orgMemberRepo.findByOrgAndUser(
      orgId,
      invitedByUserId,
    );
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    if (requester.role !== 'owner' && requester.role !== 'admin') {
      throw new HttpError(403, 'Only admins and owners can send invitations');
    }

    const existingMember = await orgMemberRepo.findByOrgId(orgId);
    const alreadyMember = existingMember.some((m) => m.user.email === email);
    if (alreadyMember)
      throw new HttpError(409, 'User is already a member of this organization');

    const pendingInvite = await invitationRepo.findPendingByEmail(orgId, email);
    if (pendingInvite)
      throw new HttpError(
        409,
        'A pending invitation for this email already exists',
      );

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const inviter = await userRepo.findById(invitedByUserId);

    await emailService.sendEmail({
      to: email,
      subject: `You've been invited to join an organization on ${APP_NAME}`,
      react: React.createElement(InvitationEmail, {
        appName: APP_NAME,
        invitedByEmail: inviter?.email ?? 'A team member',
        acceptUrl: `${BASE_URL}/accept-invite?token=${token}`,
      }),
    });

    await invitationRepo.create({
      orgId,
      email,
      role,
      token,
      invitedByUserId,
      expiresAt,
    });
  },

  getDetails: async (token: string): Promise<InvitationDetails> => {
    const invitation = await invitationRepo.findByToken(token);
    if (!invitation) throw new HttpError(404, 'Invitation not found');
    if (invitation.status !== 'pending')
      throw new HttpError(410, 'This invitation has already been used');
    if (invitation.expiresAt < new Date())
      throw new HttpError(410, 'This invitation has expired');

    const existingUser = await userRepo.findByEmail(invitation.email);

    return {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      organization: invitation.organization,
      isNewUser: !existingUser,
    };
  },

  accept: async (token: string, password?: string) => {
    const invitation = await invitationRepo.findByToken(token);
    if (!invitation) throw new HttpError(404, 'Invitation not found');
    if (invitation.status !== 'pending')
      throw new HttpError(410, 'This invitation has already been used');
    if (invitation.expiresAt < new Date())
      throw new HttpError(410, 'This invitation has expired');

    let existingUser = await userRepo.findByEmail(invitation.email);

    if (!existingUser) {
      if (!password)
        throw new HttpError(400, 'Password is required to create your account');
      const passwordHash = await bcrypt.hash(password, 10);
      existingUser = await userRepo.create({
        email: invitation.email,
        passwordHash,
      });
    }

    const alreadyMember = await orgMemberRepo.findByOrgAndUser(
      invitation.orgId,
      existingUser.id,
    );
    if (!alreadyMember) {
      await orgMemberRepo.create({
        orgId: invitation.orgId,
        userId: existingUser.id,
        role: invitation.role,
      });
    }

    await invitationRepo.accept(invitation.id);

    const jwtToken = jwt.sign({ userId: existingUser.id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    const { passwordHash: _, ...safeUser } = existingUser;

    return { user: safeUser, token: jwtToken };
  },

  listPending: async (orgId: string, requesterId: string) => {
    const requester = await orgMemberRepo.findByOrgAndUser(orgId, requesterId);
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    if (requester.role !== 'owner' && requester.role !== 'admin') {
      throw new HttpError(403, 'Only admins and owners can view invitations');
    }
    return invitationRepo.findPendingByOrgId(orgId);
  },

  cancel: async (invitationId: string, orgId: string, requesterId: string) => {
    const requester = await orgMemberRepo.findByOrgAndUser(orgId, requesterId);
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    if (requester.role !== 'owner' && requester.role !== 'admin') {
      throw new HttpError(403, 'Only admins and owners can cancel invitations');
    }
    await invitationRepo.delete(invitationId);
  },
};
