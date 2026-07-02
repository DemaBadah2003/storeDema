import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ← Promise
) {
  const { id } = await params; // ← await هنا

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const isAdmin = session.user.roleSlug === "admin";
  const targetUserId = isAdmin ? id : session.user.id;

  if (!isAdmin && id !== session.user.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const { items } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "السلة فارغة" }, { status: 400 });
  }

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json(
        { error: `منتج غير موجود: ${item.productId}` },
        { status: 400 }
      );
    }
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `المخزون غير كافٍ: ${product.nameAr}` },
        { status: 400 }
      );
    }
  }

  const totalAmount = items.reduce(
    (sum: number, item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + product.price * item.quantity;
    },
    0
  );

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: targetUserId,
        totalAmount,
        status: "جاري التجهيز",
        items: {
          create: items.map((item: { productId: string; quantity: number }) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
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

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return newOrder;
  });

  return NextResponse.json(order, { status: 201 });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ← Promise
) {
  const { id } = await params; // ← await هنا

  const session = await getServerSession(authOptions);

  if (session?.user?.roleSlug !== "admin") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const { status } = await req.json();

  if (!status) {
    return NextResponse.json({ error: "الحالة مطلوبة" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
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

  return NextResponse.json(order);
}