import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - جلب كل المنتجات
export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "فشل في جلب المنتجات" },
      { status: 500 }
    );
  }
}

// DELETE - حذف منتج (id يُرسل عبر query string ?id=...)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "معرف المنتج مطلوب" },
        { status: 400 }
      );
    }

    await db.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { error: "فشل في حذف المنتج" },
      { status: 500 }
    );
  }
}