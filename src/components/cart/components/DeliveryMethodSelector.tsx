"use client";

import { Truck, Store, MapPin } from "lucide-react";

interface DeliveryMethodSelectorProps {
  isPickup: boolean;
  setIsPickup: (val: boolean) => void;
  address: string;
  setAddress: (val: string) => void;
  isDineIn: boolean;
}

export default function DeliveryMethodSelector({
  isPickup,
  setIsPickup,
  address,
  setAddress,
  isDineIn,
}: DeliveryMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setIsPickup(false)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer border active:scale-[0.98] ${
            !isPickup
              ? "bg-[#D55304] text-white border-[#D55304] shadow-lg shadow-[#D55304]/30 ring-2 ring-[#D55304]/20"
              : "bg-slate-100/80 text-slate-400 border-slate-200/90 hover:bg-slate-200/60 hover:text-slate-600 shadow-none"
          }`}
        >
          <Truck
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
              !isPickup ? "scale-110 text-white" : "text-slate-400"
            }`}
          />
          <span>توصيل للمنازل</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPickup(true)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer border active:scale-[0.98] ${
            isPickup
              ? "bg-[#D55304] text-white border-[#D55304] shadow-lg shadow-[#D55304]/30 ring-2 ring-[#D55304]/20"
              : "bg-slate-100/80 text-slate-400 border-slate-200/90 hover:bg-slate-200/60 hover:text-slate-600 shadow-none"
          }`}
        >
          <Store
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
              isPickup ? "scale-110 text-white" : "text-slate-400"
            }`}
          />
          <div className="flex flex-col items-start leading-tight">
            <span>الإستلام من الفرع</span>
            <span
              className={`text-[9px] font-medium transition-colors duration-300 ${
                isPickup ? "text-orange-100" : "text-slate-400"
              }`}
            >
              (بدون رسوم توصيل)
            </span>
          </div>
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          !isPickup
            ? "grid-rows-[1fr] opacity-100 translate-y-0"
            : "grid-rows-[0fr] opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1.5">
            <span>العنوان التفصيلي</span>
            <span className="text-[#D55304]">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              required={!isPickup && !isDineIn}
              tabIndex={isPickup ? -1 : 0}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="مثال: شارع الجمهورية - بجوار..."
              className="w-full pr-9 pl-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#D55304] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
