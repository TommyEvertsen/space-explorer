"use client";

import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import NeoInterface from "./lib/interface/Neo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Home = () => {
  const news = [
    {
      text: "Added near earth object scattermap",
      date: "07/03/2026",
    },
    {
      text: "Launched the first version of the page",
      date: "5/3/2026",
    },
    {
      text: "Added home page",
      date: "4/3/2026",
    },
    {
      text: "Added near earth objects page, see meteors and comets in close proximity to earth.",
      date: "1/3/2026",
    },
    {
      text: "Added Astronomy picture of the day, new photo every day from the universe.",
      date: "28/2/2026",
    },
  ];

  const [neoData, setNeoData] = useState<NeoInterface | null>(null);

  const today = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/neoStats`);
        if (!response.ok) {
          throw new Error(`error ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setNeoData(data);
      } catch (error) {
        console.error("Error fetching NEO:", error);
      }
    };

    fetchData();
  }, []);

  const getAllNeos = () => {
    if (!neoData) return [];
    const allNeos = [];
    for (const date in neoData.near_earth_objects) {
      allNeos.push(...neoData.near_earth_objects[date]);
    }
    return allNeos;
  };

  const getChartData = () => {
    if (!neoData?.near_earth_objects) return null;

    const dates = Object.keys(neoData.near_earth_objects).sort();
    const labels = dates.map((date) =>
      new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      }),
    );

    const regularCounts = dates.map((date) => {
      const neos = neoData.near_earth_objects[date];
      return neos.filter((neo) => !neo.is_potentially_hazardous_asteroid)
        .length;
    });

    const phoCounts = dates.map((date) => {
      const neos = neoData.near_earth_objects[date];
      return neos.filter((neo) => neo.is_potentially_hazardous_asteroid).length;
    });

    return {
      labels,
      datasets: [
        {
          label: "NEOs",
          data: regularCounts,
          backgroundColor: "#6fb2b2",
          borderColor: "#575757",
          borderWidth: 1,
        },
        {
          label: "PHOs",
          data: phoCounts,
          backgroundColor: "rgba(239, 68, 68, 0.6)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e2e8f0",
        },
      },
      title: {
        display: true,
        text: "NEOs Detected Over Last 7 Days",
        color: "#e2e8f0",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#e2e8f0",
        },
        grid: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#e2e8f0",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <>
      <div className="homeWrapper min-h-screen py-8 ">
        <div className="flex justify-center intro ">
          <h1 className="text-2xl text-text-alt ">
            Welcome to space explorer.{" "}
          </h1>
        </div>
        <div className="content flex flex-col md:flex-row gap-6 text-text py-8 md:py-16 px-4 md:px-16 ">
          <div className="news border-collapse border border-border px-4 py-2 max-h-82 overflow-y-auto md:w-1/2">
            <h2 className="">Site news:</h2>
            {news.map((story) => (
              <div className="py-1" key={story.date}>
                <p className="text-text-alt">{story.date}</p>
                <p>{story.text}</p>
              </div>
            ))}
          </div>
          <div className="neosChart border-collapse border border-border px-4 py-2 max-h-82  md:w-1/2">
            <h2 className="mb-2">Recent Neo's:</h2>
            <div className="h-68">
              {neoData && getChartData() ? (
                <Bar data={getChartData()!} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-text-alt">Loading chart data...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
