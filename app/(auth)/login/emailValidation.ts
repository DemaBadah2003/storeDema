// app/(auth)/login/emailValidation.ts

export function validateEmailOnly(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, message: "الرجاء إدخال البريد الإلكتروني" };
  }

  const isValid = emailRegex.test(trimmedEmail);
  
  return {
    isValid,
    message: isValid ? "" : "عذراً، يجب أن يحتوي البريد الإلكتروني على @ وينتهي بـ .com"
  };
}