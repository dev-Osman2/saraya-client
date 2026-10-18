"use client";

import React from "react";

interface ProductPricingInputsProps {
  price: string;
  setPrice: (val: string) => void;
  oldPrice: string;
  setOldPrice: (val: string) => void;
}

export default function ProductPricingInputs({
  price,
  setPrice,
  oldPrice,
  setOldPrice,
}: ProductPricingInputsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
          السعر الحالي (ج) <span className="text-[#D55304]">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            step="1"
            min={0}
            max={999}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="65"
            className="w-full pr-4 pl-12 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-[#D55304] transition"
          />
          <span className="absolute left-3 text-slate-500 text-xs font-bold">
            ج
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-extrabold text-slate-500 mb-1.5">
          السعر القديم (اختياري)
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            step="1"
            min={0}
            max={999}
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            placeholder="80"
            className="w-full pr-4 pl-12 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-[#D55304] transition"
          />
          <span className="absolute left-3 text-slate-500 text-xs font-bold">
            ج
          </span>
        </div>
      </div>
    </div>
  );
}
