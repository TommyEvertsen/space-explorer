"use client";

import ApodInterface from "@/app/lib/interface/Apod";
import { useEffect, useState } from "react";

export default function Home() {
  const [apodData, setApodData] = useState<ApodInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/apod`);
        if (!response.ok) {
          throw new Error(`error ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setApodData(data);
      } catch (error) {
        console.error("Error fetching APOD:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text py-4">
      {apodData ? (
        <>
          <div className="flex justify-center py-8">
            <div className="title">
              <h1 className="text-3xl font-bold text-text">{apodData.title}</h1>
            </div>
          </div>
          <div className="apodImage flex justify-center">
            <img
              src={apodData.hdurl}
              alt={apodData.title}
              className="max-w-full h-auto rounded-lg border border-border"
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-text-alt">Loading...</p>
        </div>
      )}
    </div>
  );
}
