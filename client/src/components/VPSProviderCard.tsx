import { VPSPlan } from '@/lib/vpsProviders';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, HardDrive, Globe } from 'lucide-react';

interface VPSProviderCardProps {
  plan: VPSPlan;
  isRecommended?: boolean;
  duration?: number; // 租用月数
}

/**
 * VPS 提供商卡片组件
 * 展示具体的 VPS 提供商计划
 */
export function VPSProviderCard({ plan, isRecommended = false, duration = 1 }: VPSProviderCardProps) {
  const totalCost = (plan.price * duration).toFixed(2);

  return (
    <Card
      className={`card-elevated flex flex-col h-full transition-smooth border-2 ${
        isRecommended ? 'ring-2 ring-accent ring-offset-2 ring-offset-background border-accent/50' : 'border-border/30'
      }`}
    >
      {/* 提供商标签 */}
      <div className="p-4 border-b border-border/20 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="outline"
            className="text-xs font-semibold"
            style={{
              borderColor: plan.logo_color,
              color: plan.logo_color,
              backgroundColor: `${plan.logo_color}10`,
            }}
          >
            {plan.provider}
          </Badge>
          {isRecommended && (
            <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
              推荐
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{plan.notes}</p>
      </div>

      {/* 规格信息 */}
      <div className="p-4 space-y-3 flex-1 border-b border-border/20">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">CPU</div>
              <div className="text-sm font-semibold text-foreground">{plan.cpu} vCPU</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">内存</div>
              <div className="text-sm font-semibold text-foreground">{plan.ram} GB</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">存储</div>
              <div className="text-sm font-semibold text-foreground">{plan.storage} GB</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">地区</div>
              <div className="text-sm font-semibold text-foreground line-clamp-1">{plan.regions.split(',')[0]}</div>
            </div>
          </div>
        </div>

        {/* 存储类型和地区 */}
        <div className="pt-2 space-y-2 border-t border-border/20">
          <div className="text-xs">
            <span className="text-muted-foreground">存储类型：</span>
            <span className="text-foreground font-medium">{plan.storage_type}</span>
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">可用地区：</span>
            <span className="text-foreground font-medium line-clamp-1">{plan.regions}</span>
          </div>
        </div>
      </div>

      {/* 价格和按钮 */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          {duration > 1 ? (
            <>
              <div className="text-xs text-muted-foreground">
                {duration} 个月总计
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-accent">${totalCost}</span>
                <span className="text-xs text-muted-foreground">(${plan.price}/月)</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-muted-foreground">月价</div>
              <div className="text-2xl font-bold text-accent">${plan.price}</div>
            </>
          )}
        </div>
        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-smooth"
        >
          <a href={plan.url} target="_blank" rel="noopener noreferrer">
            查看详情
          </a>
        </Button>
      </div>
    </Card>
  );
}
