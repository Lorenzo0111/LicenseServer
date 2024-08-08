"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as BaseBarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

export type ChartProps = {
  title: string;
  data: any[];
  keys: string[];
  config: ChartConfig;
};

export function BarChart(props: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={props.config} className="min-h-[200px] w-full">
          <BaseBarChart accessibilityLayer data={props.data}>
            {props.keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={4}
              />
            ))}
          </BaseBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function LineChart(props: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={props.config} className="min-h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={props.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {props.keys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
