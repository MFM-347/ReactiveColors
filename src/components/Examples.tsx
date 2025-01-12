import React, { useEffect, useState } from "react";
import { Star, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Shades {
  [key: string]: string;
}
interface ExamplesProps {
  shades: Shades;
}
export default function Examples({ shades }: ExamplesProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const shadeKeys = Object.keys(shades);
  const chartData = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 3500 },
    { month: "Mar", revenue: 6000 },
    { month: "Apr", revenue: 8000 },
    { month: "May", revenue: 5500 },
    { month: "Jun", revenue: 7500 },
  ];
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const getShade = (index: number) =>
    shades[shadeKeys[index]] || shades[shadeKeys[0]];

  return (
    <div className="mt-8 px-4 md:px-0">
      <h2 className="text-3xl font-bold mb-6">Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          style={{
            backgroundColor: getShade(isDarkMode ? 3 : 9),
            borderColor: getShade(isDarkMode ? 4 : 8),
          }}
        >
          <CardHeader>
            <CardTitle
              className="text-sm font-medium"
              style={{ color: getShade(isDarkMode ? 10 : 1) }}
            >
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ color: getShade(isDarkMode ? 10 : 0) }}
            >
              1,553
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: getShade(isDarkMode ? 9 : 3) }}
            >
              New logins in past 30 days
            </p>
            <div
              className="mt-4 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: getShade(isDarkMode ? 3 : 9) }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  backgroundColor: getShade(isDarkMode ? 8 : 4),
                }}
              />
            </div>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ color: getShade(isDarkMode ? 10 : 0) }}
            >
              3,251
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: getShade(isDarkMode ? 9 : 3) }}
            >
              Premium Upgrades in past 30 days
            </p>
            <div
              className="mt-4 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: getShade(isDarkMode ? 3 : 9) }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: getShade(isDarkMode ? 8 : 4),
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className="col-span-1 md:col-span-2"
          style={{
            backgroundColor: getShade(isDarkMode ? 3 : 10),
            borderColor: getShade(isDarkMode ? 4 : 9),
          }}
        >
          <CardHeader>
            <CardTitle
              className="text-sm font-medium"
              style={{ color: getShade(isDarkMode ? 10 : 3) }}
            >
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-3xl font-bold mb-4"
              style={{ color: getShade(isDarkMode ? 10 : 3) }}
            >
              $35,000
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="month"
                  stroke={getShade(isDarkMode ? 8 : 3)}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={getShade(isDarkMode ? 8 : 3)}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar
                  dataKey="revenue"
                  fill={getShade(isDarkMode ? 8 : 4)}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: getShade(4), color: getShade(9) }}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                { time: "9 - 10 AM", title: "Design system meeting" },
                { time: "1 - 2 PM", title: "Lunch" },
                { time: "3 - 4 PM", title: "Design review" },
              ].map((event, index) => (
                <li
                  key={index}
                  className="p-2 rounded transition-colors"
                  style={{
                    backgroundColor: `${getShade(9)}20`,
                    ":hover": { backgroundColor: `${getShade(9)}60` },
                  }}
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm opacity-75">{event.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <TooltipProvider>
          <Card
            style={{
              backgroundColor: getShade(4),
              borderColor: getShade(isDarkMode ? 3 : 9),
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top right, ${getShade(7)}48, ${getShade(7)}64)`,
                opacity: 0.5,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
              }}
            />
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle
                  className="text-lg font-semibold"
                  style={{ color: getShade(isDarkMode ? 10 : 1) }}
                >
                  Premium Plan
                </CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Star className="h-5 w-5" style={{ color: getShade(6) }} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p style={{ color: getShade(isDarkMode ? 10 : 1) }}>
                      Best value for money
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-4xl font-bold mb-2"
                style={{ color: getShade(isDarkMode ? 10 : 1) }}
              >
                $29
                <span
                  className="text-base font-normal"
                  style={{ color: getShade(isDarkMode ? 9 : 2) }}
                >
                  /month
                </span>
              </p>
              <ul className="mt-4 space-y-2 mb-6">
                {[
                  "Unlimited projects",
                  "24/7 support",
                  "Advanced analytics",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm"
                    style={{ color: getShade(isDarkMode ? 10 : 0) }}
                  >
                    <Info
                      className="h-4 w-4 mr-2"
                      style={{ color: getShade(5) }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                size="lg"
                style={{ backgroundColor: getShade(5), color: getShade(10) }}
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </div>
  );
}
