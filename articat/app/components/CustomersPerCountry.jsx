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
  ResponsiveContainer,
} from "recharts";

export default function CustomersPerCountry({ customersPerCountry }) {
  const [customers, setCustomers] = useState([]);

  //use state and use effect to avoid hydration errors
  if (!customersPerCountry) {
    return <p>Loading Data....</p>;
  }
  useEffect(() => {
    if (customersPerCountry) {
      setCustomers(
        Object.entries(customersPerCountry).map(([country, count]) => ({
          country,
          "Number Of Customers": count,
        }))
      );
    }
  }, [customersPerCountry]);

  return (
    
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          width={650}
          height={400}
          data={customers}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={70}
        >
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="2 1" />
          <Bar
            dataKey="Number Of Customers"
            fill="#a4daf3"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>

  );
}
