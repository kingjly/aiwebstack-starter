"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@repo/ui";
import { useTheme } from "@/components/ThemeProvider";

const sidebarItems = [
  { title: "概览", href: "/dashboard" },
  { title: "用户管理", href: "/dashboard/users" },
  { title: "设置", href: "/dashboard/settings" },
];

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerProps={{
        user: session?.user,
      }}
      onSignOut={handleSignOut}
      theme={resolvedTheme}
      onToggleTheme={handleToggleTheme}
    >
      {children}
    </DashboardLayout>
  );
}
