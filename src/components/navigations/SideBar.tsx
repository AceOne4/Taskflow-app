"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/home/dashboard" },
    { name: "Projects", href: "/home/projects" },
    { name: "Tasks", href: "/home/tasks" },
    { name: "Reports", href: "/home/reports" },
  ];

  return (
    <div className="min-h-screen flex flex-col   text-white w-64 border-r-2 border-b-2 border-indigo-500 rounded-lg">
      <div className="flex-grow">
        <nav className="mt-5  pl-5 flex flex-col justify-center gap-2">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={`block px-4 py-2 mt-2 rounded text-sm font-medium ${
                pathname === item.href
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
