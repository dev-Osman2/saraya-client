"use client";

export default function StoreClosedAlert() {
  return (
    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-right space-y-1">
      <p className="text-xs sm:text-sm font-black text-rose-700">
        🔴 المطعم مغلق حالياً
      </p>
      <p className="text-xs text-rose-600 font-medium">
        عذراً، لا يمكن إرسال طلبات جديدة في وقت إغلاق المطعم. <br />
        مواعيد العمل يومياً من 6:00 صباحا حتى 2:00 ظهراً.
      </p>
    </div>
  );
}
