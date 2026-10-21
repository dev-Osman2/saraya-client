"use client";

import { User, UtensilsCrossed } from "lucide-react";

interface CustomerHeaderProps {
  isDineIn: boolean;
  tableNumber?: string | null;
}

export default function CustomerHeader({ isDineIn, tableNumber }: CustomerHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-2 pt-1">
        <User className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-extrabold text-slate-800">
          {isDineIn ? `بيانات طلب الصالة (ترابيزة ${tableNumber})` : "بيانات التوصيل والإستلام"}
        </h4>
      </div>

      {isDineIn && (
        <div className="flex items-center justify-between bg-orange-50 border border-primary/30 rounded-xl p-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <UtensilsCrossed className="w-4 h-4 text-primary" />
            <span>الطلب مخصص لـ ترابيزة رقم ({tableNumber})</span>
          </div>
          <span className="bg-primary text-white px-2.5 py-0.5 rounded-full font-extrabold text-[11px]">
            داخل المطعم
          </span>
        </div>
      )}
    </>
  );
}
