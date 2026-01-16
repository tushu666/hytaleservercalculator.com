export interface VPSPlan {
  provider: string;
  tier: "small" | "medium" | "large";
  name: string;
  price: number;
  cpu: number;
  ram: number;
  storage: number;
  storage_type: string;
  regions: string;
  port_speed_mbps: number;
  url: string;
  notes: string;
  logo_color: string;
  _score?: number;
}

export interface UserPreferences {
  playerCount: number;
  modLevel: "vanilla" | "light" | "heavy";
  region: string;
  budget?: number;
}

import plansData from "./vps_plans.json";

// Explicit cast to ensure type safety
export const allPlans: VPSPlan[] = plansData as unknown as VPSPlan[];

export const recommendPlans = (prefs: UserPreferences): VPSPlan[] => {
  // 1. Determine Minimum Specs based on Hytale requirements
  let minRam = 4; // Base for vanilla small server
  let minCpu = 2;

  // Player count impact
  if (prefs.playerCount > 10) {
    minRam = 8;
    minCpu = 4;
  }
  if (prefs.playerCount > 50) {
    minRam = 16;
    minCpu = 6;
  }

  // Mod level impact
  if (prefs.modLevel === "light") {
    minRam += 2; // Extra buffer
  } else if (prefs.modLevel === "heavy") {
    minRam = Math.max(minRam * 1.5, 8); // At least 8GB for heavy mods
    minCpu = Math.max(minCpu, 4);
  }

  // 2. Filter Plans
  let candidates = allPlans.filter((plan) => {
    // Basic Spec Check
    if (plan.ram < minRam) return false;
    if (plan.cpu < minCpu) return false;
    
    // Region Check (Soft check - simple string matching, could be improved)
    // If user selects "Asia", prioritize plans with Asian regions, but don't strictly hide others unless requested
    // For now, we return all valid hardware matches and sort them.
    return true;
  });

  // 3. Score & Sort
  // Score = (Performance/Price) + RegionMatchBonus
  candidates = candidates.map(plan => {
    let score = 0;
    
    // Price efficiency (lower price for met specs is better)
    // Arbitrary base score minus price penalty
    score += 1000 / plan.price; 

    // Region Match Bonus
    if (prefs.region && plan.regions.toLowerCase().includes(prefs.region.toLowerCase())) {
        score += 50; // Significant boost for region match
    }

    return { ...plan, _score: score };
  }).sort((a, b) => (b._score || 0) - (a._score || 0)); // Descending score

  // Remove internal score before returning
  return candidates;
};
