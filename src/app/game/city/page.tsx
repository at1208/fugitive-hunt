"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Select, Button, Typography, List, Skeleton, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
  RedoOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface Cop {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

export default function AssignCityPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();

  useEffect(() => {
    document.title = "Fugitive Hunt - Choose City";
  }, []);

  const getStoredAssignments = (): {
    cop?: { label: string; value: string } | null;
    city?: { label: string; value: string } | null;
  }[] => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("copAssignments");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [{ cop: null, city: null }];
  };

  const [assignments, setAssignments] = useState(getStoredAssignments());
  const [selectedCops, setSelectedCops] = useState<string[]>(
    assignments.map((a) => a.cop?.value || "").filter(Boolean)
  );
  const [selectedCities, setSelectedCities] = useState<string[]>(
    assignments.map((a) => a.city?.value || "").filter(Boolean)
  );

  const { data: cities = [], isLoading: loadingCities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: async () => (await axios.get("/api/cities")).data,
  });

  const { data: cops = [], isLoading: loadingCops } = useQuery<Cop[]>({
    queryKey: ["cops"],
    queryFn: async () => (await axios.get("/api/cops")).data,
  });

  useEffect(() => {
    sessionStorage.setItem("copAssignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleAssignmentChange = (
    index: number,
    field: "cop" | "city",
    value: { label: string; value: string }
  ) => {
    const updatedAssignments = [...assignments];

    if (field === "cop") {
      const prevCop = updatedAssignments[index].cop?.value;
      if (prevCop)
        setSelectedCops((prev) => prev.filter((id) => id !== prevCop));
      setSelectedCops((prev) => [...prev, value.value]);
      updatedAssignments[index][field] = value;
    }

    if (field === "city") {
      const prevCity = updatedAssignments[index].city?.value;
      if (prevCity)
        setSelectedCities((prev) => prev.filter((id) => id !== prevCity));
      setSelectedCities((prev) => [...prev, value.value]);
      updatedAssignments[index][field] = value;
    }

    setAssignments(updatedAssignments);
  };
  const removeAssignment = (index: number) => {
    if (assignments.length === 1) return;

    const updatedAssignments = [...assignments];
    const removedCop = updatedAssignments[index].cop?.value;
    const removedCity = updatedAssignments[index].city?.value;

    // Free up the selected cop and city
    if (removedCop) {
      setSelectedCops((prev) => prev.filter((id) => id !== removedCop));
    }
    if (removedCity) {
      setSelectedCities((prev) => prev.filter((id) => id !== removedCity));
    }

    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
  };

  const clearAllSelections = () => {
    setSelectedCops([]);
    setSelectedCities([]);
    setAssignments([]); // Keep an empty assignment
    sessionStorage.removeItem("copAssignments");
  };

  const addAssignment = () => {
    setAssignments([...assignments, { cop: null, city: null }]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  sm:px-6 lg:px-8 w-full">
      {contextHolder}

      <Title
        level={2}
        className="neon-text text-neon-blue font-extrabold text-center mb-6 uppercase tracking-widest drop-shadow-lg animate-pulse"
      >
        Assign Territories!
      </Title>

      {/* Assignment List with Improved Layout */}
      <List
        itemLayout="horizontal"
        dataSource={assignments}
        className="w-full max-w-2xl"
        renderItem={(assignment, index) => (
          <List.Item className="w-full flex flex-row sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex w-full items-center gap-2 sm:gap-4">
              <div className="flex flex-col lg:flex-row w-full gap-2">
                {loadingCops ? (
                  <Skeleton.Button
                    active
                    style={{ width: "300px", height: 40 }}
                  />
                ) : (
                  <Select
                    size="large"
                    placeholder="Select Cop"
                    className="w-full dark-select"
                    value={assignment.cop || undefined}
                    labelInValue
                    onChange={(value) =>
                      handleAssignmentChange(index, "cop", value)
                    }
                    options={cops
                      .filter((cop) => !selectedCops.includes(cop.id))
                      .map((cop) => ({ label: cop.name, value: cop.id }))}
                  />
                )}

                {loadingCities ? (
                  <Skeleton.Button
                    active
                    style={{ width: "300px", height: 40 }}
                  />
                ) : (
                  <Select
                    size="large"
                    placeholder="Select City"
                    className="w-full dark-select"
                    value={assignment.city || undefined}
                    labelInValue
                    onChange={(value) =>
                      handleAssignmentChange(index, "city", value)
                    }
                    options={cities
                      .filter((city) => !selectedCities.includes(city.id))
                      .map((city) => ({ label: city.name, value: city.id }))}
                  />
                )}
              </div>

              {assignments.length > 1 && (
                <div className="flex items-center justify-center">
                  <Button
                    type="text"
                    size="small"
                    className="w-[40px] min-w-[40px] h-[40px] flex items-center justify-center"
                    icon={<CloseOutlined style={{ color: "red" }} />} // Explicitly set color
                    onClick={() => removeAssignment(index)}
                  />
                </div>
              )}
            </div>
          </List.Item>
        )}
      />

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-2xl justify-center">
        <Button
          type="default"
          ghost
          size="large"
          className="w-full sm:w-40 add-cop-btn"
          onClick={addAssignment}
          icon={<PlusOutlined />}
          disabled={assignments?.length === 3}
        >
          Add Cop
        </Button>

        <div className="flex gap-2">
          {assignments.length >= 1 && (
            <>
              <Button
                type="default"
                ghost
                size="large"
                className="w-full sm:w-40"
                icon={<RedoOutlined />}
                onClick={clearAllSelections}
              >
                Clear
              </Button>

              <Button
                type="primary"
                size="large"
                className="w-full sm:w-40"
                onClick={() => router.push(`/game/vehicle?${queryParams}`)}
                disabled={assignments.some((a) => !a.cop || !a.city)}
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
