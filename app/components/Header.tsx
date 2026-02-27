"use client";

import { FaBars } from "react-icons/fa";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="headerWrapper">
        <div className="header flex bg-off-background p-4 h-12  items-center">
          <FaBars
            className="cursor-pointer hover:text-hover text-text-alt"
            onClick={() => setOpen(!open)}
          />
          <h2
            className="px-2 cursor-pointer hover:text-hover text-text"
            onClick={goToHome}
          >
            Space Explorer
          </h2>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
