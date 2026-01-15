/**
 * Hytale 服务器配置数据和工具函数
 * 设计理念：数据驱动，清晰的配置层级和性能指标
 */

export interface ServerConfig {
  id: string;
  name: string;
  tier: 'starter' | 'intermediate' | 'professional';
  cpu: number; // 核心数
  ram: number; // GB
  storage: number; // GB
  maxPlayers: number;
  monthlyPrice: number; // USD
  description: string;
  features: string[];
  cpuBottleneck: number; // CPU 瓶颈指数 (0-100)
  memoryBottleneck: number; // 内存瓶颈指数 (0-100)
}

export const serverConfigs: ServerConfig[] = [
  {
    id: 'starter-1',
    name: '入门级',
    tier: 'starter',
    cpu: 2,
    ram: 4,
    storage: 20,
    maxPlayers: 5,
    monthlyPrice: 5.99,
    description: '适合小型私服或个人游戏',
    features: ['Java 25 支持', '基础 mod 支持', '自动备份'],
    cpuBottleneck: 75,
    memoryBottleneck: 45,
  },
  {
    id: 'starter-2',
    name: '入门级 Plus',
    tier: 'starter',
    cpu: 2,
    ram: 6,
    storage: 30,
    maxPlayers: 10,
    monthlyPrice: 9.99,
    description: '适合小型社区服务器',
    features: ['Java 25 支持', '完整 mod 支持', '自动备份', '优先支持'],
    cpuBottleneck: 65,
    memoryBottleneck: 35,
  },
  {
    id: 'intermediate-1',
    name: '进阶级',
    tier: 'intermediate',
    cpu: 4,
    ram: 8,
    storage: 50,
    maxPlayers: 20,
    monthlyPrice: 19.99,
    description: '适合中型社区服务器',
    features: ['Java 25 支持', '完整 mod 支持', '自动备份', '优先支持', '性能监控'],
    cpuBottleneck: 45,
    memoryBottleneck: 40,
  },
  {
    id: 'intermediate-2',
    name: '进阶级 Plus',
    tier: 'intermediate',
    cpu: 6,
    ram: 12,
    storage: 80,
    maxPlayers: 30,
    monthlyPrice: 34.99,
    description: '适合大型社区服务器',
    features: ['Java 25 支持', '完整 mod 支持', '自动备份', '优先支持', '性能监控', 'DDoS 防护'],
    cpuBottleneck: 35,
    memoryBottleneck: 30,
  },
  {
    id: 'professional-1',
    name: '专业级',
    tier: 'professional',
    cpu: 8,
    ram: 16,
    storage: 120,
    maxPlayers: 50,
    monthlyPrice: 59.99,
    description: '适合大型公共服务器',
    features: ['Java 25 支持', '完整 mod 支持', '自动备份', '优先支持', '性能监控', 'DDoS 防护', '负载均衡'],
    cpuBottleneck: 25,
    memoryBottleneck: 20,
  },
  {
    id: 'professional-2',
    name: '企业级',
    tier: 'professional',
    cpu: 12,
    ram: 32,
    storage: 200,
    maxPlayers: 100,
    monthlyPrice: 119.99,
    description: '适合超大型公共服务器',
    features: ['Java 25 支持', '完整 mod 支持', '自动备份', '优先支持', '性能监控', 'DDoS 防护', '负载均衡', '专属支持'],
    cpuBottleneck: 15,
    memoryBottleneck: 10,
  },
];

/**
 * 根据玩家数量推荐服务器配置
 */
export function recommendConfig(playerCount: number): ServerConfig | null {
  const recommended = serverConfigs.find(config => config.maxPlayers >= playerCount);
  return recommended || null;
}

/**
 * 计算租用成本
 * @param monthlyPrice 月价格
 * @param months 租用月数
 * @param discountRate 折扣率 (0-1)
 */
export function calculateCost(
  monthlyPrice: number,
  months: number,
  discountRate: number = 0
): number {
  const totalCost = monthlyPrice * months;
  return totalCost * (1 - discountRate);
}

/**
 * 获取折扣率
 * @param months 租用月数
 */
export function getDiscountRate(months: number): number {
  if (months >= 12) return 0.2; // 20% 折扣
  if (months >= 6) return 0.15; // 15% 折扣
  if (months >= 3) return 0.1; // 10% 折扣
  return 0; // 无折扣
}

/**
 * 性能数据：不同玩家数量下的 CPU 和内存消耗
 */
export interface PerformanceData {
  players: number;
  cpu: number; // CPU 使用率百分比
  memory: number; // 内存使用率百分比
}

export function getPerformanceData(config: ServerConfig): PerformanceData[] {
  const baselineCpuPerPlayer = 100 / config.maxPlayers;
  const baselineMemoryPerPlayer = 100 / config.maxPlayers;

  return Array.from({ length: config.maxPlayers + 1 }, (_, i) => {
    const players = i;
    // CPU 随玩家数量线性增长
    const cpu = Math.min(100, players * baselineCpuPerPlayer * 0.9);
    // 内存增长趋势：前期快速增长，后期趋于平缓
    const memoryFactor = Math.log(players + 1) / Math.log(config.maxPlayers + 1);
    const memory = Math.min(100, memoryFactor * 100 * 0.85);

    return { players, cpu, memory };
  });
}

/**
 * 获取所有配置的性能对比数据
 */
export function getAllPerformanceComparison(playerCount: number) {
  return serverConfigs.map(config => {
    const cpuUsage = (playerCount / config.maxPlayers) * 100;
    const memoryUsage = Math.min(100, (playerCount / config.maxPlayers) * 100 * 0.9);

    return {
      configName: config.name,
      tier: config.tier,
      cpu: Math.min(100, cpuUsage),
      memory: Math.min(100, memoryUsage),
      maxPlayers: config.maxPlayers,
      monthlyPrice: config.monthlyPrice,
    };
  });
}
