"use client";

import { OrderItem } from "@/src/types";

interface OrderCardItemsListProps {
  items: OrderItem[];
}

export default function OrderCardItemsList({ items }: OrderCardItemsListProps) {
  return (
    <div className="bg-slate-50/70 rounded-2xl border border-slate-100 overflow-hidden">
      <div className="grid grid-cols-12 bg-slate-100/80 px-4 py-2 text-[11px] font-extrabold text-slate-500">
        <span className="col-span-6 text-right">المنتج</span>
        <span className="col-span-3 text-center">الكمية</span>
        <span className="col-span-3 text-left">السعر الإجمالي</span>
      </div>

      <div className="divide-y divide-slate-100 px-4 h-[132px] overflow-y-auto custom-scrollbar">
        {items.map((item, idx) => {
          const unitPrice = Number(item.price || 0);
          const qty = Number(item.quantity || 1);
          return (
            <div
              key={idx}
              className="grid grid-cols-12 items-center py-2.5 text-xs sm:text-sm"
            >
              <div className="col-span-6 font-extrabold text-slate-800 pr-1 truncate">
                <span>{item.name}</span>
                {item.size && (
                  <span className="text-slate-500 font-bold"> - {item.size}</span>
                )}
              </div>
              <div className="col-span-3 text-center font-bold text-slate-700 dir-ltr">
                {qty} ×
              </div>
              <div className="col-span-3 text-left font-extrabold text-slate-900">
                {(unitPrice * qty).toFixed(2)} ج
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
