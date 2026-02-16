"use client";

import { Menu } from "@base-ui/react/menu";
import { cn } from "@repo/utils";

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut?: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <Menu.Root>
            <Menu.Trigger
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "hover:bg-gray-100 transition-colors cursor-pointer outline-none"
              )}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full ring-2 ring-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium ring-2 ring-gray-200">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-700 font-medium">{user.name || user.email}</span>
              <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Menu.Trigger>

            <Menu.Portal>
              <Menu.Positioner
                align="end"
                sideOffset={8}
                className="z-50"
              >
                <Menu.Popup
                  className={cn(
                    "min-w-56 bg-white rounded-xl shadow-xl border border-gray-200",
                    "py-1.5 outline-none overflow-hidden"
                  )}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.name || "用户"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Menu.Item
                    className={cn(
                      "px-4 py-2.5 text-sm text-gray-600 cursor-pointer",
                      "hover:bg-gray-50 hover:text-gray-900 outline-none flex items-center gap-2"
                    )}
                    onClick={() => window.location.href = "/dashboard/settings"}
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    设置
                  </Menu.Item>
                  <Menu.Item
                    className={cn(
                      "px-4 py-2.5 text-sm text-red-600 cursor-pointer",
                      "hover:bg-red-50 outline-none flex items-center gap-2"
                    )}
                    onClick={onSignOut}
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" x2="9" y1="12" y2="12"/>
                    </svg>
                    退出登录
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        )}
      </div>
    </header>
  );
}
