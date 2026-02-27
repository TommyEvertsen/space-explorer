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
          <div className="flex flex-col text-center pt-8">
            <div className="intro">
              <h1 className="title text-2xl text-text-alt">
                Astronomy picture of the day:
              </h1>
              <h2 className="text-xl font-bold mt-2 text-text">
                {apodData.title}
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-col">
            <div className="explanationWrapper order-2 lg:order-1 flex justify-center py-4">
              <div className="explanationContainer w-3/4 lg:w-2/3">
                <p className="explanation text-text leading-relaxed">
                  {apodData.explanation}
                </p>
              </div>
            </div>

            <div className="apodImage order-1 lg:order-2 flex justify-center py-4">
              <img
                src={apodData.hdurl}
                alt={apodData.title}
                className="max-w-3/4 h-auto rounded-lg border border-border"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-text text-2xl">Loading...</p>
        </div>
      )}
    </div>
  );
}
