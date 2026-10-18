"use client";

import Link from "next/link";
import { Menu, LogOut, Search } from "lucide-react";

interface AdminHeaderProps {
  isCashierPage: boolean;
  isStoreOpen: boolean;
  onOpenMenu: () => void;
  onLogout: () => void;
  onOpenSearch?: () => void;
}

import { usePathname } from "next/navigation";
import {
  Calculator,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
} from "lucide-react";

// تعريف عناصر شريط التنقل
const ADMIN_NAV_ITEMS = [
  {
    name: "الكاشير",
    href: "/admin/cashier",
    icon: Calculator,
  },
  {
    name: "الطلبات",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    name: "المنيو",
    href: "/admin/products",
    icon: UtensilsCrossed,
  },
  {
    name: "الملخص",
    href: "/admin/orders-summary",
    icon: BarChart3,
  },
];

export default function AdminHeader({
  isCashierPage,
  isStoreOpen,
  onOpenMenu,
  onLogout,
  onOpenSearch,
}: AdminHeaderProps) {
  const pathname = usePathname();
  return (
    <header
      className="sticky top-0 z-40 bg-[#D55304] text-white shadow-md print:hidden"
      dir="rtl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={isCashierPage ? "/admin/cashier" : "/admin/orders"}
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="مطعم السرايا"
              className="w-10 h-10 rounded-xl bg-white p-0.5 object-contain shadow-xs"
            />
            <div className="leading-tight text-right">
              <h1 className="font-black text-base sm:text-lg">مطعم السرايا</h1>
              <p className="text-[11px] text-orange-100 font-medium hidden sm:block">
                {isCashierPage
                  ? "أشهى المأكولات والمشروبات"
                  : "لوحة تحكم المشرف وإدارة المطبخ"}
              </p>
            </div>
          </Link>

          {!isStoreOpen && (
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full animate-pulse hidden md:inline">
              المطعم مغلق للعملاء
            </span>
          )}
        </div>
        <nav className="md:flex items-center gap-1 hidden sm:gap-2 ">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin/orders"
                ? pathname === "/admin/orders"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#D55304] shadow-xs"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {isCashierPage && (
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => onOpenSearch?.()}
              title="بحث عن وجبة"
              aria-label="بحث عن وجبة"
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onLogout}
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onOpenMenu}
            title="القائمة"
            aria-label="القائمة الجانبية"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
