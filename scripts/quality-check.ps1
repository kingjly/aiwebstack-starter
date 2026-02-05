# AIWebStack 脚手架 - 代码质量检查脚本
# PowerShell 脚本，用于检查代码质量

$ErrorActionPreference = "Continue"
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = Split-Path -Parent $scriptPath

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  AIWebStack 代码质量检查" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 检查工具是否安装
function Test-Command {
    param([string]$Command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = "Stop"
    try {
        if (Get-Command $Command -ErrorAction SilentlyContinue) {
            return $true
        }
        return $false
    }
    catch {
        return $false
    }
    finally {
        $ErrorActionPreference = $oldPreference
    }
}

# 错误和警告计数
$script:errors = 0
$script:warnings = 0

# Task 1: TypeScript 类型检查
Write-Host "[1/5] TypeScript 类型检查..." -ForegroundColor Cyan
if (Test-Command "pnpm") {
    Set-Location $rootPath
    $output = pnpm typecheck 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ TypeScript 类型检查通过" -ForegroundColor Green
    } else {
        Write-Host "  ✗ TypeScript 类型检查失败" -ForegroundColor Red
        Write-Host $output -ForegroundColor DarkGray
        $script:errors++
    }
} else {
    Write-Host "  ! pnpm 未安装，跳过类型检查" -ForegroundColor Yellow
    $script:warnings++
}

# Task 2: ESLint 检查
Write-Host "`n[2/5] ESLint 代码检查..." -ForegroundColor Cyan
if (Test-Command "eslint") {
    Set-Location $rootPath
    $output = pnpm lint 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ ESLint 检查通过" -ForegroundColor Green
    } else {
        Write-Host "  ✗ ESLint 检查发现问题" -ForegroundColor Red
        Write-Host $output -ForegroundColor DarkGray
        $script:errors++
    }
} else {
    Write-Host "  ! ESLint 未安装，跳过检查" -ForegroundColor Yellow
    $script:warnings++
}

# Task 3: 检查文件复杂度（手动检查提示）
Write-Host "`n[3/5] 代码复杂度检查..." -ForegroundColor Cyan
Write-Host "  提示: 请确保以下指标符合规范：" -ForegroundColor Gray
Write-Host "    - 圈复杂度 < 10" -ForegroundColor Gray
Write-Host "    - 文件行数 < 500" -ForegroundColor Gray
Write-Host "    - 函数长度 < 50 行" -ForegroundColor Gray
Write-Host "    - 嵌套层级 ≤ 3" -ForegroundColor Gray

# Task 4: 检查 TypeScript 版本一致性
Write-Host "`n[4/5] TypeScript 版本一致性检查..." -ForegroundColor Cyan
$tsVersions = @()
Get-ChildItem -Path $rootPath -Recurse -Filter "package.json" | Where-Object {
    $_.FullName -notmatch "node_modules"
} | ForEach-Object {
    $content = Get-Content $_.FullName -Raw | ConvertFrom-Json
    if ($content.devDependencies.typescript) {
        $tsVersions += [PSCustomObject]@{
            File = $_.FullName.Replace($rootPath, "").TrimStart("\")
            Version = $content.devDependencies.typescript
        }
    }
}

$uniqueVersions = $tsVersions | Select-Object -ExpandProperty Version -Unique
if ($uniqueVersions.Count -eq 1) {
    Write-Host "  ✓ TypeScript 版本统一: $uniqueVersions" -ForegroundColor Green
} else {
    Write-Host "  ✗ TypeScript 版本不一致:" -ForegroundColor Red
    $tsVersions | Format-Table -AutoSize
    $script:errors++
}

# Task 5: 检查配置文件
Write-Host "`n[5/5] 配置文件检查..." -ForegroundColor Cyan
$configFiles = @(
    "eslint.config.mjs",
    ".env.example",
    ".prettierrc"
)

$missingFiles = @()
foreach ($file in $configFiles) {
    $filePath = Join-Path $rootPath $file
    if (-not (Test-Path $filePath)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -eq 0) {
    Write-Host "  ✓ 所有配置文件存在" -ForegroundColor Green
} else {
    Write-Host "  ! 缺少配置文件:" -ForegroundColor Yellow
    $missingFiles | ForEach-Object { Write-Host "    - $_" -ForegroundColor Yellow }
    $script:warnings++
}

# 总结
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  检查结果总结" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($script:errors -eq 0 -and $script:warnings -eq 0) {
    Write-Host "  ✓ 所有检查通过！" -ForegroundColor Green
    exit 0
} elseif ($script:errors -eq 0) {
    Write-Host "  ! 检查通过，但有 $script:warnings 个警告" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "  ✗ 检查失败：$script:errors 个错误，$script:warnings 个警告" -ForegroundColor Red
    exit 1
}
