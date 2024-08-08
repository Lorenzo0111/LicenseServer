"use client";

import { useFetcher } from "@/components/fetcher";
import { useMemo } from "react";
import { LineChart } from "./chart-item";
import { capitalize } from "@/lib/utils";

export function StatChart({ type }: { type: string }) {
  const { data: usage } = useFetcher<
    {
      key: string;
      createdAt: string;
    }[]
  >(`/api/stats?type=${type}`);
  const chartData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    if (!usage) return months.map((month) => ({ month, [type]: 0 }));

    const items = usage.reduce((acc, { createdAt }) => {
      const month = new Date(createdAt).getMonth();
      acc[month] = acc[month] ? acc[month] + 1 : 1;
      return acc;
    }, Array(12).fill(0));

    return months.map((month) => ({
      month,
      [type]: items[month - 1],
    }));
  }, [usage, type]);

  return (
    <LineChart
      title={capitalize(type)}
      data={chartData}
      keys={[type]}
      config={{
        [type]: {
          label: capitalize(type),
          color: "#e11d48",
        },
      }}
    />
  );
}
