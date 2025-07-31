"use client";
import { Header } from "./components/home/Header";
import { Footer } from "./components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, ArrowRight, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden scroll-smooth">
      <Header />

      <main className="flex-grow pt-[80px] bg-white w-full">
        {/* Hero セクション */}
        <section className="relative h-[80vh] text-center flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-3xl"
          >
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-xl">
              配信をもっと楽しく、簡単に
            </h1>
            <p className="text-xl mb-8 drop-shadow-lg">
              VToolbox があなたの配信を“盛り上げる、盛りだくさん”になります
            </p>
            <Button size="lg" className="gap-2">
              <Sparkles size={18} /> 今すぐ始める
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 bg-[url('/images/hero-bg-pattern.svg')] bg-cover"
          />
        </section>

        {/* 導入ステップ */}
        <section id="steps" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            かんたん３ステップでスタート
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Star className="text-indigo-500" />,
                label: "アイテム選択",
              },
              {
                icon: <MessageCircle className="text-pink-500" />,
                label: "カスタマイズ",
              },
              {
                icon: <ArrowRight className="text-blue-500" />,
                label: "配信連携",
              },
            ].map((step, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow">
                <CardContent className="text-center p-6">
                  <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.label}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 機能紹介 */}
        <section
          id="pick-up"
          className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            機能ピックアップ
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              { title: "時計・カウンター", desc: "配信を盛り上げる機能" },
              { title: "テキストテンプレ", desc: "簡単にカッコよく作成" },
              { title: "チャット表示", desc: "配信中のコメントを表示" },
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">よくある質問</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "無料ですか？",
                a: "基本機能は無料です。高度機能は有料プランを予定しています。",
              },
              {
                q: "Twitter以外にも対応？",
                a: "今後DiscordやYouTubeログインを計画中です。",
              },
              {
                q: "スマホでも使えますか？",
                a: "はい、モバイルにも完全対応しています。",
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`faq${idx}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
}
