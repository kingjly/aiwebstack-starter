# AIWebStack 启动脚本
# 使用方法: .\start.ps1

Write-Host "🚀 AIWebStack 启动中..." -ForegroundColor Green

# 1. 安装依赖
Write-Host "`n📦 步骤 1/4: 安装依赖..." -ForegroundColor Yellow
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

# 2. 生成 Prisma 客户端
Write-Host "`n⚙️  步骤 2/4: 生成 Prisma 客户端..." -ForegroundColor Yellow
pnpm db:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma 客户端生成失败" -ForegroundColor Red
    exit 1
}

# 3. 推送数据库结构
Write-Host "`n🗄️  步骤 3/4: 推送数据库结构..." -ForegroundColor Yellow
pnpm db:push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 数据库结构推送失败（请确保 Docker PostgreSQL 正在运行）" -ForegroundColor Red
    exit 1
}

# 4. 启动开发服务器
Write-Host "`n🌐 步骤 4/4: 启动开发服务器..." -ForegroundColor Yellow
Write-Host "✅ 服务即将启动在 http://localhost:3024" -ForegroundColor Green
pnpm dev
