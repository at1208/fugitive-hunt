"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const backRoutes: Record<string, string> = {
  "/game/city": "/",
  "/game/vehicle": "/game/city",
};

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const backRoute = backRoutes[pathname];
  const queryParams = searchParams.toString();
  const queryString = queryParams ? `?${queryParams}` : "";

  const handleBackNavigation = () => {
    if (backRoute === "/") {
      router.push(backRoute);
    } else {
      router.push(`${backRoute}${queryString}`);
    }
  };

  if (!backRoute) return null;

  return (
    <div className="absolute top-4 left-4">
      <Button
        className="back-btn"
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={handleBackNavigation}
      >
        Back
      </Button>
    </div>
  );
}
