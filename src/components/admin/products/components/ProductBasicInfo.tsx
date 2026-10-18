"use client";

import React from "react";
import { CATEGORIES } from "@/src/constants/categories";

interface ProductBasicInfoProps {
  name: string;
  setName: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
}

export default function ProductBasicInfo({
  name,
  setName,
  category,
  setCategory,
}: ProductBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
          اسم الوجبة <span className="text-[#D55304]">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="سندوتش كفتة مشوية"
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#D55304] transition"
        />
      </div>

      <div>
        <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
          القسم <span className="text-[#D55304]">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-[#D55304] transition cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
