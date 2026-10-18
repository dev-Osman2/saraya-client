"use client";

import { FileText } from "lucide-react";

interface CustomerNotesInputProps {
  notes: string;
  setNotes: (val: string) => void;
}

export default function CustomerNotesInput({
  notes,
  setNotes,
}: CustomerNotesInputProps) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1.5">
        <FileText className="w-3.5 h-3.5 text-slate-400" />
        <span>ملاحظات إضافية (اختياري)</span>
      </label>
      <textarea
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="مثال: بدون بصل، صوص إضافي ..."
        className="w-full p-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#D55304] transition-all resize-none"
      />
    </div>
  );
}
