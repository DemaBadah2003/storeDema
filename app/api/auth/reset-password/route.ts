import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { sendEmail } from '@/services/send-email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            'If an account with that email exists, a password reset link has been sent.',
        },
        { status: 200 },
      );
    }

    const token = crypto.randomBytes(32).toString('hex');

    await prisma.verificationToken.deleteMany({
      where: {
        identifier: user.id,
      },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: user.id,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/change-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      content: {
        title: `Hello, ${user.name}`,
        subtitle:
          'You requested a password reset. Click the below link to reset your password',
        buttonLabel: 'Reset password',
        buttonUrl: resetUrl,
        description:
          'This link is valid for 1 hour. If you did not request this email you can safely ignore it.',
      },
    });

    return NextResponse.json(
      {
        message:
          'If an account with that email exists, a password reset link has been sent.',
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error('Password reset error:', err);
    return NextResponse.json(
      { message: 'Failed to process request.' },
      { status: 500 },
    );
  }
}