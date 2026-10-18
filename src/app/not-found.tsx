import Link from "next/link";
import { UtensilsCrossed, ArrowRight, Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-[91vh] bg-[#e7e7e7] flex items-center justify-center p-4 select-none"
      dir="rtl"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 text-center overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-orange-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-3xl bg-orange-50 border border-orange-100 text-[#D55304] shadow-xs">
          <UtensilsCrossed className="w-11 h-11" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#D55304] text-white p-1.5 rounded-full shadow-xs">
            <Flame className="w-4 h-4 fill-white" />
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-black text-[#D55304] tracking-tight mb-2">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
          عذراً.. هذه الصفحة غير موجودة!
        </h2>

        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          يبدو أن الرابط الذي طلبته غير صحيح أو تم نقله. لا تقلق، يمكنك العودة
          إلى قائمة الطعام واختيار وجبتك المفضلة من المشويات والمأكولات الطازجة.
        </p>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D55304] hover:bg-[#b84500] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-[#D55304]/20 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>

        <div className="mt-10 pt-5 border-t border-slate-100 text-[11px] text-slate-400 font-bold">
          مطعم السرايا — أشهى المأكولات والمشويات
        </div>
      </div>
    </div>
  );
}
