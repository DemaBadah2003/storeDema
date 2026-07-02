'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { signIn, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (response?.error) {
        try {
          const errorData = JSON.parse(response.error);
          setError(errorData.message);
        } catch {
          setError('بريد إلكتروني أو كلمة مرور غير صحيحة');
        }
        return;
      }

      // نجح تسجيل الدخول - نجيب السيشن عشان نعرف دور المستخدم
      const session = await getSession();
      const roleSlug = (session?.user as any)?.roleSlug;

      if (roleSlug === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 px-4">
      {/* اللوغو */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          متجر <span style={{ color: '#D4900A' }}>ديما</span>
        </h1>
      </div>

      {/* بطاقة تسجيل الدخول */}
      <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-sm shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">تسجيل الدخول</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* البريد الإلكتروني */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">البريد الإلكتروني</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email.message}</span>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="أدخل كلمة المرور"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-600">{errors.password.message}</span>
            )}
            <Link
              href="/reset-password"
              className="text-xs hover:underline self-start"
              style={{ color: '#D4900A' }}
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* تذكرني */}
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              style={{ accentColor: '#D4900A' }}
              {...register('rememberMe')}
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              تذكرني على هذا الجهاز
            </label>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="text-white font-semibold text-sm py-2 rounded-md border transition active:opacity-90 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#D4900A', borderColor: '#B8780A' }}
          >
            {isProcessing ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* إنشاء حساب جديد */}
        <div className="border-t border-gray-200 mt-5 pt-4">
          <p className="text-sm text-gray-700">
            ليس لديك حساب؟{' '}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: '#D4900A' }}
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}