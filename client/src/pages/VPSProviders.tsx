import { useState, useMemo } from 'react';
import { allPlans, getProviders } from '@/lib/vpsProviders';
import { VPSProviderCard } from '@/components/VPSProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface VPSProvidersProps {
  selectedConfigTier?: 'starter' | 'intermediate' | 'professional';
}

/**
 * VPS 提供商页面
 * 展示所有 VPS 提供商的计划，支持搜索和筛选
 */
export function VPSProviders({ selectedConfigTier }: VPSProvidersProps) {
  const [search, setSearch] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterTier, setFilterTier] = useState(selectedConfigTier || 'all');
  const [duration, setDuration] = useState(1);

  const providers = useMemo(() => getProviders(), []);

  // 过滤计划
  const filtered = useMemo(() => {
    return allPlans.filter(plan => {
      const matchesSearch =
        plan.name.toLowerCase().includes(search.toLowerCase()) ||
        plan.notes.toLowerCase().includes(search.toLowerCase());
      const matchesProvider = filterProvider === 'all' || plan.provider === filterProvider;
      const matchesTier = filterTier === 'all' || plan.tier === filterTier;
      return matchesSearch && matchesProvider && matchesTier;
    });
  }, [search, filterProvider, filterTier]);

  // 调试：检查数据加载
  console.log('=== VPSProviders Debug ===');
  console.log('allPlans loaded:', allPlans.length, 'plans');
  console.log('First plan:', allPlans[0]);
  console.log('Providers:', providers);
  console.log('filterTier:', filterTier);
  console.log('filterProvider:', filterProvider);
  console.log('search:', search);
  console.log('filtered.length:', filtered.length);
  console.log('filtered plans:', filtered.slice(0, 3));

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">VPS 提供商计划</h1>
        <p className="text-muted-foreground">
          浏览所有 VPS 提供商的计划，找到最适合您的 Hytale 服务器配置
        </p>
      </div>

      {/* 筛选和搜索 */}
      <Card className="card-elevated p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">筛选和搜索</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 搜索框 */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-semibold">
              搜索计划
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="搜索计划名称或描述..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* 提供商筛选 */}
          <div className="space-y-2">
            <Label htmlFor="provider" className="text-sm font-semibold">
              提供商
            </Label>
            <Select value={filterProvider} onValueChange={setFilterProvider}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="选择提供商" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有提供商</SelectItem>
                {providers.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 配置等级筛选 */}
          <div className="space-y-2">
            <Label htmlFor="tier" className="text-sm font-semibold">
              配置等级
            </Label>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger id="tier">
                <SelectValue placeholder="选择等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有等级</SelectItem>
                <SelectItem value="small">小型 (入门级)</SelectItem>
                <SelectItem value="medium">中型 (进阶级)</SelectItem>
                <SelectItem value="large">大型 (专业级)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 租用时长 */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-semibold">
              租用时长
            </Label>
            <Select value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v))}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="选择时长" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 个月</SelectItem>
                <SelectItem value="3">3 个月</SelectItem>
                <SelectItem value="6">6 个月</SelectItem>
                <SelectItem value="12">12 个月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 搜索结果统计 */}
        <div className="pt-2 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{filtered.length}</span> 个计划
          </p>
        </div>
      </Card>

      {/* VPS 计划卡片网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plan, idx) => (
            <VPSProviderCard key={idx} plan={plan} duration={duration} />
          ))}
        </div>
      ) : (
        <Card className="card-elevated p-12 text-center">
          <p className="text-muted-foreground mb-2">未找到匹配的计划</p>
          <p className="text-sm text-muted-foreground">
            请尝试调整搜索条件或筛选选项
          </p>
        </Card>
      )}
    </div>
  );
}
