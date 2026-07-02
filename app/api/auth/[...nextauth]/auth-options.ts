import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db as prisma } from "@/lib/db";
import { UserStatus } from "@/lib/generated/prisma/client";

function parseRememberMe(raw: unknown): boolean {
  return raw === true || raw === "true" || raw === "on" || raw === "1";
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "checkbox" },
      },

      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error(
            JSON.stringify({
              code: 400,
              message: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
            })
          );
        }

        const rememberMe = parseRememberMe(credentials.rememberMe);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true },
        });

        if (!user) {
          throw new Error(
            JSON.stringify({
              code: 404,
              message: "المستخدم غير موجود. نرجو التسجيل أولًا.",
            })
          );
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password ?? ""
        );

        if (!isPasswordValid) {
          throw new Error(
            JSON.stringify({
              code: 401,
              message: "بيانات الدخول غير صحيحة.",
            })
          );
        }

        if (user.isTrashed) {
          throw new Error(
            JSON.stringify({
              code: 403,
              message: "هذا الحساب غير متاح.",
            })
          );
        }

        if (user.status === UserStatus.BLOCKED) {
          throw new Error(
            JSON.stringify({
              code: 403,
              message: "تم حظر هذا الحساب. تواصل مع الإدارة.",
            })
          );
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastSignInAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name || "Anonymous",
          roleId: user.roleId,
          roleName: user.role?.name ?? null,
          roleSlug: user.role?.slug ?? null,
          status: user.status,
          avatar: user.avatar,
          emailVerifiedAt: user.emailVerifiedAt?.toISOString() ?? null,
          rememberMe,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // تحديث البيانات عند الطلب
      if (
        trigger === "update" &&
        session?.user &&
        typeof session.user === "object"
      ) {
        const s = session.user as Record<string, unknown>;
        if (typeof s.avatar === "string") token.avatar = s.avatar;
        if (typeof s.name === "string") token.name = s.name;
      }

      // إضافة بيانات المستخدم للـ Token أول مرة
      if (user) {
        token.id = user.id;
        token.roleId = user.roleId;
        token.roleName = user.roleName;
        token.roleSlug = user.roleSlug;
        token.status = user.status;
        token.avatar = user.avatar;
        token.emailVerifiedAt = user.emailVerifiedAt;

        const remember = parseRememberMe(user.rememberMe);
        token.rememberMe = remember;
        token.exp = Math.floor(Date.now() / 1000) + (remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.roleId = token.roleId;
        session.user.roleName = token.roleName;
        session.user.roleSlug = token.roleSlug;
        session.user.status = token.status;
        session.user.avatar = token.avatar;
        session.user.emailVerifiedAt = token.emailVerifiedAt;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};

export default authOptions;