import type { VPSPlan } from "@/data/RecommendationEngine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, HardDrive, Network, Globe, Zap, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface VPSCardProps {
  plan: VPSPlan;
  isRecommended?: boolean;
  score?: number;
  duration?: number; // Duration in months
}

export function VPSCard({ plan, isRecommended, score, duration = 1 }: VPSCardProps) {
  const totalCost = (plan.price * duration).toFixed(2);
  const { t } = useTranslation();

  return (
    <Card className={cn("flex flex-col h-full transition-all hover:shadow-lg border-2", isRecommended ? "border-primary shadow-md scale-105 z-10" : "border-transparent bg-card/80")}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 w-fit" style={{ borderColor: plan.logo_color, color: plan.logo_color }}>
              {plan.provider}
            </Badge>
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
          </div>
          {isRecommended && (
            <Badge variant="default" className="bg-primary text-primary-foreground animate-pulse">
              {t('card.bestMatch')}
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">{plan.notes}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold">{plan.cpu} vCPU</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold">{plan.ram} GB RAM</span>
        </div>
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-muted-foreground" />
          <span>{plan.storage} GB {plan.storage_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-muted-foreground" />
          <span>{plan.port_speed_mbps >= 1000 ? `${plan.port_speed_mbps/1000} Gbps` : `${plan.port_speed_mbps} Mbps`}</span>
        </div>
        <div className="col-span-2 flex items-start gap-2 pt-2 border-t border-border/50">
           <Globe className="w-4 h-4 text-muted-foreground mt-1" />
           <span className="text-xs text-muted-foreground line-clamp-1">{plan.regions}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 pt-4">
        <div className="flex flex-col">
          {duration > 1 ? (
            <>
                <span className="text-xs text-muted-foreground">{t('card.total', { count: duration })}</span>
                <span className="text-2xl font-bold text-foreground">${totalCost}</span>
                <span className="text-[10px] text-muted-foreground">(${plan.price}/mo)</span>
            </>
          ) : (
            <>
                <span className="text-xs text-muted-foreground">{t('card.monthly')}</span>
                <span className="text-2xl font-bold text-foreground">${plan.price}</span>
            </>
          )}
        </div>
        <Button asChild className={cn(isRecommended ? "bg-primary hover:bg-primary/90" : "variant-outline")}>
          <a href={plan.url} target="_blank" rel="noopener noreferrer">
            {t('card.viewDeal')}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
