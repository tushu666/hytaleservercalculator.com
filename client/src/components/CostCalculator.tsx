import { useState, useMemo } from 'react';
import { ServerConfig, calculateCost, getDiscountRate } from '@/lib/serverConfigs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Percent } from 'lucide-react';

interface CostCalculatorProps {
  config: ServerConfig;
}

/**
 * 成本估算器组件
 * 设计理念：实时反馈，清晰的成本分解，突出折扣优势
 */
export function CostCalculator({ config }: CostCalculatorProps) {
  const [months, setMonths] = useState(1);

  const discountRate = useMemo(() => getDiscountRate(months), [months]);
  const totalCost = useMemo(() => calculateCost(config.monthlyPrice, months, discountRate), [config.monthlyPrice, months, discountRate]);
  const savingsAmount = useMemo(() => config.monthlyPrice * months * discountRate, [config.monthlyPrice, months, discountRate]);
  const costPerDay = useMemo(() => totalCost / (months * 30), [totalCost, months]);

  return (
    <Card className="card-elevated space-y-6 p-6">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">成本估算器</h3>
        <p className="text-sm text-muted-foreground">计算您的租用总成本</p>
      </div>

      {/* 租用时长输入 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="months" className="text-sm font-semibold">
            租用时长
          </Label>
          <span className="text-xs text-muted-foreground">
            {months === 1 ? '1 个月' : `${months} 个月`}
          </span>
        </div>
        <Input
          id="months"
          type="range"
          min="1"
          max="24"
          value={months}
          onChange={(e) => setMonths(parseInt(e.target.value))}
          className="w-full h-2 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 个月</span>
          <span>24 个月</span>
        </div>
      </div>

      {/* 成本分解 */}
      <div className="space-y-3 py-4 border-y border-border/20">
        {/* 原价 */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">原价</span>
          <span className="text-sm font-medium text-foreground">
            ${(config.monthlyPrice * months).toFixed(2)}
          </span>
        </div>

        {/* 折扣 */}
        {discountRate > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">折扣</span>
            </div>
            <span className="text-sm font-medium text-accent">
              -{(discountRate * 100).toFixed(0)}% (省 ${savingsAmount.toFixed(2)})
            </span>
          </div>
        )}

        {/* 折扣提示 */}
        {discountRate > 0 && (
          <div className="text-xs text-accent/70 bg-accent/10 px-3 py-2 rounded">
            ✓ 长期租用折扣已自动应用
          </div>
        )}
      </div>

      {/* 总成本 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-muted-foreground">总成本</span>
          <div className="text-right">
            <div className="text-3xl font-bold text-accent">${totalCost.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              约 ${costPerDay.toFixed(2)}/天
            </div>
          </div>
        </div>
      </div>

      {/* 配置信息 */}
      <div className="pt-4 border-t border-border/20 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">配置</span>
          <span className="font-medium text-foreground">{config.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">CPU / 内存</span>
          <span className="font-medium text-foreground">
            {config.cpu} 核 / {config.ram}GB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">最大玩家数</span>
          <span className="font-medium text-foreground">{config.maxPlayers} 人</span>
        </div>
      </div>
    </Card>
  );
}
