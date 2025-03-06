"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, Typography, Spin } from "antd";
import {
  ReloadOutlined,
  TrophyOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const gameplayId = searchParams.get("gameplayId");

  const { data, isLoading } = useQuery({
    queryKey: ["fugitive-status", gameplayId],
    queryFn: async () => {
      if (!gameplayId) return null;
      const response = await axios.get(
        `/api/fugitive?gameplayId=${gameplayId}`
      );
      return response.data;
    },
    enabled: !!gameplayId,
  });

  const restartGame = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.push("/");
  };

  useEffect(() => {
    document.title = "Fugitive Hunt - Mission Outcome!";
  }, []);

  const isWin = data?.captured;
  const titleText = isWin
    ? "🎯 Mission Accomplished! You Got the Fugitive!"
    : "💨 The Fugitive Escaped! Try Again!";
  const messageText = isWin
    ? `🔗 ${data?.fugitive || "The fugitive"} was captured by ${data?.copName}!`
    : `The fugitive managed to escape! 🏃‍♂️ Stay sharp and try again!`;
  const icon = isWin ? (
    <TrophyOutlined className="text-gold animate-bounce text-6xl" />
  ) : (
    <CloseCircleOutlined className="text-red-600 animate-shake text-6xl" />
  );
  const bgColor = isWin
    ? "bg-gradient-to-r from-green-700 to-green-900"
    : "bg-gradient-to-r from-red-700 to-red-900";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6  text-white`}
    >
      {isLoading ? (
        <Spin size="large" className="my-6" />
      ) : (
        <Card
          className={`w-full max-w-lg shadow-lg p-8 rounded-xl text-center ${bgColor}  bg-gray-900 text-white`}
        >
          <Title level={4} className="font-extrabold uppercase tracking-wide">
            {titleText}
          </Title>

          <div className="flex justify-center my-4">{icon}</div>

          <Text className="block text-lg mb-6 font-semibold text-gray-300">
            {messageText}
          </Text>

          <Button
            type="primary"
            size="large"
            block
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            onClick={restartGame}
            icon={<ReloadOutlined />}
          >
            Play Again
          </Button>
        </Card>
      )}
    </div>
  );
}
