"use client";

import { useRouter } from "next/navigation";
import {
  FaGlobe,
  FaHome,
  FaSatellite,
  FaMeteor,
  FaRobot,
} from "react-icons/fa";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const router = useRouter();

  const home = () => {
    router.push("/");
  };

  const apod = () => {
    router.push("/apod");
  };

  const neo = () => {
    router.push("/neo");
  };

  const mrp = () => {
    router.push("/mrp");
  };

  const links = [
    {
      title: "Home",
      onclick: home,
      icon: FaGlobe,
    },
    {
      title: "Apod",
      onclick: apod,
      icon: FaSatellite,
    },
    {
      title: "Neo",
      onclick: neo,
      icon: FaMeteor,
    },
    {
      title: "Mrp",
      onclick: mrp,
      icon: FaRobot,
    },
  ];

  return (
    <>
      <div
        className={`
        sideBar bg-off-background w-42 absolute top-12 left-0 h-max z-50 border border-r
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <nav className="">
          <ul className="navLinks "></ul>
          {links.map((link, index) => (
            <li
              key={index}
              className="py-2 px-4  cursor-pointer text-text hover:text-hover  flex items-center gap-2"
              onClick={link.onclick}
            >
              <link.icon />
              <span>{link.title}</span>
            </li>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
