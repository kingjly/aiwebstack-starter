/**
 * 首页
 *
 * AI 参考示例
 */
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">欢迎使用 AIWebStack</h1>
        <p className="mt-2 text-muted-foreground">基于 Next.js 15 + Base UI + tRPC 的全栈脚手架</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <FeatureCard
          title="🚀 快速开发"
          description="Next.js 15 App Router + Server Components"
        />
        <FeatureCard
          title="🎨 灵活样式"
          description="Base UI 无头组件 + Tailwind CSS v4"
        />
        <FeatureCard
          title="🔒 类型安全"
          description="tRPC + Prisma 端到端类型安全"
        />
      </div>

      <div className="mt-8">
        <Link
          href="/users"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 px-4 py-2 text-base"
        >
          用户管理示例
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
