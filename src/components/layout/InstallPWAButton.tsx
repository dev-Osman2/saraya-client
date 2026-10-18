"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. إذا كان التطبيق مثبتاً بالفعل ويعمل كـ Standalone، لا نظهر الزر
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (isStandalone) return;

    // 2. التحقق إذا كان المستخدم لم يغلق الإشعار سابقاً في هذه الجلسة
    if (sessionStorage.getItem("pwa_banner_dismissed") === "true") return;

    // 3. تسجيل الـ Service Worker لتفعيل شروط الـ PWA في المتصفح
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("SW registration failed:", err);
      });
    }

    // 4. فحص إذا كان الجهاز iPhone / iPad
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isIosDevice) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIOS(true);
      setIsVisible(true);
      return;
    }

    // 5. التقاط حدث التثبيت على Android و Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-xs text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-800 flex items-center justify-between gap-3 max-w-md mx-auto sm:mx-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#D55304] flex items-center justify-center shrink-0 shadow-md">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-xs sm:text-sm text-white truncate">
            تثبيت تطبيق سرايا
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isIOS && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-[#D55304] hover:bg-[#b84500] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
            >
              تثبيت
            </button>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}