"use server";

// تعريف شكل البيانات التي يرجعها الـ Server Action
export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  timestamp?: number; // نستخدمه لضمان تشغيل useEffect حتى لو تكررت نفس الرسالة
};

// ============================================================================
// المثال الأول: Server Action مخصص للنماذج (Forms) مع useActionState
// ============================================================================
export async function registerUserAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // محاكاة تأخير الشبكة وقاعدة البيانات (1.5 ثانية)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;

  // التحقق من البيانات وإرجاع خطأ
  if (!username || username.trim().length < 3) {
    return {
      status: "error",
      message: "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل.",
      timestamp: Date.now(),
    };
  }

  if (!email || !email.includes("@")) {
    return {
      status: "error",
      message: "يرجى إدخال بريد إلكتروني صحيح.",
      timestamp: Date.now(),
    };
  }

  // محاكاة خطأ من قاعدة البيانات إذا كان الإيميل مستخدماً
  if (email === "taken@example.com") {
    return {
      status: "error",
      message: "هذا البريد الإلكتروني مسجل مسبقاً في النظام!",
      timestamp: Date.now(),
    };
  }

  // في حال النجاح
  return {
    status: "success",
    message: `تم إنشاء حساب "${username}" بنجاح!`,
    timestamp: Date.now(),
  };
}

// ============================================================================
// المثال الثاني: Server Action يُستدعى مباشرة عند الضغط على زر (مثل حذف عنصر)
// ============================================================================
export async function deleteProjectAction(projectId: string, shouldFail: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // ملاحظة مهمة في Next.js:
  // يفضل إرجاع كائن { success: false } بدلاً من استخدام throw new Error
  // لأن Next.js يقوم بإخفاء نصوص الأخطاء (Throw) في بيئة الإنتاج (Production) لأسباب أمنية
  if (shouldFail) {
    return {
      success: false,
      message: "فشل الحذف: لا تملك الصلاحيات الكافية لحذف هذا المشروع.",
    };
  }

  return {
    success: true,
    message: `تم حذف المشروع رقم (${projectId}) نهائياً من قاعدة البيانات.`,
  };
}