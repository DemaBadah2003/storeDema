'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema()),
    defaultValues: { name: '', email: '', password: '', passwordConfirmation: '', accept: false },
  });

  async function onSubmit(values: SignupSchemaType) {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || t('signup_generic_error'));
      } else {
        router.push('/signin');
      }
    } catch {
      setError(t('signup_connection_error'));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 px-4">
      {/* اللوغو */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {t('store_name_prefix')} <span style={{ color: '#D4900A' }}>{t('store_name_highlight')}</span>
        </h1>
      </div>

      {/* بطاقة إنشاء الحساب */}
      <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-sm shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">{t('signup_title')}</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* الاسم */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">{t('signup_name_label')}</label>
            <input
              type="text"
              placeholder={t('signup_name_placeholder')}
              autoComplete="name"
              {...register('name')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
            />
            {errors.name && (
              <span className="text-xs text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">{t('signup_email_label')}</label>
            <input
              type="email"
              placeholder={t('signup_email_placeholder')}
              autoComplete="email"
              {...register('email')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email.message}</span>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">{t('signup_password_label')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('signup_password_placeholder')}
                autoComplete="new-password"
                {...register('password')}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? t('hide_password') : t('show_password')}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">{t('signup_confirm_password_label')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('signup_confirm_password_placeholder')}
                autoComplete="new-password"
                {...register('passwordConfirmation')}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#D4900A' } as React.CSSProperties}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? t('hide_password') : t('show_password')}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.passwordConfirmation && (
              <span className="text-xs text-red-600">{errors.passwordConfirmation.message}</span>
            )}
          </div>

          {/* الموافقة على السياسة */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              {...register('accept')}
              className="h-4 w-4 rounded border-gray-300"
              style={{ accentColor: '#D4900A' }}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
              {t('signup_accept_terms_prefix')}{' '}
              <Link href="#" style={{ color: '#D4900A' }} className="font-medium hover:underline">
                {t('signup_privacy_policy_link')}
              </Link>{' '}
              {t('signup_accept_terms_suffix')}
            </label>
          </div>
          {errors.accept && (
            <span className="text-xs text-red-600 -mt-2">{errors.accept.message}</span>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="text-white font-semibold text-sm py-2 rounded-md border transition active:opacity-90 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#D4900A', borderColor: '#B8780A' }}
          >
            {isProcessing ? t('signup_submit_loading') : t('signup_submit_btn')}
          </button>
        </form>

        {/* تسجيل الدخول */}
        <div className="border-t border-gray-200 mt-5 pt-4">
          <p className="text-sm text-gray-700">
            {t('signup_have_account')}{' '}
            <Link href="/signin" style={{ color: '#D4900A' }} className="hover:underline font-medium">
              {t('signup_signin_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}