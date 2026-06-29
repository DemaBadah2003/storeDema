import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// 1. عملية القراءة GET: جلب جميع المواقع المخزنة في قاعدة البيانات
export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: "desc" }, // ترتيب من الأحدث للأقدم
    });
    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "فشل في جلب البيانات" }, { status: 500 });
  }
}

// 2. عملية الإضافة POST: إنشاء موقع جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, country } = body;

    if (!city || !country) {
      return NextResponse.json({ message: "المدينة والدولة مطلوبتان" }, { status: 400 });
    }

    const newLocation = await prisma.location.create({
      data: { city, country },
    });

    return NextResponse.json({ message: "تم الحفظ بنجاح", data: newLocation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "حدث خطأ أثناء الحفظ" }, { status: 500 });
  }
}

// 3. عملية التعديل PUT: لتعديل موقع معين (نحتاج معرفة الـ id)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, city, country } = body;

    if (!id) {
      return NextResponse.json({ message: "معرّف السجل (ID) مطلوب للتعديل" }, { status: 400 });
    }

    const updatedLocation = await prisma.location.update({
      where: { id: Number(id) },
      data: { city, country },
    });

    return NextResponse.json({ message: "تم التحديث بنجاح", data: updatedLocation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "فشل في تحديث البيانات" }, { status: 500 });
  }
}

// 4. عملية الحذف DELETE: لحذف موقع معين من قاعدة البيانات
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "معرّف السجل (ID) مطلوب للحذف" }, { status: 400 });
    }

    await prisma.location.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "تم الحذف بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "فشل في حذف السجل" }, { status: 500 });
  }
}