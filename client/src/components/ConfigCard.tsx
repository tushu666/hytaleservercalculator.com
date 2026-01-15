import { ServerConfig } from '@/lib/serverConfigs';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfigCardProps {
  config: ServerConfig;
  isRecommended?: boolean;
  onSelect?: (config: ServerConfig) => void;
}

/**
 * 配置推荐卡片组件
 * 设计理念：清晰的信息层级，视觉上突出推荐配置
 */
export function ConfigCard({ config, isRecommended = false, onSelect }: ConfigCardProps) {
  const tierColors = {
    starter: 'border-blue-500/30',
    intermediate: 'border-cyan-500/30',
    professional: 'border-orange-400/30',
  };

  const tierBgGradient = {
    starter: 'from-blue-500/5 to-transparent',
    intermediate: 'from-cyan-500/5 to-transparent',
    professional: 'from-orange-400/5 to-transparent',
  };

  const tierBadgeColor = {
    starter: 'bg-blue-500/20 text-blue-300',
    intermediate: 'bg-cyan-500/20 text-cyan-300',
    professional: 'bg-orange-400/20 text-orange-200',
  };

  return (
    <div
      className={`card-elevated relative overflow-hidden border-2 transition-smooth ${tierColors[config.tier]} ${
        isRecommended ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''
      }`}
    >
      {/* 背景渐变 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tierBgGradient[config.tier]} pointer-events-none`} />

      {/* 推荐标签 */}
      {isRecommended && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full border border-accent/50">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent">推荐</span>
        </div>
      )}

      {/* 内容 */}
      <div className="relative p-6 space-y-4">
        {/* 标题和等级 */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">{config.name}</h3>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tierBadgeColor[config.tier]}`}>
            {config.tier === 'starter' && '入门级'}
            {config.tier === 'intermediate' && '进阶级'}
            {config.tier === 'professional' && '专业级'}
          </div>
        </div>

        {/* 描述 */}
        <p className="text-sm text-muted-foreground">{config.description}</p>

        {/* 规格信息 */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/20">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">CPU</div>
            <div className="text-2xl font-bold text-accent">{config.cpu}</div>
            <div className="text-xs text-muted-foreground">核心</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">内存</div>
            <div className="text-2xl font-bold text-accent">{config.ram}</div>
            <div className="text-xs text-muted-foreground">GB</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">存储</div>
            <div className="text-2xl font-bold text-accent">{config.storage}</div>
            <div className="text-xs text-muted-foreground">GB</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">玩家</div>
            <div className="text-2xl font-bold text-accent">{config.maxPlayers}</div>
            <div className="text-xs text-muted-foreground">人</div>
          </div>
        </div>

        {/* 功能列表 */}
        <div className="space-y-2">
          {config.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* 价格和按钮 */}
        <div className="pt-4 border-t border-border/20 space-y-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">${config.monthlyPrice}</span>
            <span className="text-sm text-muted-foreground">/月</span>
          </div>
          <Button
            onClick={() => onSelect?.(config)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-smooth"
          >
            选择此配置
          </Button>
        </div>
      </div>
    </div>
  );
}
