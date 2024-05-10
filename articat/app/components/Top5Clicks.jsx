"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Top5Chart({ top5Clicks }) {
  const [items, setItems] = useState([]);

  //use staate and use effect to avoid hydration errors
  if (!top5Clicks) {
    return <p>....</p>
  }
  useEffect(() => {
    if (top5Clicks) {
      setItems(
        top5Clicks.map((item) => ({
          name: item.name,
          "Number Of Clicks": item.clicks,
        }))
      );
    }
  }, [top5Clicks])

  return (

    <ResponsiveContainer width="98%" height={400}>
      <BarChart
        width={650}
        height={400}
        data={items}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={70}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="2 1" />
        <Bar
          dataKey="Number Of Clicks"
          fill="#d7b9e5"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
