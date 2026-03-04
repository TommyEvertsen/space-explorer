"use client";

import { useEffect, useState } from "react";
import type MarsRoverPhotos from "@/app/lib/interface/Mrp";

const Mrp = () => {
  const [mrpData, setMrpData] = useState<MarsRoverPhotos | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/mrp`);
        if (!response.ok) {
          throw new Error(`error ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setMrpData(data);
      } catch (error) {
        console.error("Error fetching MRP:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mrpWrapper">
        <h1>Mars rover photos</h1>
      </div>
    </>
  );
};

export default Mrp;
