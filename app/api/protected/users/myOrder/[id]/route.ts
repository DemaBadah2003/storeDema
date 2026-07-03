import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db as prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    }

    // 🔒 حماية مهمة: نتأكد إن الطلب فعلاً ملك هذا المستخدم
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "غير مصرح لك بعرض هذا الطلب" }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("خطأ في جلب تفاصيل الطلب:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء جلب تفاصيل الطلب" }, { status: 500 });
  }
}