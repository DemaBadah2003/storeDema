import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db as prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

// ✅ GET: جلب كل طلبات المستخدم الحالي (هاد الناقص)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("خطأ في جلب الطلبات:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الطلبات" }, { status: 500 });
  }
}

// ✅ POST: إنشاء طلب جديد (موجودة عندك، خليها متل ما هي)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
    }

    const body = await req.json();
    const { items, fullName, phone, city, address, notes, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "السلة فارغة" }, { status: 400 });
    }

    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "بعض المنتجات غير موجودة" }, { status: 400 });
    }

    let subtotal = 0;
    const orderItemsData = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId);
      const price = Number(product!.price);
      subtotal += price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      };
    });

    const shipping = 0;
    const totalAmount = subtotal + shipping;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        fullName: fullName || session.user.name || "غير محدد",
        phone: phone || "غير محدد",
        city: city || "غير محدد",
        address: address || "غير محدد",
        notes: notes || null,
        paymentMethod: paymentMethod || "cash",
        subtotal: subtotal,
        shipping: shipping,
        totalAmount: totalAmount,
        status: "جاري التجهيز",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: { include: { product: true } },
        user: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("خطأ في إنشاء الطلب:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء الطلب" }, { status: 500 });
  }
}