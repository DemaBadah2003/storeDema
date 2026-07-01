import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany();
    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
    return NextResponse.json(formattedProducts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, imageUrl, stock } = body;

    if (!name || price === undefined || !imageUrl) {
      return NextResponse.json(
        { error: 'Name, price, and imageUrl are required' },
        { status: 400 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        name,
        price: String(price), // Prisma Decimal accepts a string representation
        imageUrl,
        stock: stock !== undefined ? Number(stock) : 0,
      },
    });

    return NextResponse.json(
      {
        ...newProduct,
        price: Number(newProduct.price),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
