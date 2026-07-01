import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const orders = await db.order.findMany({
      where: userId ? { userId } : {},
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedOrders = orders.map((order) => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        product: item.product
          ? {
              ...item.product,
              price: Number(item.product.price),
            }
          : null,
      })),
    }));

    return NextResponse.json(formattedOrders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, totalAmount, items } = body;

    if (
      !userId ||
      totalAmount === undefined ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'userId, totalAmount, and non-empty items array are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await db.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Start database transaction
    const newOrder = await db.$transaction(async (tx) => {
      // 1. Verify and update stock for all items
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Decrement stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: product.stock - item.quantity,
          },
        });
      }

      // 2. Create the Order and its items
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount: String(totalAmount),
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: String(item.price),
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return order;
    });

    // Format response to map decimals to numbers
    const formattedOrder = {
      ...newOrder,
      totalAmount: Number(newOrder.totalAmount),
      items: newOrder.items.map((item) => ({
        ...item,
        price: Number(item.price),
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
      })),
    };

    return NextResponse.json(formattedOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
