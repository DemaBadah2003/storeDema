// app/(auth)/login/validation.ts

export function validateLoginInput(input: string) {
  const trimmedInput = input.trim();

  // 1. التحقق من أن الحقل ليس فارغاً
  if (!trimmedInput) {
    return { isValid: false, message: "الرجاء ملء الحقل أولاً" };
  }

  // شروط الـ Regex الافتراضية
  const phoneRegex = /^(056|059)\d{7}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  // 2. تحديد هل المدخل يمثل رقم جوال أم بريد إلكتروني بناءً على محتواه
  // إذا كان المدخل يحتوي على أرقام فقط (أو يبدأ بأرقام)
  const isNumeric = /^\d+$/.test(trimmedInput);

  if (isNumeric) {
    // المستخدم يحاول إدخال رقم هاتف، نقوم بفحص شرط الجوال الخاص بكِ
    const isValidPhone = phoneRegex.test(trimmedInput);
    if (!isValidPhone) {
      return { 
        isValid: false, 
        message: "عذراً، يجب أن يبدأ رقم الهاتف بـ 056 أو 059 متبوعاً بـ 7 أرقام (المجموع 10 أرقام)." 
      };
    }
  } else {
    // المستخدم يحاول إدخال بريد إلكتروني (يحتوي على أحرف)
    const isValidEmail = emailRegex.test(trimmedInput);
    if (!isValidEmail) {
      return { 
        isValid: false, 
        message: "عذراً، يجب أن يحتوي البريد الإلكتروني على @ وينتهي بـ .com" 
      };
    }
  }

  // إذا اجتاز الفحص بنجاح
  return { isValid: true, message: "" };
}