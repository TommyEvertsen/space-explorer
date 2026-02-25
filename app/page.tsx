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

  return <h1>Home</h1>;
}
