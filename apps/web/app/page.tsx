import Link from "next/link";
import { Button } from "@repo/ui";

const features = [
  {
    title: "认证系统",
    description: "基于 Better Auth 的完整认证方案，支持邮箱密码登录",
    href: "/login",
    icon: "🔐",
  },
  {
    title: "Dashboard 布局",
    description: "响应式侧边栏、头部导航、用户菜单",
    href: "/dashboard",
    icon: "📊",
  },
  {
    title: "表单组件",
    description: "React Hook Form + Zod 验证的表单示例",
    href: "/demo/forms",
    icon: "📝",
  },
  {
    title: "UI 组件库",
    description: "Button、Dialog、Menu、Tabs 等所有组件展示",
    href: "/demo/components",
    icon: "🎨",
  },
  {
    title: "tRPC 数据",
    description: "类型安全的 API 调用示例",
    href: "/demo/trpc",
    icon: "⚡",
  },
  {
    title: "错误处理",
    description: "Error Boundary 错误边界演示",
    href: "/demo/error-boundary",
    icon: "🛡️",
  },
] as const;

const techStack = [
  { name: "Next.js", version: "16.1.6", color: "bg-black" },
  { name: "React", version: "19.2.4", color: "bg-blue-500" },
  { name: "TypeScript", version: "5.9.3", color: "bg-blue-600" },
  { name: "tRPC", version: "11.9.0", color: "bg-teal-500" },
  { name: "Prisma", version: "7.3.0", color: "bg-indigo-500" },
  { name: "Tailwind CSS", version: "4.1.18", color: "bg-cyan-500" },
  { name: "Base UI", version: "1.1.0", color: "bg-purple-500" },
  { name: "Better Auth", version: "latest", color: "bg-green-500" },
  { name: "React Hook Form", version: "7.x", color: "bg-pink-500" },
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-gray-900">AIWebStack</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">登录</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">注册</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            全栈应用脚手架
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            基于 Next.js 16、tRPC、Prisma、Base UI 和 Tailwind CSS v4
            构建的现代化全栈应用模板
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">进入 Dashboard</Button>
            </Link>
            <Link href="/demo/components">
              <Button variant="outline" size="lg">查看组件</Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            功能示例
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${tech.color} rounded-lg mx-auto mb-3 flex items-center justify-center text-white text-xs font-bold`}>
                  {tech.name.charAt(0)}
                </div>
                <div className="font-medium text-gray-900">{tech.name}</div>
                <div className="text-xs text-gray-500 mt-1">v{tech.version}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            项目结构
          </h2>
          <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono text-gray-300 overflow-x-auto">
            <pre>{`aiwebstack-starter/
├── apps/
│   └── web/                 # Next.js 应用
│       ├── app/             # App Router 页面
│       │   ├── api/         # API 路由 (tRPC, Auth)
│       │   ├── dashboard/   # Dashboard 页面
│       │   ├── demo/        # 示例页面
│       │   ├── login/       # 登录页面
│       │   └── register/    # 注册页面
│       └── lib/             # 工具库 (auth, trpc)
├── packages/
│   ├── api/                 # tRPC 路由定义
│   ├── db/                  # Prisma 数据库
│   ├── ui/                  # UI 组件库
│   └── utils/               # 共享工具
└── turbo.json              # Turborepo 配置`}</pre>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-gray-600">
          <p>AIWebStack Starter - 现代化全栈应用脚手架</p>
        </div>
      </footer>
    </div>
  );
}
