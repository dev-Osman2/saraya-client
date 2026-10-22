"use client";

import { useActionState, useEffect, useTransition } from "react";
import { Toaster, toast } from "sonner";
import {
  registerUserAction,
  deleteProjectAction,
  type ActionState,
} from "./actions";

const initialState: ActionState = {
  status: "idle",
  message: "",
};

export default function ServerActionsWithSonnerPage() {
  // ==========================================================================
  // الطريقة الأولى: ربط الفورم عبر useActionState + useEffect
  // ==========================================================================
  const [state, formAction, isPending] = useActionState(
    registerUserAction,
    initialState
  );

  // مراقبة النتيجة القادمة من السيرفر وإطلاق إشعار Sonner المناسب
  useEffect(() => {
    if (state.status === "success") {
      toast.success("عملية ناجحة", {
        description: state.message,
      });
    } else if (state.status === "error") {
      toast.error("فشلت العملية", {
        description: state.message,
      });
    }
  }, [state]); // يعمل تلقائياً في كل مرة يرجع فيها السيرفر رداً جديداً

  // ==========================================================================
  // الطريقة الثانية: استدعاء السيرفر مباشرة داخل دالة مع شاشة تحميل (Loading ID)
  // ==========================================================================
  const [isDeleting, startTransition] = useTransition();

  const handleDeleteProject = (shouldFail: boolean) => {
    // 1. إظهار إشعار التحميل فوراً وحفظ الـ ID الخاص به
    const toastId = toast.loading("جاري الاتصال بالخادم لحذف المشروع...");

    startTransition(async () => {
      // 2. استدعاء الـ Server Action وانتظار النتيجة
      const result = await deleteProjectAction("PRJ-902", shouldFail);

      // 3. تحديث نفس الإشعار (بنفس الـ ID) إلى نجاح أو خطأ
      if (result.success) {
        toast.success("تم الحذف!", {
          id: toastId,
          description: result.message,
        });
      } else {
        toast.error("تعذر إتمام العملية", {
          id: toastId,
          description: result.message,
        });
      }
    });
  };

  return (
    <main dir="rtl" className="min-h-screen bg-zinc-50 p-8 font-sans text-zinc-900">
      <Toaster position="top-center" richColors closeButton dir="rtl" />

      <div className="max-w-2xl mx-auto space-y-8">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold">
            ربط Sonner مع Next.js Server Actions
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            مثال تطبيقي لأفضل طريقتين للتعامل مع استجابات الخادم في بيئة الإنتاج.
          </p>
        </header>

        {/* البطاقة الأولى: النماذج (Forms) */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <div>
            <h2 className="font-semibold text-lg">
              1. طريقة النماذج (useActionState + useEffect)
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              جرب إرسال الحقول فارغة، أو اكتب الإيميل <code>taken@example.com</code> لرؤية إشعار الخطأ من الخادم.
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                اسم المستخدم
              </label>
              <input
                name="username"
                type="text"
                placeholder="مثال: osman_dev"
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {isPending ? "جاري الإرسال إلى الخادم..." : "إنشاء حساب جديد"}
            </button>
          </form>
        </section>

        {/* البطاقة الثانية: الأزرار المباشرة بدون فورم */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <div>
            <h2 className="font-semibold text-lg">
              2. طريقة الأزرار المباشرة (Direct Server Action + Toast ID)
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              ممتازة لأزرار الحذف أو التحديث السريع؛ تعرض إشعار تحميل أولاً ثم تحوله لنجاح أو خطأ بمجرد رد الخادم.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDeleteProject(false)}
              disabled={isDeleting}
              className="px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              تجربة حذف ناجح من الخادم
            </button>

            <button
              onClick={() => handleDeleteProject(true)}
              disabled={isDeleting}
              className="px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition"
            >
              تجربة حذف فاشل (رفض صلاحيات)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}