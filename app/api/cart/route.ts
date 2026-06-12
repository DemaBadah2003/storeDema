import { NextResponse } from "next/server";
import  prisma from "@/lib/prisma";

// جلب السلة
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ items: [] });

  const cart = await prisma.cart.findUnique({
    where: { userId: Number(userId) },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json(cart?.items ?? []);
}

// إضافة منتج
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  // جيبي أو أنشئي السلة
  let cart = await prisma.cart.findUnique({
    where: { userId: Number(userId) },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: Number(userId) },
    });
  }

  // هل المنتج موجود في السلة؟
  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: quantity ?? 1,
      },
    });
  }

  return NextResponse.json({ success: true });
}

// تعديل الكمية
export async function PATCH(req: Request) {
  const { cartItemId, quantity } = await req.json();

  await prisma.cartItem.update({
    where: { id: Number(cartItemId) },
    data: { quantity },
  });

  return NextResponse.json({ success: true });
}

// حذف منتج
export async function DELETE(req: Request) {
  const { cartItemId } = await req.json();

  await prisma.cartItem.delete({
    where: { id: Number(cartItemId) },
  });

  return NextResponse.json({ success: true });
}