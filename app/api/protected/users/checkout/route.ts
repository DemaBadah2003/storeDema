import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db as prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export async function POST(req: NextRequest) {
  try {
    // 1) التأكد إن المستخدم مسجل دخول
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "يجب تسجيل الدخول لإتمام الطلب" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2) قراءة بيانات الفورم القادمة من صفحة الـ checkout
    const body = await req.json();
    const { fullName, phone, city, address, notes, paymentMethod, items } = body;

    // 3) التحقق من الحقول المطلوبة
    if (!fullName || !phone || !city || !address) {
      return NextResponse.json(
        { error: "يرجى تعبئة جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "السلة فارغة، لا يمكن إتمام الطلب" },
        { status: 400 }
      );
    }

    // 4) جلب المنتجات من الداتابيز للتأكد من صحة الأسعار
    const productIds = items.map((item: { id: string }) => item.id);

    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: "أحد المنتجات في السلة لم يعد متوفراً" },
        { status: 400 }
      );
    }

    // 5) حساب المجموع الحقيقي من بيانات الداتابيز (مش من الفرونت إند)
    let subtotal = 0;
    const orderItemsData = items.map((item: { id: string; quantity: number }) => {
      const product = dbProducts.find((p) => p.id === item.id)!;
      subtotal += product.price * item.quantity;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // نخزن السعر وقت الشراء
      };
    });

    const shipping = subtotal > 100 ? 0 : 15;
    const calculatedTotal = subtotal + shipping;

    // 6) إنشاء الطلب في الداتابيز مع ربطه بالمستخدم والمنتجات
    const order = await prisma.order.create({
      data: {
        userId: userId,
        fullName,
        phone,
        city,
        address,
        notes: notes || "",
        paymentMethod,
        subtotal,
        shipping,
        totalAmount: calculatedTotal, // 👈 كان total، صار totalAmount
        // status: مش لازم تحطيه، فيه default("جاري التجهيز") بالسكيما
        items: {
          create: orderItemsData, // 👈 كان orderItems، صار items
        },
      },
      include: {
        items: {
          include: { product: true },
        }, // 👈 كان orderItems
        user: true, // هذا يحل مشكلة عدم ظهور اسم العميل بجدول الأدمن
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("خطأ في إنشاء الطلب:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الطلب" },
      { status: 500 }
    );
  }
}