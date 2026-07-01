import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

// GET /api/user -> جلب مستخدم واحد أو كل المستخدمين
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (id) {
      const user = await db.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: { select: { slug: true, name: true } },
        },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    if (email) {
      const user = await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: { select: { slug: true, name: true } },
        },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: { select: { slug: true, name: true } },
      },
    });
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/user -> تسجيل مستخدم جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة" },
        { status: 400 }
      );
    }

    // تأكدي إن الإيميل مش مسجّل مسبقاً
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل بالفعل" },
        { status: 409 }
      );
    }

    // نجيب الدور الافتراضي (customer) بدل ما نفرضه كنص ثابت
    const defaultRole = await db.userRole.findFirst({
      where: { isDefault: true },
    });

    if (!defaultRole) {
      return NextResponse.json(
        { error: "لا يوجد دور افتراضي معرّف بالنظام (customer). راجعي بيانات الـ seed" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        roleId: defaultRole.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: { select: { slug: true, name: true } },
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}