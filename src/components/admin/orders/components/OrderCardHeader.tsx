"use client";

import { Order } from "@/src/types";

interface OrderCardHeaderProps {
  order: Order;
}

export default function OrderCardHeader({ order }: OrderCardHeaderProps) {
  const renderStatusBadge = () => {
    if (order.status === "confirmed") {
      return (
        <span className="px-3.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
          مكتمل
        </span>
      );
    }
    if (order.status === "cancelled") {
      return (
        <span className="px-3.5 py-1 rounded-xl text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200">
          ملغي
        </span>
      );
    }
    return (
      <span className="px-3.5 py-1 rounded-xl text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
        قيد الإنتظار
      </span>
    );
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="bg-orange-50 text-primary border border-primary/20 font-black text-xs sm:text-sm px-3 py-1 rounded-xl font-mono shrink-0">
          #{order.orderNumber}
        </span>
        <h3 className="font-black text-slate-900 text-base sm:text-lg truncate">
          {order.customerName || "عميل السرايا"}
        </h3>
      </div>

      <div className="shrink-0">{renderStatusBadge()}</div>
    </div>
  );
}
