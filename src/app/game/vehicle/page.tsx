"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  Button,
  Card,
  Typography,
  List,
  Space,
  message,
  Skeleton,
} from "antd";
import {
  LoadingOutlined,
  CloseOutlined,
  RedoOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Vehicle {
  id: string;
  kind: string;
  count: number;
}

interface Assignment {
  cop: string;
  city: string;
  vehicle: string;
}

export default function AssignVehiclePage() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();

  const gameplayId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("gameplayId") || ""
      : "";

  const getStoredAssignments = () => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("copAssignments");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  };

  const prefilledAssignments = getStoredAssignments().map((entry: any) => ({
    cop: entry.cop,
    city: entry.city,
    vehicle: entry.vehicle || null,
  }));

  const [assignments, setAssignments] = useState(prefilledAssignments);
  const [selectedVehicleCounts, setSelectedVehicleCounts] = useState<
    Record<string, number>
  >({});

  const { data: vehicles = [], isLoading: loadingVehicles } = useQuery<
    Vehicle[]
  >({
    queryKey: ["vehicles"],
    queryFn: async () => (await axios.get("/api/vehicles")).data,
  });

  useEffect(() => {
    sessionStorage.setItem("copAssignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    document.title = "Fugitive Hunt - Choose Rides";
  }, []);

  useEffect(() => {
    const vehicleCountMap: Record<string, number> = {};
    assignments.forEach((assignment: any) => {
      if (assignment.vehicle?.value) {
        vehicleCountMap[assignment.vehicle.value] =
          (vehicleCountMap[assignment.vehicle.value] || 0) + 1;
      }
    });
    setSelectedVehicleCounts(vehicleCountMap);
  }, [assignments]);

  const handleAssignmentChange = (
    index: number,
    value: { label: string; value: string }
  ) => {
    const updatedAssignments = [...assignments];

    const prevVehicle = updatedAssignments[index].vehicle?.value;
    if (prevVehicle) {
      setSelectedVehicleCounts((prev) => ({
        ...prev,
        [prevVehicle]: (prev[prevVehicle] || 1) - 1,
      }));
    }

    setSelectedVehicleCounts((prev) => ({
      ...prev,
      [value.value]: (prev[value.value] || 0) + 1,
    }));

    updatedAssignments[index].vehicle = value;
    setAssignments(updatedAssignments);
  };

  const clearSelection = (index: number) => {
    const updatedAssignments = [...assignments];
    const removedVehicle = updatedAssignments[index].vehicle?.value;

    if (removedVehicle) {
      setSelectedVehicleCounts((prev) => ({
        ...prev,
        [removedVehicle]: (prev[removedVehicle] || 1) - 1,
      }));
    }

    updatedAssignments[index].vehicle = null;
    setAssignments(updatedAssignments);
  };

  const clearAllSelections = () => {
    setSelectedVehicleCounts({});
    const resetAssignments = assignments.map((a: any) => ({
      ...a,
      vehicle: null,
    }));
    setAssignments(resetAssignments);
    sessionStorage.setItem("copAssignments", JSON.stringify(resetAssignments));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/cop-assignment", {
        gameplayId,
        assignments: assignments.map((a: any) => ({
          copId: a.cop.value,
          cityId: a.city.value,
          vehicleId: a.vehicle?.value,
        })),
      });
    },
    onSuccess: () => {
      router.push(`/game/result?${queryParams}`);
    },
    onError: () => {
      messageApi.error("Failed to save assignments. Please try again.");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  sm:px-6 lg:px-8  w-full">
      {contextHolder}

      <Title
        level={3}
        className="neon-text mb-6 text-neon-blue font-extrabold text-center uppercase tracking-widest drop-shadow-lg animate-pulse"
      >
        Choose Rides!
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={assignments}
        className="w-full  max-w-2xl"
        renderItem={(assignment: Assignment, index) => (
          <List.Item className="w-full flex flex-row sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex w-full items-center gap-2 sm:gap-4">
              <div className="flex flex-col lg:flex-row w-full gap-2">
                <Select
                  size="large"
                  className="w-full   dark-select"
                  value={assignment.cop}
                  labelInValue
                  disabled
                />

                {/* Vehicle Selection Dropdown */}
                {loadingVehicles ? (
                  <Skeleton.Button
                    active
                    style={{ width: "300px", height: 40 }}
                  />
                ) : (
                  <Select
                    size="large"
                    placeholder="Select Vehicle"
                    className="w-full   dark-select"
                    value={assignment.vehicle || undefined}
                    labelInValue
                    onChange={(value: any) =>
                      handleAssignmentChange(index, value)
                    }
                    options={vehicles
                      .filter((vehicle) => {
                        const selectedCount =
                          selectedVehicleCounts[vehicle.id] || 0;
                        return selectedCount < vehicle.count;
                      })
                      .map((vehicle) => ({
                        label: `${vehicle.kind} (${
                          vehicle.count -
                          (selectedVehicleCounts[vehicle.id] || 0)
                        } left)`,
                        value: vehicle.id,
                      }))}
                  />
                )}
              </div>

              <div className="flex items-center justify-center">
                <Button
                  type="text"
                  size="small"
                  danger
                  className="hover:bg-red-700 transition-all"
                  icon={<CloseOutlined />}
                  onClick={() => clearSelection(index)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-2xl justify-center">
        <Button
          type="default"
          ghost
          size="large"
          block
          className="mt-4 bg-red-600 text-white hover:bg-red-700 transition-all"
          icon={<RedoOutlined />}
          onClick={clearAllSelections}
        >
          Clear
        </Button>

        <Button
          type="primary"
          size="large"
          block
          className="mt-4 bg-green-600 hover:bg-green-700 transition-all"
          onClick={() => mutation.mutate()}
          disabled={
            mutation.isPending || assignments.some((a: any) => !a.vehicle)
          }
          icon={mutation.isPending ? <LoadingOutlined /> : null}
        >
          {mutation.isPending ? "Capturing..." : "Capture Fugitive"}
        </Button>
      </div>
    </div>
  );
}
