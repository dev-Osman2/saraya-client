"use client";

import { useState } from "react";
import { Wallet, Check, X, Copy } from "lucide-react";
import { Order } from "@/src/types";

interface OrderCardFooterProps {
  order: Order;
  isBusy: boolean;
  paymentLabel: string;
  onTogglePayment: (orderId: string, currentPaid: boolean) => Promise<void>;
  onUpdateStatus: (
    orderId: string,
    newStatus: "pending" | "confirmed" | "cancelled",
  ) => Promise<void>;
}

export default function OrderCardFooter({
  order,
  isBusy,
  paymentLabel,
  onTogglePayment,
  onUpdateStatus,
}: OrderCardFooterProps) {
  const [copied, setCopied] = useState(false);

  // التحقق من أن القيمة تحتوي على رقم (مثل رقم فودافون كاش أو InstaPay) وليست مجرد نص مثل "نقدي للصالة"
  const isCopyableReceipt = Boolean(
    order.paymentReceipt && /\d/.test(order.paymentReceipt),
  );

  const handleCopyReceipt = async () => {
    if (!order.paymentReceipt || !isCopyableReceipt) return;
    try {
      await navigator.clipboard.writeText(order.paymentReceipt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy receipt:", error);
    }
  };

  return (
    <div className="space-y-4 pt-2 border-t border-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] text-slate-400 font-bold">
            إجمالي الطلب
          </span>
          <span className="text-lg sm:text-xl font-black text-slate-900">
            {Number(order.totalPrice || 0).toFixed(2)}{" "}
            <span className="text-xs font-bold">ج</span>
          </span>
        </div>

        <div className="text-right">
          <span className="block text-[11px] text-slate-400 font-bold">
            طريقة الدفع
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black text-indigo-950">
              {paymentLabel}
            </span>
            {order.paymentReceipt &&
              (isCopyableReceipt ? (
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  title="اضغط لنسخ الرقم"
                  className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer active:scale-95 ${
                    copied
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-orange-50 text-primary border-[#D55304]/20 hover:bg-orange-100/70"
                  }`}
                >
                  <span>{order.paymentReceipt}</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-70" />
                  )}
                </button>
              ) : (
                <span className="text-[11px] font-mono font-bold bg-orange-50 text-primary px-2 py-0.5 rounded-md border border-[#D55304]/20">
                  {order.paymentReceipt}
                </span>
              ))}
          </div>
        </div>

        <button
          type="button"
          disabled={isBusy}
          onClick={() => onTogglePayment(order._id, order.isPaid)}
          className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
            order.isPaid
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{order.isPaid ? "تم الدفع" : "لم يُدفع"}</span>
          <span
            className={`w-8 h-4 rounded-full relative transition-colors ${
              order.isPaid ? "bg-emerald-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                order.isPaid ? "left-0.5" : "right-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isBusy || order.status === "confirmed"}
          onClick={() => onUpdateStatus(order._id, "confirmed")}
          className={`py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            order.status === "confirmed"
              ? "bg-emerald-100 text-emerald-800 cursor-default"
              : "bg-[#059669] hover:bg-[#047857] text-white shadow-xs active:scale-[0.99]"
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>
            {order.status === "confirmed" ? "تم التأكيد" : "تأكيد وإرسال للمطبخ"}
          </span>
        </button>

        <button
          type="button"
          disabled={isBusy || order.status === "cancelled"}
          onClick={() => onUpdateStatus(order._id, "cancelled")}
          className={`py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            order.status === "cancelled"
              ? "bg-rose-100 text-rose-800 cursor-default"
              : "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-xs active:scale-[0.99]"
          }`}
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>
            {order.status === "cancelled" ? "الطلب ملغي" : "إلغاء الطلب"}
          </span>
        </button>
      </div>
    </div>
  );
}