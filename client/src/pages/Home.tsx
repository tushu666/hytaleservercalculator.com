import { useState, useMemo } from 'react';
import { serverConfigs, recommendConfig, getAllPerformanceComparison } from '@/lib/serverConfigs';
import { ConfigCard } from '@/components/ConfigCard';
import { CostCalculator } from '@/components/CostCalculator';
import { ServerConfig } from '@/lib/serverConfigs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Zap, ExternalLink } from 'lucide-react';
import { VPSProviders } from './VPSProviders';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

/**
 * 主页面 - Hytale 服务器配置推荐
 * 设计理念：渐进式信息架构，从推荐开始，逐步深入到成本和性能分析
 */
export default function Home() {
  const [selectedConfig, setSelectedConfig] = useState<ServerConfig | null>(null);
  const [playerCount, setPlayerCount] = useState(10);
  const [showVPSProviders, setShowVPSProviders] = useState(false);

  // 推荐配置
  const recommendedConfig = useMemo(() => recommendConfig(playerCount), [playerCount]);

  // 性能对比数据
  const performanceComparison = useMemo(() => getAllPerformanceComparison(playerCount), [playerCount]);

  // 选中的配置或推荐配置
  const activeConfig = selectedConfig || recommendedConfig;

  // 性能详细数据（针对选中配置）
  const performanceDetail = useMemo(() => {
    if (!activeConfig) return [];
    const baselineCpuPerPlayer = 100 / activeConfig.maxPlayers;
    const baselineMemoryPerPlayer = 100 / activeConfig.maxPlayers;

    return Array.from({ length: activeConfig.maxPlayers + 1 }, (_, i) => {
      const players = i;
      const cpu = Math.min(100, players * baselineCpuPerPlayer * 0.9);
      const memoryFactor = Math.log(players + 1) / Math.log(activeConfig.maxPlayers + 1);
      const memory = Math.min(100, memoryFactor * 100 * 0.85);

      return { players, cpu, memory };
    });
  }, [activeConfig]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* VPS 提供商页面 */}
      {showVPSProviders && activeConfig && (
        <div className="py-20 bg-background">
          <div className="container max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-2">VPS 提供商推荐</h2>
                <p className="text-muted-foreground">
                  基于 {activeConfig.name} 配置的 VPS 提供商推荐
                </p>
              </div>
              <Button
                onClick={() => setShowVPSProviders(false)}
                variant="outline"
                className="transition-smooth"
              >
                返回推荐
              </Button>
            </div>
            <VPSProviders selectedConfigTier={activeConfig.tier} />
          </div>
        </div>
      )}

      {/* 主推荐页面 */}
      {!showVPSProviders && (
        <>
          {/* Hero Section */}
          <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: 'url(/images/hero-background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* 深色叠加层 */}
            <div className="absolute inset-0 bg-black/60" />

            {/* 内容 */}
            <div className="relative z-10 container max-w-4xl text-center space-y-6 py-20">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gradient">
                  Hytale 服务器配置推荐专家
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  快速找到适合您的 VPS 配置，精准计算租用成本，深入了解性能瓶颈
                </p>
              </div>

              {/* 玩家数量输入 */}
              <div className="glass-effect rounded-lg p-8 max-w-md mx-auto space-y-4 mt-12">
                <div className="space-y-3">
                  <Label htmlFor="player-count" className="text-base font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    您计划有多少玩家？
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="player-count"
                      type="range"
                      min="1"
                      max="100"
                      value={playerCount}
                      onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-accent min-w-12 text-right">{playerCount}</span>
                  </div>
                </div>

                {/* 推荐提示 */}
                {recommendedConfig && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-left">
                    <div className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-accent">推荐配置</p>
                        <p className="text-sm text-foreground mt-1">
                          {recommendedConfig.name} - {recommendedConfig.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 配置推荐区域 */}
          <section className="py-20 bg-background">
            <div className="container max-w-6xl">
              <div className="text-center mb-12 space-y-2">
                <h2 className="text-4xl font-bold text-foreground">选择您的服务器配置</h2>
                <p className="text-muted-foreground">
                  为 {playerCount} 个玩家选择最合适的配置
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serverConfigs.map((config) => (
                  <ConfigCard
                    key={config.id}
                    config={config}
                    isRecommended={config.id === recommendedConfig?.id}
                    onSelect={setSelectedConfig}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 成本估算和性能对比区域 */}
          {activeConfig && (
            <section className="py-20 bg-card/30 border-t border-border/20">
              <div className="container max-w-6xl">
                <div className="text-center mb-12 space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">
                    {activeConfig.name} 详细分析
                  </h2>
                  <p className="text-muted-foreground">
                    成本估算和性能分析
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* 成本估算器 */}
                  <CostCalculator config={activeConfig} />

                  {/* 配置对比 */}
                  <Card className="card-elevated p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">配置对比</h3>
                      <p className="text-sm text-muted-foreground">
                        {playerCount} 个玩家时的性能使用率
                      </p>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(101, 218, 255, 0.1)" />
                        <XAxis
                          dataKey="configName"
                          tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(24, 24, 32, 0.9)',
                            border: '1px solid rgba(101, 218, 255, 0.3)',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        />
                        <Legend />
                        <Bar dataKey="cpu" fill="oklch(0.65 0.15 180)" name="CPU 使用率 (%)" />
                        <Bar dataKey="memory" fill="oklch(0.65 0.2 25)" name="内存使用率 (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* 性能曲线 */}
                <Card className="card-elevated p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {activeConfig.name} - 性能曲线
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      随着玩家数量增加，CPU 和内存的使用率变化趋势
                    </p>
                  </div>

                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={performanceDetail}>
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.65 0.15 180)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="oklch(0.65 0.15 180)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.65 0.2 25)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="oklch(0.65 0.2 25)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(101, 218, 255, 0.1)" />
                      <XAxis
                        dataKey="players"
                        label={{ value: '玩家数量', position: 'insideBottomRight', offset: -5 }}
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                      />
                      <YAxis
                        label={{ value: '使用率 (%)', angle: -90, position: 'insideLeft' }}
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(24, 24, 32, 0.9)',
                          border: '1px solid rgba(101, 218, 255, 0.3)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cpu"
                        stroke="oklch(0.65 0.15 180)"
                        strokeWidth={3}
                        dot={false}
                        name="CPU 使用率 (%)"
                        isAnimationActive={true}
                      />
                      <Line
                        type="monotone"
                        dataKey="memory"
                        stroke="oklch(0.65 0.2 25)"
                        strokeWidth={3}
                        dot={false}
                        name="内存使用率 (%)"
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* 性能分析 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border/20">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-accent">CPU 瓶颈指数</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${activeConfig.cpuBottleneck}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-accent">{activeConfig.cpuBottleneck}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activeConfig.cpuBottleneck > 60
                          ? '⚠️ CPU 可能成为瓶颈'
                          : activeConfig.cpuBottleneck > 40
                            ? '⚡ CPU 性能充足'
                            : '✓ CPU 性能优异'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-orange-400">内存瓶颈指数</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-400 transition-all duration-500"
                            style={{ width: `${activeConfig.memoryBottleneck}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-orange-400">{activeConfig.memoryBottleneck}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activeConfig.memoryBottleneck > 60
                          ? '⚠️ 内存可能成为瓶颈'
                          : activeConfig.memoryBottleneck > 40
                            ? '⚡ 内存性能充足'
                            : '✓ 内存性能优异'}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          )}

          {/* VPS 提供商快速链接 */}
          {activeConfig && (
            <section className="py-20 bg-card/30 border-t border-border/20">
              <div className="container max-w-6xl">
                <div className="text-center mb-12 space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">
                    查看 VPS 提供商
                  </h2>
                  <p className="text-muted-foreground">
                    浏览所有推荐的 VPS 提供商计划，找到最适合您的选择
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="card-elevated p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">所有 VPS 计划</h3>
                    <p className="text-sm text-muted-foreground">
                      浏览完整的 VPS 提供商列表，包括 DigitalOcean、Vultr、Linode 等多家提供商的计划。
                    </p>
                    <Button
                      onClick={() => setShowVPSProviders(true)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-smooth"
                    >
                      查看所有计划
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>

                  <Card className="card-elevated p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">配置匹配推荐</h3>
                    <p className="text-sm text-muted-foreground">
                      根据 {activeConfig.name} 配置的 CPU ({activeConfig.cpu} 核) 和内存 ({activeConfig.ram}GB)，我们为您推荐最合适的 VPS 计划。
                    </p>
                    <Button
                      onClick={() => setShowVPSProviders(true)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-smooth"
                    >
                      查看推荐计划
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* 页脚 */}
          <footer className="py-8 border-t border-border/20 bg-card/50">
            <div className="container max-w-6xl text-center text-sm text-muted-foreground">
              <p>
                Hytale 服务器配置推荐专家 | 帮助您选择最合适的 VPS 配置
              </p>
              <p className="mt-2 text-xs">
                数据基于 Hytale 官方系统要求和社区反馈
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
