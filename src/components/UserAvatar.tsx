"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

export type SubscriptionType = "free" | "basic" | "premium";

type UserAvatarProps = {
  avatarUrl: string;
  alt?: string;
  subscription?: SubscriptionType;
  size?: "sm" | "md" | "lg";
};

export function UserAvatar({
  avatarUrl,
  alt = "User Avatar",
  subscription = "free",
  size = "md",
}: UserAvatarProps) {
  const sizeMap = {
    sm: 40,
    md: 64,
    lg: 96,
  };

  const pixelSize = sizeMap[size];
  const sizeClass = `w-[${pixelSize}px] h-[${pixelSize}px]`;

  const image = (
    <Image
      src={avatarUrl}
      alt={alt}
      width={pixelSize}
      height={pixelSize}
      className="rounded-full object-cover w-full h-full"
      priority
    />
  );

  // プレミアム：虹色フレーム + 回転アニメ
  if (subscription === "premium") {
    return (
      <motion.div className={clsx("relative p-2 rounded-full", sizeClass)}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#facc15,#f472b6,#60a5fa,#facc15)]"
        />
        <div className="relative rounded-full bg-white p-2 w-full h-full">
          {image}
        </div>
      </motion.div>
    );
  }

  // ✅ ベーシック：アニメーション無し、静的フレームのみ
  if (subscription === "basic") {
    return (
      <div
        className={clsx("relative p-2 rounded-full overflow-hidden", sizeClass)}
      >
        {/* ベースの金色グラデーション */}
        <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-yellow-300" />

        {/* アイコン */}
        <div className="relative z-10 rounded-full bg-white p-2 w-full h-full">
          {image}
        </div>
      </div>
    );
  }

  // フリー：グレーのボーダー
  return (
    <div
      className={clsx(
        "rounded-full border-8 overflow-hidden border-gray-300",
        sizeClass
      )}
    >
      {image}
    </div>
  );
}
