"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "Fugitive Hunt - Start Game";
  }, []);

  const startGame = () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      const gameplayId = crypto.randomUUID();
      sessionStorage.setItem("gameplayId", gameplayId);

      setTimeout(() => {
        router.push(`/game/city?gameplayId=${gameplayId}`);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          level={1}
          className="text-6xl md:text-7xl font-extrabold text-white neon-text"
        >
          Fugitive Hunt
        </Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-4"
      >
        <Text className="text-white text-2xl md:text-3xl font-bold tracking-wide neon-text">
          A thrilling chase begins. Are you ready?
        </Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 relative"
      >
        <Button
          type="primary"
          size="large"
          onClick={startGame}
          disabled={loading}
          className={`w-56 h-16 text-2xl font-bold flex items-center justify-center uppercase tracking-widest 
            transition-all duration-300 transform neon-button relative overflow-hidden ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
          icon={!loading && <PlayCircleOutlined />}
        >
          {loading ? "Loading..." : "Start Game"}

          {loading && (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-0 bottom-0 h-1 bg-white"
            />
          )}
        </Button>
      </motion.div>
    </div>
  );
}
