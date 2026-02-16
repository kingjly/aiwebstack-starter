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
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export function Header({ user, onSignOut, theme = "light", onToggleTheme }: HeaderProps) {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-primary">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* 主题切换按钮 */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              "text-muted-foreground hover:text-primary hover:bg-muted",
              "transition-colors outline-none focus:ring-2 focus:ring-blue-500/20"
            )}
            title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        )}

        {user && (
          <Menu.Root>
            <Menu.Trigger
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "hover:bg-muted transition-colors cursor-pointer outline-none"
              )}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full ring-2 ring-border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-secondary text-sm font-medium ring-2 ring-border">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-secondary font-medium">{user.name || user.email}</span>
              <svg className="w-4 h-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    "min-w-56 bg-surface rounded-xl shadow-xl border border-border",
                    "py-1.5 outline-none overflow-hidden"
                  )}
                >
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-primary">{user.name || "用户"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Menu.Item
                    className={cn(
                      "px-4 py-2.5 text-sm text-secondary cursor-pointer",
                      "hover:bg-muted hover:text-primary outline-none flex items-center gap-2"
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
                      "px-4 py-2.5 text-sm text-error cursor-pointer",
                      "hover:bg-error/10 outline-none flex items-center gap-2"
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
