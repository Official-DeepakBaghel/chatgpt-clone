"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcut({
  onToggleSearch,
}: {
  onToggleSearch?: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + O → New Chat
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        router.push("/");
      }

      // Ctrl + K → Toggle Search
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onToggleSearch?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, onToggleSearch]);

  return null;
}
