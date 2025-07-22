"use client";

import { Button } from "@/components/ui/button"; // shadcn/uiのButtonを使用

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-center p-4">
      <nav className="flex gap-6">
        <Button variant="link" onClick={() => scrollToSection("steps")}>
          かんたん３ステップでスタート
        </Button>
        <Button variant="link" onClick={() => scrollToSection("pick-up")}>
          機能ピックアップ
        </Button>
        <Button variant="link" onClick={() => scrollToSection("faq")}>
          よくある質問
        </Button>
      </nav>
    </header>
  );
}
