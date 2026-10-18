"use client";

import { Printer, RotateCcw, Loader2 } from "lucide-react";

interface CashierCartActionsProps {
  submitting: boolean;
  isCartEmpty: boolean;
  onPrintAndSubmit: () => void;
  onResetCart: () => void;
}

export default function CashierCartActions({
  submitting,
  isCartEmpty,
  onPrintAndSubmit,
  onResetCart,
}: CashierCartActionsProps) {
  return (
    <div className="space-y-2.5 pt-1">
      <button
        type="button"
        disabled={submitting || isCartEmpty}
        onClick={onPrintAndSubmit}
        className="w-full bg-[#D55304] hover:bg-[#b84403] disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-md shadow-[#D55304]/25 flex items-center justify-center gap-2 text-base transition-all active:scale-[0.99] cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>جاري الحفظ والطباعة...</span>
          </>
        ) : (
          <>
            <Printer className="w-5 h-5" />
            <span>طباعة الإيصال</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onResetCart}
        className="w-full bg-white hover:bg-orange-50 text-[#D55304] border border-[#D55304]/40 font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>طلب جديد / مسح السلة</span>
      </button>
    </div>
  );
}
