/**
 * VPS 提供商数据和工具函数
 * 与 Hytale 服务器配置关联
 */

import vpsPlansData from './vps_plans.json';

export interface VPSPlan {
  provider: string;
  tier: 'small' | 'medium' | 'large';
  name: string;
  price: number;
  cpu: number;
  ram: number;
  storage: number;
  storage_type: string;
  regions: string;
  port_speed_mbps?: number;
  url: string;
  notes: string;
  logo_color: string;
  _score?: number;
}

export const allPlans: VPSPlan[] = vpsPlansData as unknown as VPSPlan[];

/**
 * 根据 Hytale 配置推荐 VPS 计划
 * @param cpu 所需 CPU 核心数
 * @param ram 所需内存 GB
 * @param maxPlayers 最大玩家数
 */
export function recommendVPSPlans(cpu: number, ram: number, maxPlayers: number): VPSPlan[] {
  // 过滤满足最低要求的计划
  let candidates = allPlans.filter((plan) => {
    return plan.cpu >= cpu && plan.ram >= ram;
  });

  // 评分：性价比 + 性能匹配度
  candidates = candidates.map(plan => {
    let score = 0;

    // 性价比：性能/价格
    const performanceScore = (plan.cpu * 10 + plan.ram * 5) / plan.price;
    score += performanceScore;

    // 完美匹配奖励（CPU 和 RAM 都恰好满足或略高于需求）
    if (plan.cpu === cpu && plan.ram === ram) {
      score += 100;
    } else if (plan.cpu === cpu * 1.5 && plan.ram === ram * 1.5) {
      score += 50;
    }

    // 价格合理性奖励
    if (plan.price <= 50) {
      score += 20;
    }

    return { ...plan, _score: score };
  }).sort((a, b) => (b._score || 0) - (a._score || 0));

  return candidates.slice(0, 6); // 返回前 6 个推荐
}

/**
 * 获取所有 VPS 提供商
 */
export function getProviders(): string[] {
  return Array.from(new Set(allPlans.map(p => p.provider)));
}

/**
 * 根据配置等级获取推荐的 VPS 计划
 * @param tier 配置等级：'starter' | 'intermediate' | 'professional'
 */
export function getVPSPlansByTier(tier: 'starter' | 'intermediate' | 'professional'): VPSPlan[] {
  const tierMap = {
    starter: { cpu: 2, ram: 4 },
    intermediate: { cpu: 4, ram: 8 },
    professional: { cpu: 8, ram: 16 },
  };

  const { cpu, ram } = tierMap[tier];
  return recommendVPSPlans(cpu, ram, 0);
}
