"use client";

import { FileText, ClipboardEdit, ChevronDown, Loader2 } from "lucide-react";

interface OrderCardNotesProps {
  notes?: string;
  hasCustomerNote: boolean;
  showCustomerNote: boolean;
  setShowCustomerNote: React.Dispatch<React.SetStateAction<boolean>>;
  hasSavedAdminNote: boolean;
  showAdminNote: boolean;
  setShowAdminNote: React.Dispatch<React.SetStateAction<boolean>>;
  adminNoteText: string;
  setAdminNoteText: (val: string) => void;
  savingNote: boolean;
  onSaveNote: () => void;
  onCancelNote: () => void;
}

export default function OrderCardNotes({
  notes,
  hasCustomerNote,
  showCustomerNote,
  setShowCustomerNote,
  hasSavedAdminNote,
  showAdminNote,
  setShowAdminNote,
  adminNoteText,
  setAdminNoteText,
  savingNote,
  onSaveNote,
  onCancelNote,
}: OrderCardNotesProps) {
  return (
    <div className="space-y-3">
      <div className="pt-2 border-t border-slate-100 flex items-center justify-start gap-2 flex-wrap">
        {hasCustomerNote && (
          <button
            type="button"
            onClick={() => setShowCustomerNote((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
              showCustomerNote
                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>العميل</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showCustomerNote ? "rotate-180" : ""
              }`}
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowAdminNote((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
            hasSavedAdminNote
              ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-xs"
              : "bg-slate-100 hover:bg-slate-200/80 text-slate-500 border-slate-200/80"
          }`}
        >
          <ClipboardEdit className="w-3.5 h-3.5" />
          <span>الأدمن</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              showAdminNote ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {showCustomerNote && hasCustomerNote && (
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 text-right space-y-1 animate-in fade-in duration-150">
          <p className="text-xs font-extrabold text-indigo-700">
            ملاحظة كتبها العميل:
          </p>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {notes}
          </p>
        </div>
      )}

      {showAdminNote && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-right space-y-3 animate-in fade-in duration-150">
          <p className="text-xs font-extrabold text-amber-900">
            ملاحظة الأدمن الخاصة بالطلب:
          </p>
          <textarea
            rows={2}
            value={adminNoteText}
            onChange={(e) => setAdminNoteText(e.target.value)}
            placeholder="اكتب ملاحظات المطبخ أو النواقص أو باقي المبلغ..."
            className="w-full p-3 bg-white border border-amber-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-primary resize-none"
          />
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancelNote}
              className="px-3 py-1.5 text-xs font-extrabold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="button"
              disabled={savingNote}
              onClick={onSaveNote}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-60 text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              {savingNote && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>حفظ الملاحظة</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
