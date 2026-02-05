/**
 * 首页
 *
 * AI 参考示例
 */
import { PageHeader } from '@repo/ui/blocks/page-header';
import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="欢迎使用 AIWebStack"
        description="基于 Next.js 15 + Base UI + tRPC 的全栈脚手架"
        actions={
          <Link href="/users">
            <Button>用户管理示例</Button>
          </Link>
        }
      />

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
