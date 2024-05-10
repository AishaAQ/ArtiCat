'use client'
import {React,useState,useEffect} from 'react'
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from "recharts";

export default function TopContributingCompanies({top3Companies}) {

    const [companies, setCompanies] = useState([])

    //use staate and use effect to avoid hydration errors
    if (!top3Companies) {
      return <p>....</p>
    }
    useEffect(() => {
      if (top3Companies) {
        setCompanies(
          top3Companies.map((company) => ({
            name: company.companyName,
            "Total Product Quantity": company.totalQuantity
          }))
        );
      }
    }, [top3Companies]);

  return (
    <ResponsiveContainer width="95%" height={450}>
      <BarChart
        width={600}
        height={400}
        data={companies}
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
          dataKey="Total Product Quantity"
          fill="#8cdfc3"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
