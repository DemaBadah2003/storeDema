import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

// GET — جلب الطلبات
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const isAdmin = session.user.roleSlug === "admin";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        include: {
          product: {
            select: { nameAr: true, image: true, price: true },
          },
        },
      },
    },
  });

  return NextResponse.json(orders);
}

// DELETE — حذف طلب
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  }

  const isAdmin = session.user.roleSlug === "admin";

  const order = await prisma.order.findFirst({
    where: {
      id,
      ...(!isAdmin && { userId: session.user.id }),
    },
  });

  if (!order) {
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
  }

  await prisma.$transaction([
    prisma.orderItem.deleteMany({ where: { orderId: id } }),
    prisma.order.delete({ where: { id } }),
  ]);

  return NextResponse.json({ success: true });
}