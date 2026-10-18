"use client";

import { CreditCard } from "lucide-react";
import { CartPaymentMethod } from "@/src/types";

interface PaymentMethodSelectorProps {
  paymentMethod: CartPaymentMethod;
  setPaymentMethod: (val: CartPaymentMethod) => void;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center gap-1.5">
        <CreditCard className="w-4 h-4 text-[#D55304]" />
        <span className="text-xs font-extrabold text-slate-800">طريقة الدفع</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setPaymentMethod("instapay")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
            paymentMethod === "instapay"
              ? "border-[#D55304] bg-orange-50/70 text-[#D55304] shadow-2xs"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentMethod === "instapay" ? "border-[#D55304]" : "border-slate-300"
            }`}
          >
            {paymentMethod === "instapay" && (
              <span className="w-2 h-2 rounded-full bg-[#D55304]" />
            )}
          </span>
          <span>إنستاباي (InstaPay)</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("vodafone_cash")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
            paymentMethod === "vodafone_cash"
              ? "border-[#D55304] bg-orange-50/70 text-[#D55304] shadow-2xs"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentMethod === "vodafone_cash" ? "border-[#D55304]" : "border-slate-300"
            }`}
          >
            {paymentMethod === "vodafone_cash" && (
              <span className="w-2 h-2 rounded-full bg-[#D55304]" />
            )}
          </span>
          <span>فودافون كاش</span>
        </button>
      </div>
    </div>
  );
}
