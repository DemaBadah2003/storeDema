import { NextResponse } from "next/server";
// تأكد من صحة هذا المسار، يجب أن يشير إلى ملف lib/prisma.ts الذي يحتوي على الـ Singleton
import prisma from '@/lib/prisma'; 
import bcrypt from "bcrypt";

// ✅ تم حذف السطر: const prisma = new PrismaClient(); من هنا لأنه يسبب تكرار الاتصال

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "كلمات المرور غير متطابقة" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }, { status: 400 });
    }

    // التحقق من أن الإيميل لم يكن مسجلاً من قبل
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "البريد الإلكتروني مسجل بالفعل" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "تم التسجيل بنجاح", data: { id: newUser.id, name: newUser.name, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء التسجيل" }, { status: 500 });
  }
}