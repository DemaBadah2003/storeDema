import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - إضافة منتج جديد
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    if (!body.nameAr || !body.price) {
      return NextResponse.json(
        { error: "يرجى تعبئة جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name: body.name || "",
        nameAr: body.nameAr,
        price: Number(body.price),
        category: body.category || "",
        categorySlug: body.categorySlug || "",
        image: body.image || "/placeholder.jpg",
        stock: Number(body.stock) || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/protected/admin/products/[id] error:", error);
    return NextResponse.json(
      { error: "فشل في إضافة المنتج" },
      { status: 500 }
    );
  }
}

// PUT - تعديل منتج موجود (id من الرابط)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        nameAr: body.nameAr,
        price: Number(body.price),
        category: body.category,
        categorySlug: body.categorySlug,
        image: body.image,
        stock: Number(body.stock),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/protected/admin/products/[id] error:", error);
    return NextResponse.json(
      { error: "فشل في تعديل المنتج" },
      { status: 500 }
    );
  }
}