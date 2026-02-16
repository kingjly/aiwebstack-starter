"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: NavItem[];
  collapsed?: boolean;
}

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const getDefaultIcon = (href: string) => {
  if (href === "/dashboard" || href === "/") return <HomeIcon />;
  if (href.includes("users")) return <UsersIcon />;
  if (href.includes("settings")) return <SettingsIcon />;
  return <HomeIcon />;
};

export function Sidebar({ items, collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 transition-all duration-300",
        "bg-white border-r border-gray-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex items-center h-16 border-b border-gray-200",
        collapsed ? "justify-center" : "justify-start px-5"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          {!collapsed && (
            <span className="text-gray-900 font-semibold text-lg tracking-tight">AIWebStack</span>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const isExactMatch = pathname === item.href;
            const isChildMatch = item.href !== "/" && 
              item.href !== "/dashboard" && 
              pathname.startsWith(item.href + "/");
            const isActive = isExactMatch || isChildMatch;
            const icon = item.icon || getDefaultIcon(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <span className={cn(
                    "flex-shrink-0 transition-transform duration-200",
                    !isActive && "group-hover:scale-110"
                  )}>
                    {icon}
                  </span>
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">AIWebStack v1.0</p>
            <p className="text-xs text-gray-400 mt-1">现代 Web 开发脚手架</p>
          </div>
        </div>
      )}
    </aside>
  );
}
