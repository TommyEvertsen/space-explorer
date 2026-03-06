"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import type NeoInterface from "@/app/lib/interface/Neo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Neo = () => {
  const [neoData, setNeoData] = useState<NeoInterface | null>(null);

  const today = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/neo`);
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

  const getScatterData = () => {
    const neos = getAllNeos();
    if (neos.length === 0) return null;

    const scatterData = neos.map((neo, index) => {
      const missDistance = parseFloat(
        neo.close_approach_data[0]?.miss_distance.kilometers || "0",
      );

      return {
        x: index + 1,
        y: missDistance / 1000000,
        name: neo.name,
        isPho: neo.is_potentially_hazardous_asteroid,
      };
    });

    const regularNeos = scatterData.filter((neo) => !neo.isPho);
    const phoNeos = scatterData.filter((neo) => neo.isPho);

    return {
      datasets: [
        {
          label: "NEOs",
          data: regularNeos,
          backgroundColor: "#6fb2b2",
          borderColor: "#575757",
          pointRadius: 4,
        },
        {
          label: "PHOs",
          data: phoNeos,
          backgroundColor: "rgba(239, 68, 68, 0.6)",
          borderColor: "rgba(239, 68, 68, 1)",
          pointRadius: 6,
        },
      ],
    };
  };

  const scatterOptions = {
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
        text: "NEO Miss Distances from Earth",
        color: "#e2e8f0",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const neo = context.raw;
            return [
              `Name: ${neo.name}`,
              `Distance: ${context.parsed.y.toFixed(2)} million km`,
              `PHO: ${neo.isPho ? "Yes" : "No"}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "NEO Index",
          color: "#e2e8f0",
        },
        ticks: {
          color: "#e2e8f0",
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        title: {
          display: true,
          text: "Miss Distance (Million km)",
          color: "#e2e8f0",
        },
        ticks: {
          color: "#e2e8f0",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  const handleRowClick = (nasa_jpl_url: string) => {
    window.open(nasa_jpl_url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-text py-8 px-4">
      <div className="neoWrapper">
        <div className="intro mb-6">
          <h1 className="text-2xl text-text-alt text-center">
            Near Earth Objects
          </h1>
          <p className="text-center text-text text-xl mt-2">Today: {today}</p>
        </div>

        {neoData ? (
          <>
            <div className="chartWrapper mb-8">
              <div className="flex justify-center">
                <div className="w-full max-w-6xl border border-border p-4 rounded">
                  <div className="h-96">
                    {getScatterData() ? (
                      <Scatter
                        data={getScatterData()!}
                        options={scatterOptions}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-text-alt">Loading chart data...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block tableWrapper overflow-x-auto  py-2">
              <div className="flex justify-center">
                <table className="w-full max-w-6xl border-collapse border border-border">
                  <thead>
                    <tr className="bg-off-background">
                      <th className="border border-border p-2 text-left">
                        Name
                      </th>
                      <th className="border border-border p-2 text-left">
                        Diameter (km)
                      </th>
                      <th className="border border-border p-2 text-left">
                        Velocity (km/h)
                      </th>
                      <th className="border border-border p-2 text-left">
                        Miss Distance (km)
                      </th>
                      <th className="border border-border p-2 text-left">
                        PHO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllNeos().map((neo) => (
                      <tr
                        key={neo.id}
                        className="hover:bg-off-background cursor-pointer"
                        onClick={() => handleRowClick(neo.nasa_jpl_url)}
                      >
                        <td className="border border-border p-3">{neo.name}</td>
                        <td className="border border-border p-3">
                          {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                            2,
                          )}{" "}
                          -
                          {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                            2,
                          )}
                        </td>
                        <td className="border border-border p-3">
                          {neo.close_approach_data[0]?.relative_velocity
                            .kilometers_per_hour &&
                            parseInt(
                              neo.close_approach_data[0].relative_velocity
                                .kilometers_per_hour,
                            ).toLocaleString()}
                        </td>
                        <td className="border border-border p-3">
                          {neo.close_approach_data[0]?.miss_distance
                            .kilometers &&
                            parseInt(
                              neo.close_approach_data[0].miss_distance
                                .kilometers,
                            ).toLocaleString()}
                        </td>
                        <td className="border border-border p-3">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              neo.is_potentially_hazardous_asteroid
                                ? "bg-red-600 text-white"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            {neo.is_potentially_hazardous_asteroid
                              ? "Yes"
                              : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:hidden space-y-4">
              {getAllNeos().map((neo) => (
                <div
                  key={neo.id}
                  className="bg-off-background border border-border rounded-lg p-4 cursor-pointer hover:bg-opacity-80"
                  onClick={() => handleRowClick(neo.nasa_jpl_url)}
                >
                  <h3 className="text-lg font-bold text-text-alt mb-2">
                    {neo.name}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text opacity-75">Diameter:</span>
                      <span className="text-text">
                        {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                          2,
                        )}{" "}
                        -
                        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                          2,
                        )}{" "}
                        km
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-text opacity-75">Velocity:</span>
                      <span className="text-text">
                        {neo.close_approach_data[0]?.relative_velocity
                          .kilometers_per_hour &&
                          parseInt(
                            neo.close_approach_data[0].relative_velocity
                              .kilometers_per_hour,
                          ).toLocaleString()}{" "}
                        km/h
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-text opacity-75">
                        Miss Distance:
                      </span>
                      <span className="text-text">
                        {neo.close_approach_data[0]?.miss_distance.kilometers &&
                          parseInt(
                            neo.close_approach_data[0].miss_distance.kilometers,
                          ).toLocaleString()}{" "}
                        km
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-text opacity-75">Hazardous:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          neo.is_potentially_hazardous_asteroid
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-text text-xl">Loading NEO data...</p>
          </div>
        )}
      </div>
      <div className="explWrapper flex flex-col gap-y-2 justify-center w-full max-w-6xl mx-auto mt-4 px-2 text-sm ">
        <div className="expl    ">
          <p>Explanation:</p>
        </div>
        <div className="expl">
          <p className="text-text-alt">NEO:</p>
          <p>
            NEOs are asteroids and comets with perihelion distance q less than
            1.3 au . Near-Earth Comets (NECs) are further restricted to include
            only short-period comets (i.e., orbital period P less than 200
            years). The vast majority of NEOs are asteroids
          </p>
        </div>
        <div className="expl">
          <p className="text-text-alt">PHO:</p>
          <p>
            Potentially Hazardous Objects (PHOs): Not all NEOs are dangerous. An
            object is classified as a "Potentially Hazardous Object" only if it
            meets two specific criteria: Its orbit brings it within 0.05 AU
            (about 7.5 million kilometers or 4.6 million miles) of Earth's
            orbit. It is large enough to cause significant regional or global
            damage, generally defined as being at least 140 meters (460 feet) in
            diameter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Neo;
