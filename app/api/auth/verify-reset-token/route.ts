import { NextResponse } from 'next/server';
import { db as prisma } from '@/utils/db';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify reset token' },
      { status: 500 }
    );
  }
}