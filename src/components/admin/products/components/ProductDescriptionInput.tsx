"use client";

import React from "react";

interface ProductDescriptionInputProps {
  description: string;
  setDescription: (val: string) => void;
}

export default function ProductDescriptionInput({
  description,
  setDescription,
}: ProductDescriptionInputProps) {
  return (
    <div>
      <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
        وصف الوجبة والمكونات{" "}
        <span className="text-slate-400 font-normal">(اختياري)</span>
      </label>
      <div className="relative">
        <textarea
          rows={3}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="مثال: كفتة مشوية على الفحم مع الطحينة والخضار الطازجة..."
          className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#D55304] resize-none"
        />
        <span className="absolute bottom-2.5 left-3 text-[11px] font-mono text-slate-400">
          {description.length}/500
        </span>
      </div>
    </div>
  );
}
