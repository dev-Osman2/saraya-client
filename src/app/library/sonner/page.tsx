"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function SonnerPlaygroundPage() {
  // حالات لتجربة تغيير إعدادات الـ Toaster نفسه ديناميكياً
  const [position, setPosition] = useState<
    "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  >("bottom-right");
  const [richColors, setRichColors] = useState(true);
  const [expand, setExpand] = useState(false);

  // ==========================================
  // 1. الإشعارات الأساسية والأنواع (Variants)
  // ==========================================
  const showBasicToast = () => {
    toast("مرحباً بك في Sonner!", {
      description: "هذا إشعار عادي مع نص فرعي يوضح التفاصيل.",
    });
  };

  const showSuccessToast = () => {
    toast.success("تم حفظ البيانات بنجاح!");
  };

  const showErrorToast = () => {
    toast.error("حدث خطأ أثناء الاتصال بالخادم", {
      description: "تأكد من اتصالك بالإنترنت وحاول مرة أخرى.",
    });
  };

  const showWarningToast = () => {
    toast.warning("مساحة التخزين قاربت على الانتهاء (90%)");
  };

  const showInfoToast = () => {
    toast.info("يتوفر تحديث جديد للنظام حالياً.");
  };

  // ==========================================
  // 2. الإشعارات التفاعلية (Action & Cancel)
  // ==========================================
  const showActionToast = () => {
    toast("تم نقل الملف إلى سلة المهملات", {
      description: "سيتم حذف الملف نهائياً بعد 30 يوماً.",
      // زر الإجراء الرئيسي
      action: {
        label: "تراجع (Undo)",
        onClick: () => toast.success("تم استرجاع الملف بنجاح!"),
      },
      // زر الإلغاء الفرعي
      cancel: {
        label: "تجاهل",
        onClick: () => console.log("تم تجاهل الإشعار"),
      },
    });
  };

  // ==========================================
  // 3. التعامل مع العمليات غير المتزامنة (Promises)
  // ==========================================
  const showPromiseToast = () => {
    // محاكاة طلب API يستغرق ثانيتين (ينجح أو يفشل عشوائياً للتجربة)
    const fakeApiRequest = () =>
      new Promise<{ name: string }>((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.3; // 70% نسبة نجاح
          if (isSuccess) {
            resolve({ name: "تقرير_المبيعات.pdf" });
          } else {
            reject(new Error("فشل رفع الملف"));
          }
        }, 2000);
      });

    toast.promise(fakeApiRequest, {
      loading: "جاري رفع الملف إلى الخادم...",
      success: (data) => `تم رفع ${data.name} بنجاح!`,
      error: (err) => `خطأ: ${err.message}`,
    });
  };

  // ==========================================
  // 4. التحكم اليدوي بتحديث الإشعار عبر الـ ID
  // ==========================================
  const showManualUpdateToast = () => {
    // إنشاء إشعار تحميل والاحتفاظ بالـ ID الخاص به
    const toastId = toast.loading("جاري معالجة الدفعة المالية...");

    // بعد ثانيتين نقوم بتحديث نفس الإشعار بدلاً من إنشاء واحد جديد
    setTimeout(() => {
      toast.success("تمت عملية الدفع بنجاح!", {
        id: toastId, // تمرير نفس الـ ID يستبدل إشعار التحميل الحالي
        description: "رقم العملية: #TRX-98412",
      });
    }, 2000);
  };

  // ==========================================
  // 5. تخصيص الوقت، الأيقونات، والـ JSX المخصص
  // ==========================================
  const showCustomOptionsToast = () => {
    toast("إشعار مخصص بالكامل", {
      duration: 8000, // يبقى لمدة 8 ثوانٍ (الافتراضي 4000 ملي ثانية)
      icon: "🚀", // تغيير الأيقونة الافتراضية
      style: {
        background: "#1e1b4b",
        color: "#e0e7ff",
        border: "1px solid #4338ca",
      },
      // دالة تُنفذ عند انتهاء وقت الإشعار تلقائياً
      onAutoClose: () => console.log("أُغلق الإشعار تلقائياً"),
      // دالة تُنفذ عند إغلاق المستخدم للإشعار
      onDismiss: () => console.log("قام المستخدم بإغلاق الإشعار"),
    });
  };

  const showCustomJsxToast = () => {
    // يمكنك تمرير تصميم HTML/Tailwind كامل داخل الإشعار
    toast.custom((id) => (
      <div className="flex items-center justify-between gap-4 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            ع
          </div>
          <div>
            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              رسالة جديدة من عثمان
            </p>
            <p className="text-xs text-zinc-500">
              هل انتهيت من مراجعة الكود؟
            </p>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(id)} // إغلاق هذا الإشعار تحديداً
          className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
        >
          رد الآن
        </button>
      </div>
    ));
  };

  return (
    <main dir="rtl" className="min-h-screen bg-zinc-50 p-8 font-sans text-zinc-900">
      {/* 
        مكون الـ Toaster: هو المسؤول عن عرض الإشعارات في الشاشة.
        ملاحظة: في المشاريع الفعلية، ضعه مرة واحدة داخل src/app/layout.tsx
      */}
      <Toaster
        position={position}
        richColors={richColors} // يلون الخلفية بالكامل حسب نوع الإشعار (أخضر، أحمر، أصفر)
        expand={expand} // يجعل الإشعارات مفتوحة تحت بعضها بدلاً من تكدسها
        closeButton // يظهر زر (X) لإغلاق أي إشعار
        dir="rtl" // ضبط اتجاه الإشعارات للغة العربية
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            الدليل التطبيقي لمكتبة Sonner
          </h1>
          <p className="text-zinc-600">
            جرب الأزرار بالأسفل وافحص الدالة المرتبطة بكل زر في الكود.
          </p>
        </header>

        {/* قسم إعدادات الـ Toaster */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">1. إعدادات الحاوية (Toaster Props)</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={richColors}
                onChange={(e) => setRichColors(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              تفعيل الألوان الغنية (richColors)
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={expand}
                onChange={(e) => setExpand(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              توسيع الإشعارات دائماً (expand)
            </label>

            <div className="flex items-center gap-2 text-sm">
              <span>المكان (position):</span>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as typeof position)}
                className="border rounded-lg px-2 py-1 bg-zinc-50"
              >
                <option value="top-right">أعلى اليمين (top-right)</option>
                <option value="top-center">أعلى المنتصف (top-center)</option>
                <option value="top-left">أعلى اليسار (top-left)</option>
                <option value="bottom-right">أسفل اليمين (bottom-right)</option>
                <option value="bottom-center">أسفل المنتصف (bottom-center)</option>
                <option value="bottom-left">أسفل اليسار (bottom-left)</option>
              </select>
            </div>
          </div>
        </section>

        {/* قسم الأنواع الأساسية */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">2. الأنواع الأساسية (Variants)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={showBasicToast}
              className="px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-sm hover:bg-zinc-800 transition"
            >
              إشعار عادي (Default)
            </button>
            <button
              onClick={showSuccessToast}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition"
            >
              نجاح (toast.success)
            </button>
            <button
              onClick={showErrorToast}
              className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition"
            >
              خطأ (toast.error)
            </button>
            <button
              onClick={showWarningToast}
              className="px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm hover:bg-amber-600 transition"
            >
              تحذير (toast.warning)
            </button>
            <button
              onClick={showInfoToast}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
            >
              معلومة (toast.info)
            </button>
          </div>
        </section>

        {/* قسم الحالات المتقدمة */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">3. الاستخدامات المتقدمة والـ Promises</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={showActionToast}
              className="px-4 py-3 border border-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-100 transition text-right"
            >
              ⚡ إشعار مع أزرار تفاعلية (Action & Cancel)
            </button>

            <button
              onClick={showPromiseToast}
              className="px-4 py-3 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-100 transition text-right"
            >
              ⏳ إشعار طلبات الـ API (toast.promise)
            </button>

            <button
              onClick={showManualUpdateToast}
              className="px-4 py-3 border border-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-100 transition text-right"
            >
              🔄 تحديث إشعار حالي باستخدام الـ ID
            </button>

            <button
              onClick={showCustomOptionsToast}
              className="px-4 py-3 border border-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-100 transition text-right"
            >
              🎨 تخصيص الألوان والوقت والـ Events
            </button>

            <button
              onClick={showCustomJsxToast}
              className="px-4 py-3 border border-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-100 transition text-right sm:col-span-2"
            >
              🧩 تصميم مخصص بالكامل بـ Tailwind (toast.custom)
            </button>
          </div>
        </section>

        {/* قسم الإغلاق */}
        <section className="flex justify-end">
          <button
            onClick={() => toast.dismiss()} // استدعاء dismiss بدون ID يغلق كافة الإشعارات المفتوحة فوراً
            className="px-5 py-2.5 bg-zinc-200 text-zinc-800 rounded-xl text-sm font-semibold hover:bg-zinc-300 transition"
          >
            إغلاق جميع الإشعارات الحالية (toast.dismiss)
          </button>
        </section>
      </div>
    </main>
  );
}